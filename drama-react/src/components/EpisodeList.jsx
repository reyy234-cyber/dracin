import React from 'react';

// Inline play icon for the currently selected episode. A simple right-facing
// triangle within a circle indicates the playing item. Accepts className for
// sizing and inherits current color.
function PlayIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <circle cx="12" cy="12" r="10" opacity="0.2" />
      <polygon points="10,8 16,12 10,16" />
    </svg>
  );
}

/**
 * List of episodes/chapters.
 * @param {{episodes: Array<{id: string, name: string}>, currentId: string, onSelect: (episode) => void}} props
 */
export default function EpisodeList({ episodes, currentId, onSelect }) {
  return (
    <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
      {episodes.map((ep) => {
        const isActive = ep.id === currentId;
        return (
          <button
            key={ep.id}
            className={`w-full text-left py-2 px-3 rounded flex items-center justify-between ${
              isActive ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700'
            }`}
            onClick={() => onSelect(ep)}
          >
            <span>{ep.name}</span>
            {isActive && <PlayIcon className="w-4 h-4" />}
          </button>
        );
      })}
    </div>
  );
}