import React, { useContext } from 'react';
import { PlatformContext } from '../contexts/PlatformContext';
import Card from '../components/Card';

/**
 * History page shows recently watched items.
 * @param {{onSelectItem: (item) => void}} props
 */
export default function HistoryPage({ onSelectItem }) {
  const { history } = useContext(PlatformContext);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Continue Watching</h2>
      {history.length === 0 ? (
        <p className="text-gray-400">No watch history yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {history.map((entry) => (
            <Card
              key={`${entry.platform}-${entry.id}`}
              item={{ id: entry.id, title: entry.title, cover: entry.cover }}
              onClick={() =>
                onSelectItem({
                  id: entry.id,
                  title: entry.title,
                  cover: entry.cover,
                  platform: entry.platform,
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}