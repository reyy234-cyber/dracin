import React from 'react';

/**
 * Top navigation bar. Displays menu button and current page title.
 * @param {{title: string, onMenuClick: () => void}} props
 */
export default function Navbar({ title, onMenuClick }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800 z-10 relative">
      <button
        className="p-2 rounded hover:bg-gray-700 focus:outline-none md:hidden"
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
      >
        <i className="fas fa-bars text-xl"></i>
      </button>
      <h1 className="text-lg md:text-xl font-semibold truncate">{title}</h1>
      {/* placeholder to balance flex on mobile */}
      <div className="w-6 h-6 md:hidden"></div>
    </header>
  );
}