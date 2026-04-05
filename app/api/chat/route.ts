import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, language = 'en' } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      );
    }

    // System prompt for agricultural context
    const systemPrompt = `You are AgriBot, an expert AI agronomist powered by Google Gemini. Context: The farmer is in Kolval, Goa with a 2.5-acre cashew farm. Current soil moisture is 42% (Low), pH is 6.5. Provide short, practical advice. You must reply primarily in English, but always include a 1-2 sentence translation of your core advice in the requested language at the end in parentheses.`;

    // Make request to OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': `${request.headers.get('referer') || 'http://localhost:3000'}`,
        'X-Title': 'AgriVision Dashboard',
      },
      body: JSON.stringify({
        model: 'google/gemini-1.5-pro',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[v0] OpenRouter API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from OpenRouter' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content || '';

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('[v0] Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
