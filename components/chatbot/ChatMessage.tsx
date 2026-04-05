'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Leaf } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'bot';
  timestamp?: string;
}

export function ChatMessage({
  message,
  sender,
  timestamp,
}: ChatMessageProps) {
  const isUser = sender === 'user';

  return (
    <div className={`flex gap-3 items-end ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <Avatar className="h-6 w-6 flex-shrink-0">
        {!isUser && <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
          <Leaf className="h-3 w-3" />
        </AvatarFallback>}
        {isUser && <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
          U
        </AvatarFallback>}
      </Avatar>

      {/* Message */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-3 py-2 rounded-lg max-w-xs text-sm ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-none'
              : 'bg-muted text-foreground rounded-bl-none'
          }`}
        >
          <p className="break-words">{message}</p>
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground mt-1">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
