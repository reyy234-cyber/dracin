import React from 'react';

/**
 * Displays either a video element or a list of images for comics.
 * @param {{video: string|Array<string>}} props
 */
export default function VideoPlayer({ video }) {
  if (Array.isArray(video)) {
    // Render comic images
    return (
      <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
        {video.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Page ${idx + 1}`}
            className="w-full rounded"
            loading="lazy"
          />
        ))}
      </div>
    );
  }
  if (typeof video === 'string' && video) {
    return (
      <video
        src={video}
        controls
        className="w-full rounded"
        preload="metadata"
      ></video>
    );
  }
  return <p className="text-gray-400">Select an episode to play.</p>;
}