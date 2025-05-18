import React, { useEffect, useState } from "react";
import { fetchVideoDetails } from "../services/api";

const VideoDetails = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVideoDetails()
      .then((data) => setVideos(data))
      .catch(() => setError("Failed to load videos."));
  }, []);

  if (error) return <p>{error}</p>;
  if (!videos.length) return <p>Loading videos...</p>;

  return (
    <div>
      <h2>Your Videos</h2>
      {videos.map((video) => (
        <div key={video.id}>
          <h3>{video.snippet.title}</h3>
          <img
            src={video.snippet.thumbnails?.medium?.url}
            alt={video.snippet.title}
          />
          <a
            href={`https://www.youtube.com/watch?v=${video.contentDetails.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            Watch on YouTube
          </a>
        </div>
      ))}
    </div>
  );
};

export default VideoDetails;