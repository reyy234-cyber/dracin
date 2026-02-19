import React from 'react';
import Card from './Card';

/**
 * Horizontal scrolling list of cards with a section title.
 * @param {{title: string, items: Array, onSelect: (item) => void, loading?: boolean}} props
 */
export default function CardList({ title, items, onSelect, loading }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {loading ? (
        <div className="flex space-x-4 overflow-x-auto hide-scrollbar">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="flex-shrink-0 w-40 sm:w-48 md:w-56">
              <div className="aspect-[2/3] skeleton"></div>
              <div className="h-4 w-3/4 mt-2 skeleton"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex space-x-4 overflow-x-auto hide-scrollbar">
          {items.map((item) => (
            <Card key={item.id} item={item} onClick={onSelect} />
          ))}
        </div>
      )}
    </section>
  );
}