// Gemini API client for AgriVision Dashboard
// For image analysis and chat functionality

export interface GeminiAnalysisResult {
  status: 'healthy' | 'disease';
  confidence: number;
  description: string;
  recommendations?: string[];
}

export interface GeminiChatOptions {
  systemPrompt?: string;
  language?: 'en' | 'konkani' | 'marathi';
}

// System prompt for agricultural context
const AGRI_SYSTEM_PROMPT = `You are AgriBot, an expert agricultural assistant specializing in farming in Indian conditions, particularly in Goa and Western India. 
You provide advice on:
- Crop cultivation and management
- Disease and pest identification and treatment
- Soil health and irrigation management
- Market prices and economics
- Government schemes and subsidies
- Weather-based recommendations

Keep responses concise (2-3 sentences), practical, and specific to the user's crop.
Use local knowledge of Indian farming practices and Mandi markets.`;

const KONKANI_SYSTEM_PROMPT = `आप कृषी विशेषज्ञ आहात. गोवा आणि पश्चिमी भारतातील शेती संबंधीचा सल्ला द्या.
संक्षिप्त आणि व्यावहारिक उत्तर द्या.`;

const MARATHI_SYSTEM_PROMPT = `आप कृषी विशेषज्ञ आहात. गोवा आणि पश्चिमी भारतातील शेती संबंधीचा सल्ला द्या.
संक्षिप्त आणि व्यावहारिक उत्तर द्या.`;

/**
 * Analyzes a crop image using Gemini Vision API
 * Would require Google Generative AI client initialization
 */
export async function analyzeCropImage(
  imageFile: File
): Promise<GeminiAnalysisResult> {
  try {
    // TODO: Implement actual Gemini Vision API call
    // This requires:
    // 1. Installing @google/generative-ai
    // 2. Initializing with GOOGLE_GENERATIVE_AI_API_KEY
    // 3. Using Vision model for image analysis

    console.log('[v0] Analyzing crop image:', imageFile.name);

    // Mock response for demonstration
    return {
      status: 'healthy',
      confidence: 0.95,
      description: 'The cashew leaves appear healthy with no visible disease symptoms.',
      recommendations: [
        'Continue regular monitoring',
        'Maintain adequate soil moisture',
        'Apply preventive fungicide spray if humidity is high',
      ],
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image');
  }
}

/**
 * Gets a chat response from the backend API route connected to OpenRouter
 */
export async function getChatResponse(
  message: string,
  options: GeminiChatOptions = {}
): Promise<string> {
  try {
    const { language = 'en' } = options;

    console.log('[v0] Getting chat response for:', message);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        language,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[v0] API error:', errorData);
      throw new Error(errorData.error || 'Failed to get response');
    }

    const data = await response.json();
    return data.response || 'Unable to generate response';
  } catch (error) {
    console.error('[v0] Error getting chat response:', error);
    throw new Error('Failed to get chat response');
  }
}

/**
 * Initializes Gemini client
 * Call this once in your app initialization
 */
export async function initializeGemini(): Promise<void> {
  // TODO: Initialize @google/generative-ai client
  // This would typically be done in a server-side API route

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    console.warn(
      'GOOGLE_GENERATIVE_AI_API_KEY not found. Gemini features will use mock responses.'
    );
  }
}
