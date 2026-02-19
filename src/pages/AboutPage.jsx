import React from 'react';

/**
 * About page provides information about this app.
 */
export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <p className="mb-2">
        This streaming platform aggregates content from multiple providers such as DramaBox,
        MovieBox, ReelShort, NetShort, Melolo, FlickReels, Anime and Komik. It leverages
        the Sansekai API to fetch trending titles, latest releases, search results and
        detailed episode information.
      </p>
      <p className="mb-2">
        Built with React and Tailwind CSS, the interface is designed to be modern, responsive
        and mobile‑first. Use the menu to switch platforms, search for shows, continue
        watching from your history, or chat with our AI assistant.
      </p>
      <p className="text-sm text-gray-400">
        All content belongs to their respective owners. This site is for educational
        and demonstrative purposes.
      </p>
    </div>
  );
}