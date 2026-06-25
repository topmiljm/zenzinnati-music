import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Album from "./pages/Album";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Merch from "./pages/Merch";
import Success from "./pages/Success";
import Contact from "./pages/Contact";

import "./App.css";

function App() {
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [restartTrack, setRestartTrack] = useState(false);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("/data/albums.json")
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handlePlay = (album, index) => {
    if (currentAlbum?.id === album.id && currentIndex === index) {
      // same track → trigger restart
      setRestartTrack(prev => !prev);
    } else {
      setCurrentAlbum(album);
      setCurrentIndex(index);
    }
  };

  const currentTrack =
    currentAlbum && currentIndex !== null
      ? currentAlbum.tracks[currentIndex]
      : null;

  return (
    <Router>
      <div className="layout">
        {isSidebarOpen && (
          <div className="overlay" onClick={closeSidebar}></div>
        )}

        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
          currentAlbum={currentAlbum}
          albums={albums}
        />

        <div className="mobile-hamburger" onClick={toggleSidebar}>
          ☰
          {/* <img src="/favicon-1.png" alt="favicon" style={{ maxWidth: "30px", borderRadius: "5px" }}></img> */}
        </div>

        {/* NEW WRAPPER */}
        <div className="content">
          <div className="main">
            <Routes>
              <Route path="/" element={<Home albums={albums} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/merch" element={<Merch />} />
              <Route
                path="/album/:id"
                element={
                  <Album
                    albums={albums}
                    handlePlay={handlePlay}
                    currentAlbum={currentAlbum}
                    currentIndex={currentIndex}
                  />
                }
              />
              <Route path="/success" element={<Success />} />
            </Routes>
          </div>

          {/* PLAYER NOW PART OF LAYOUT */}
          <Player
            currentTrack={currentTrack}
            currentAlbum={currentAlbum}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            restartTrack={restartTrack}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;