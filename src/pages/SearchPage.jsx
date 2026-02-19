import React, { useContext, useState } from 'react';
import { PlatformContext } from '../contexts/PlatformContext';
import { search } from '../utils/api';
import Card from '../components/Card';

/**
 * Search page allows users to search within the current platform.
 * Displays results in a responsive grid.
 * @param {{onSelectItem: (item) => void}} props
 */
export default function SearchPage({ onSelectItem }) {
  const { activePlatform } = useContext(PlatformContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    try {
      const data = await search(activePlatform, q);
      setResults(data);
    } catch (err) {
      setError('Failed to search');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-l bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-r bg-blue-600 hover:bg-blue-700 text-white"
        >
          Search
        </button>
      </form>
      {loading && (
        <p className="text-center text-gray-400">Searching...</p>
      )}
      {error && (
        <p className="text-center text-red-500 mb-4">{error}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((item) => (
          <Card
            key={item.id}
            item={item}
            onClick={(it) => onSelectItem({ ...it, platform: activePlatform })}
          />
        ))}
      </div>
    </div>
  );
}