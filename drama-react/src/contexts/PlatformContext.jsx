import React, { createContext, useState, useEffect } from 'react';

// Context for managing the currently selected platform and watch history.
const PlatformContext = createContext();

function PlatformProvider({ children }) {
  const [activePlatform, setActivePlatform] = useState(
    () => localStorage.getItem('activePlatform') || 'dramabox'
  );
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem('history');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      return [];
    }
  });

  // Persist activePlatform to localStorage
  useEffect(() => {
    localStorage.setItem('activePlatform', activePlatform);
  }, [activePlatform]);

  // Persist history whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('history', JSON.stringify(history));
    } catch (err) {
      // ignore write errors
    }
  }, [history]);

  /**
   * Adds or moves an entry to the top of the watch history.
   * @param {{platform: string, id: string, title: string, cover: string, lastEpisode?: string}} entry
   */
  const addHistory = (entry) => {
    setHistory((prev) => {
      const filtered = prev.filter(
        (e) => !(e.platform === entry.platform && e.id === entry.id)
      );
      return [entry, ...filtered].slice(0, 20);
    });
  };

  return (
    <PlatformContext.Provider
      value={{
        activePlatform,
        setActivePlatform,
        history,
        addHistory,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export { PlatformProvider, PlatformContext };