import React from 'react';

/**
 * Chat bubble for AI chat interface.
 * @param {{message: string, from: 'user' | 'ai'}} props
 */
export default function ChatBubble({ message, from }) {
  const isUser = from === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-lg ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'
        }`}
      >
        <p className="whitespace-pre-line">{message}</p>
      </div>
    </div>
  );
}