import React from 'react';

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
            {isActive && <i className="fas fa-play-circle"></i>}
          </button>
        );
      })}
    </div>
  );
}