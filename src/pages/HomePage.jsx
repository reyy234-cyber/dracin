import React, { useContext, useEffect, useState } from 'react';
import { PlatformContext } from '../contexts/PlatformContext';
import { getHomeData } from '../utils/api';
import CardList from '../components/CardList';

/**
 * Home page displays trending, latest and recommended lists.
 * Fetches data when the active platform changes.
 * @param {{onSelectItem: (item) => void}} props
 */
export default function HomePage({ onSelectItem }) {
  const { activePlatform } = useContext(PlatformContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    trending: [],
    latest: [],
    recommended: [],
  });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getHomeData(activePlatform)
      .then((result) => {
        if (mounted) {
          setData(result);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [activePlatform]);

  return (
    <div>
      <CardList
        title="Trending"
        items={data.trending}
        onSelect={(item) => onSelectItem({ ...item, platform: activePlatform })}
        loading={loading && data.trending.length === 0}
      />
      <CardList
        title="Latest"
        items={data.latest}
        onSelect={(item) => onSelectItem({ ...item, platform: activePlatform })}
        loading={loading && data.latest.length === 0}
      />
      <CardList
        title="Recommended"
        items={data.recommended}
        onSelect={(item) => onSelectItem({ ...item, platform: activePlatform })}
        loading={loading && data.recommended.length === 0}
      />
    </div>
  );
}