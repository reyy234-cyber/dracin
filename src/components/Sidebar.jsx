import React, { useContext } from 'react';
import { PlatformContext } from '../contexts/PlatformContext';
import { PLATFORMS } from '../utils/api';

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
    { id: 'home', label: 'Home', icon: 'fa-house' },
    { id: 'search', label: 'Search', icon: 'fa-search' },
    { id: 'history', label: 'History', icon: 'fa-history' },
    { id: 'chat', label: 'AI Chat', icon: 'fa-comments' },
    { id: 'uploader', label: 'Uploader', icon: 'fa-upload' },
    { id: 'about', label: 'About', icon: 'fa-info-circle' },
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
          {pages.map((p) => (
            <button
              key={p.id}
              className="flex items-center space-x-3 w-full text-left py-2 px-3 rounded hover:bg-gray-700"
              onClick={() => {
                onNavigate(p.id);
              }}
            >
              <i className={`fas ${p.icon} w-5`}></i>
              <span>{p.label}</span>
            </button>
          ))}
          <details className="mt-3">
            <summary className="cursor-pointer py-2 px-3 rounded hover:bg-gray-700 select-none">
              <div className="flex items-center space-x-3">
                <i className="fas fa-layer-group w-5"></i>
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
          className="md:hidden mt-auto py-2 px-3 text-left hover:bg-gray-700"
          onClick={onClose}
        >
          <i className="fas fa-times mr-2"></i>Close
        </button>
      </div>
    </aside>
  );
}