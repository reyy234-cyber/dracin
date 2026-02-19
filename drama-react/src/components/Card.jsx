import React from 'react';

/**
 * Generic card component for listing content items.
 * Shows cover image and title. On click, triggers callback.
 * @param {{item: {id: string, title: string, cover: string, description?: string}, onClick: (item) => void}} props
 */
export default function Card({ item, onClick }) {
  return (
    <div
      className="flex-shrink-0 w-40 sm:w-48 md:w-56 cursor-pointer group"
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-[2/3] bg-gray-800 rounded overflow-hidden">
        {item.cover ? (
          <img
            src={item.cover}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-700"></div>
        )}
      </div>
      <h3 className="mt-2 text-sm font-medium leading-tight truncate" title={item.title}>
        {item.title}
      </h3>
    </div>
  );
}