import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Player = ({
  currentTrack,
  currentAlbum,
  currentIndex,
  setCurrentIndex,
  restartTrack,
}) => {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const navigate = useNavigate();

  // ▶️ PLAY / PAUSE
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // ⏭ NEXT
  const nextTrack = useCallback(() => {
    if (!currentAlbum || currentIndex === null) return;

    if (currentIndex < currentAlbum.tracks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentAlbum, currentIndex, setCurrentIndex]);

  // ⏮ PREVIOUS (with restart logic)
  const prevTrack = useCallback(() => {
    if (!audioRef.current || !currentAlbum || currentIndex === null) return;

    // Restart current track if > 3 seconds in
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentAlbum, currentIndex, setCurrentIndex]);

  // 🎧 Load & autoplay on track change
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.load();
      audioRef.current.currentTime = 0;

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => { });
      }

      setIsPlaying(true);
    }
  }, [currentTrack, restartTrack]);

  // 🔊 Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 🎹 Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;

      const tag = document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        togglePlay();
      }

      if (e.code === "ArrowRight") nextTrack();
      if (e.code === "ArrowLeft") prevTrack();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [togglePlay, nextTrack, prevTrack]);

  // ⏱ Update progress
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  // 🎯 Seek
  const handleSeek = (e) => {
    if (!audioRef.current) return;

    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  // ⏭ Auto next when finished
  const handleEnded = () => {
    nextTrack();
  };

  // ⏱ Format time
  const formatTime = (time) => {
    if (!time) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${("0" + secs).slice(-2)}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="player">
      {/* LEFT */}
      <div className="player-left" onClick={() => navigate(`/album/${currentAlbum.id}`)}>
        <img src={currentAlbum.cover} alt="" />

        <div className="track-info">
          <h4>
            {currentTrack.title.length > 25
              ? currentTrack.title.slice(0, 25) + "…"
              : currentTrack.title}
          </h4>

          <p>
            {currentAlbum.title.length > 25
              ? currentAlbum.title.slice(0, 25) + "…"
              : currentAlbum.title}
          </p>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="player-controls">
        <button onClick={prevTrack} disabled={currentIndex === 0}>
          ⏮
        </button>

        <button onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button
          onClick={nextTrack}
          disabled={
            currentAlbum &&
            currentIndex === currentAlbum.tracks.length - 1
          }
        >
          ⏭
        </button>

        {/* SEEK */}
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={progress}
          onChange={handleSeek}
          className="progress-bar"
        />

        {/* VOLUME */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="volume"
        />

        {/* TIME */}
        <span className="time">
          {formatTime(progress)} / {formatTime(duration)}
        </span>
      </div>

      {/* AUDIO */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      >
        <source src={currentTrack.src} type="audio/wav" />
      </audio>
    </div>
  );
};

export default Player;