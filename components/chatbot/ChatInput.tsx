'use client';

import { useState, useRef } from 'react';
import { Send, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onRecordStart?: () => void;
  onRecordEnd?: () => void;
  isLoading?: boolean;
}

export function ChatInput({
  onSendMessage,
  onRecordStart,
  onRecordEnd,
  isLoading,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicrophone = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      onRecordStart?.();
    } else {
      onRecordEnd?.();
    }
  };

  return (
    <div className="flex gap-2 items-center pt-3 border-t border-border">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Ask about your crops..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        className="text-sm"
        aria-label="Chat message input"
      />
      <Button
        size="sm"
        variant="ghost"
        onClick={handleMicrophone}
        className={isRecording ? 'text-red-500' : ''}
        title="Voice input"
      >
        <Mic className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        onClick={handleSend}
        disabled={!message.trim() || isLoading}
        className="gap-1"
      >
        <Send className="h-4 w-4" />
        <span className="hidden sm:inline">Send</span>
      </Button>
    </div>
  );
}
