import React, { useState } from 'react';
import { askAi } from '../utils/api';
import ChatBubble from '../components/ChatBubble';

/**
 * AI chat page. Provides an interface similar to ChatGPT.
 */
export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    // Append user message
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setLoading(true);
    // Call AI
    const reply = await askAi(text);
    setMessages((prev) => [...prev, { from: 'ai', text: reply }]);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-120px)]">
      <div className="flex-1 overflow-y-auto pr-2">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} message={msg.text} from={msg.from} />
        ))}
        {loading && <ChatBubble message="..." from="ai" />}
      </div>
      <form onSubmit={sendMessage} className="mt-4 flex items-center">
        <input
          type="text"
          className="flex-1 px-4 py-3 rounded-l bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-r bg-blue-600 hover:bg-blue-700 text-white"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}