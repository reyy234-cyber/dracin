import React from 'react';

// Inline SVG icon for menu (hamburger). We avoid external icon libraries to reduce
// dependencies and ensure the icon always renders. This icon draws three
// horizontal bars using a single <path> element with round line caps.
function MenuIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

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
        {/* Replace FontAwesome icon with an inline SVG for the menu */}
        <MenuIcon className="w-6 h-6" />
      </button>
      <h1 className="text-lg md:text-xl font-semibold truncate">{title}</h1>
      {/* placeholder to balance flex on mobile */}
      <div className="w-6 h-6 md:hidden"></div>
    </header>
  );
}