'use client';

import React from 'react';
import { Message } from '../types';
import UIRenderer from './UIRenderer';

interface ChatMessageProps {
  message: Message;
  onAction: (action: string, data?: any) => void;
}

export default function ChatMessage({ message, onAction }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
            isUser ? 'bg-blue-600' : 'bg-purple-600'
          }`}>
            {isUser ? 'U' : 'AI'}
          </div>
          <div className="flex-1">
            <div className={`rounded-lg px-4 py-2 ${
              isUser 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
            {!isUser && message.components && message.components.length > 0 && (
              <div className="mt-3">
                <UIRenderer components={message.components} onAction={onAction} />
              </div>
            )}
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
