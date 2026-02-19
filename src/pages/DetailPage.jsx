import React, { useContext, useEffect, useState } from 'react';
import { PlatformContext } from '../contexts/PlatformContext';
import { getDetail, getEpisodes, getVideo } from '../utils/api';
import EpisodeList from '../components/EpisodeList';
import VideoPlayer from '../components/VideoPlayer';

/**
 * Detail page shows item details, list of episodes and player.
 * @param {{item: {platform: string, id: string, title: string, cover: string}}} props
 */
export default function DetailPage({ item }) {
  const { addHistory } = useContext(PlatformContext);
  const [detail, setDetail] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [video, setVideo] = useState('');
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);
  const [loadingVideo, setLoadingVideo] = useState(false);

  // Fetch detail info
  useEffect(() => {
    let mounted = true;
    setLoadingDetail(true);
    getDetail(item.platform, item.id)
      .then((res) => {
        if (mounted) setDetail(res);
      })
      .finally(() => {
        if (mounted) setLoadingDetail(false);
      });
    return () => {
      mounted = false;
    };
  }, [item]);

  // Fetch episodes
  useEffect(() => {
    let mounted = true;
    setLoadingEpisodes(true);
    getEpisodes(item.platform, item.id)
      .then((res) => {
        if (mounted) {
          setEpisodes(res);
        }
      })
      .finally(() => {
        if (mounted) setLoadingEpisodes(false);
      });
    return () => {
      mounted = false;
    };
  }, [item]);

  // Play first episode automatically if available
  useEffect(() => {
    if (episodes.length > 0 && !currentEpisode) {
      handleSelectEpisode(episodes[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodes]);

  const handleSelectEpisode = async (ep) => {
    setCurrentEpisode(ep.id);
    setLoadingVideo(true);
    const videoData = await getVideo(item.platform, ep.video || ep.id);
    setVideo(videoData);
    setLoadingVideo(false);
    // Add to history with lastEpisode id
    addHistory({
      platform: item.platform,
      id: item.id,
      title: detail?.title || item.title,
      cover: detail?.cover || item.cover,
      lastEpisode: ep.id,
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {loadingDetail ? (
        <div className="space-y-4">
          <div className="w-full h-64 skeleton"></div>
          <div className="h-6 w-3/4 skeleton"></div>
          <div className="h-4 w-full skeleton"></div>
          <div className="h-4 w-5/6 skeleton"></div>
        </div>
      ) : detail ? (
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="w-full md:w-1/3">
            <img
              src={detail.cover || item.cover}
              alt={detail.title}
              className="w-full rounded mb-4 md:mb-0"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              {detail.title || item.title}
            </h2>
            {detail.tags && detail.tags.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {detail.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-gray-700 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-300 mb-4 whitespace-pre-wrap">
              {detail.description || 'No description available.'}
            </p>
            <h3 className="text-lg font-semibold mb-2">Episodes</h3>
            {loadingEpisodes ? (
              <p className="text-gray-400">Loading episodes...</p>
            ) : episodes.length === 0 ? (
              <p className="text-gray-400">No episodes available.</p>
            ) : (
              <EpisodeList
                episodes={episodes}
                currentId={currentEpisode}
                onSelect={handleSelectEpisode}
              />
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500">
          Failed to load detail information.
        </p>
      )}
      <div className="mt-6">
        {loadingVideo ? (
          <p className="text-gray-400">Loading video...</p>
        ) : (
          <VideoPlayer video={video} />
        )}
      </div>
    </div>
  );
}