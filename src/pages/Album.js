import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

const Album = ({ albums, handlePlay, currentAlbum, currentIndex }) => {
  const { id } = useParams();
  const album = albums.find((a) => a.id === id);

  const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${("0" + secs).slice(-2)}`;
  };

  if (!album) return <div>Loading...</div>;

  return (
    <div className="album-page">
      <div className="album-page-title">
        <img src="/covers/Zen-Zinnati-title-option2.jpg" alt=''></img>
        {/* <h1>Music</h1> */}
      </div>
      <img src={album.cover} alt={album.title} className="album-cover" />
      <h1>{album.title}</h1>
      <p className="album-meta">
        {album.tracks.length} tracks • {formatTime(album.totalDuration)}
      </p>

      {album.tracks.map((track, index) => {
        const isActive =
          currentAlbum?.id === album.id && currentIndex === index;

        return (
          <div
            key={track.id}
            className={`track ${isActive ? "active" : ""}`}
            onClick={() => handlePlay(album, index)}
          >
            <span>{index + 1}</span>
            <span className="track-title">{track.title}</span>
            <span className="track-duration">
              {formatTime(track.duration)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Album;