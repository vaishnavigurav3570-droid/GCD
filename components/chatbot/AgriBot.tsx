'use client';

import { useState, useRef, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface AgriBotProps {
  onSendMessage?: (message: string) => Promise<string>;
  initialMessages?: Message[];
}

const defaultInitialMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m AgriBot. How can I help you with your farming today?',
    sender: 'bot',
    timestamp: 'Today',
  },
  {
    id: '2',
    content: 'When should I apply fertilizer to my cashew farm?',
    sender: 'user',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    content: 'For cashew cultivation, apply balanced fertilizer (NPK 10:26:26) during June-July. Apply 2-3 times at 15-day intervals. Make sure soil moisture is adequate before application.',
    sender: 'bot',
    timestamp: '10:33 AM',
  },
];

export function AgriBot({
  onSendMessage,
  initialMessages = defaultInitialMessages,
}: AgriBotProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get bot response
      let botResponse = '';
      if (onSendMessage) {
        botResponse = await onSendMessage(text);
      } else {
        // Mock response
        botResponse = getMockResponse(text);
      }

      const botMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        content: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('disease') || lowerQuery.includes('pest')) {
      return 'Common cashew pests include tea mosquito bug and leaf-webber moth. For disease, watch for anthracnose and powdery mildew. Would you like specific treatment recommendations?';
    }
    if (lowerQuery.includes('water') || lowerQuery.includes('irrigation')) {
      return 'Cashew requires 500-750mm annual rainfall. During dry season, provide supplementary irrigation every 15 days. Ensure soil moisture is 60-70% of field capacity.';
    }
    if (lowerQuery.includes('yield') || lowerQuery.includes('production')) {
      return 'With proper care, a mature cashew tree (8+ years) can yield 8-12 kg nuts per year. Ensure good drainage and spacing of 8m × 8m for optimal production.';
    }
    if (lowerQuery.includes('price') || lowerQuery.includes('market')) {
      return 'Current cashew prices are around ₹115/kg in Mandi markets. Prices fluctuate based on quality and market demand. Consider storing quality nuts for better returns.';
    }
    if (lowerQuery.includes('harvest')) {
      return 'Cashew harvesting starts in February-March. Wait for apple to fall naturally, then dry nuts for 2-3 days before processing. Proper curing improves kernel quality.';
    }
    return 'I can help with information about crop diseases, irrigation, yield optimization, market prices, and harvesting. What would you like to know more about?';
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-96 rounded-2xl shadow-2xl z-50 flex flex-col bg-card border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
        <div>
          <h3 className="font-bold text-foreground">AgriBot</h3>
          <p className="text-xs text-muted-foreground">AI Farming Assistant</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.content}
              sender={msg.sender}
              timestamp={msg.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex gap-3 items-end">
              <div className="h-6 w-6 rounded-full bg-primary/20 animate-pulse" />
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </Card>
  );
}
