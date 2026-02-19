import React, { useContext } from 'react';
import { PlatformContext } from '../contexts/PlatformContext';
import { PLATFORMS } from '../utils/api';

// Define a collection of inline SVG icons to avoid external dependencies. Each
// icon component accepts className props for sizing and inherits current
// color via stroke or fill. Icons are kept minimal to align with the dark
// theme.
const HomeIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-5H9v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="16" y1="16" x2="22" y2="22" />
  </svg>
);

const HistoryIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 15" />
  </svg>
);

const ChatIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
  </svg>
);

const UploadIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 16v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    <polyline points="12 12 12 3 8.5 6.5" />
    <polyline points="12 3 15.5 6.5" />
  </svg>
);

const InfoIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
);

const LayerIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 22 7 12 12 2 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="6" y1="18" x2="18" y2="6" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * Sidebar navigation with platform selector.
 * @param {{
 * open: boolean,
 * onClose: () => void,
 * onNavigate: (page: string) => void,
 * onPlatformChange: (platform: string) => void
 * }} props
 */
export default function Sidebar({ open, onClose, onNavigate, onPlatformChange }) {
  const { activePlatform } = useContext(PlatformContext);

  const pages = [
    { id: 'home', label: 'Home', Icon: HomeIcon },
    { id: 'search', label: 'Search', Icon: SearchIcon },
    { id: 'history', label: 'History', Icon: HistoryIcon },
    { id: 'chat', label: 'AI Chat', Icon: ChatIcon },
    { id: 'uploader', label: 'Uploader', Icon: UploadIcon },
    { id: 'about', label: 'About', Icon: InfoIcon },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 transform ${
        open ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0 md:w-60`}
    >
      <div className="h-full flex flex-col py-4 overflow-y-auto">
        <div className="px-4 mb-4">
          <h2 className="text-xl font-bold">Menu</h2>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {pages.map(({ id, label, Icon }) => (
            <button
              key={id}
              className="flex items-center space-x-3 w-full text-left py-2 px-3 rounded hover:bg-gray-700"
              onClick={() => {
                onNavigate(id);
              }}
            >
              {/* Use inline SVG icon component */}
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
          <details className="mt-3">
            <summary className="cursor-pointer py-2 px-3 rounded hover:bg-gray-700 select-none">
              <div className="flex items-center space-x-3">
                {/* Platform/group icon */}
                <LayerIcon className="w-5 h-5" />
                <span>Platform</span>
              </div>
            </summary>
            <div className="ml-3 mt-2 space-y-1">
              {Object.keys(PLATFORMS).map((code) => {
                const plat = PLATFORMS[code];
                const isActive = code === activePlatform;
                // Dynamic color class: classes included in index.css comment for purge
                const colorClass = `bg-${plat.color}-600`;
                return (
                  <button
                    key={code}
                    className={`flex items-center space-x-3 w-full text-left py-2 px-3 rounded hover:bg-gray-700 ${
                      isActive ? 'bg-gray-700 font-semibold' : ''
                    }`}
                    onClick={() => onPlatformChange(code)}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${colorClass} text-xs font-bold uppercase`}
                    >
                      {plat.name.substring(0, 2)}
                    </span>
                    <span>{plat.name}</span>
                  </button>
                );
              })}
            </div>
          </details>
        </nav>
        <button
          className="md:hidden mt-auto py-2 px-3 text-left hover:bg-gray-700 flex items-center space-x-2"
          onClick={onClose}
        >
          {/* Close icon */}
          <CloseIcon className="w-5 h-5" />
          <span>Close</span>
        </button>
      </div>
    </aside>
  );
}