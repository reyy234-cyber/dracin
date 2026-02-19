import React from 'react';

/**
 * Chat bubble for AI chat interface.
 * @param {{message: string, from: 'user' | 'ai'}} props
 */
export default function ChatBubble({ message, from }) {
  const isUser = from === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-3`}>
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-gray-200'
        }`}
      >
        <p className="whitespace-pre-line text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
}