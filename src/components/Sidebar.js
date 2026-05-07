import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, closeSidebar, currentAlbum, albums }) => {
  if (!albums.length) return null;
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="sidebar-title">🎵 Menu</h2>

      <NavLink to="/" end onClick={closeSidebar}>
        Home
      </NavLink>
      <NavLink to="/about" onClick={closeSidebar}>
        About
      </NavLink>
      <NavLink to="/merch" onClick={closeSidebar}>
        Merch
      </NavLink>

      <h3>Albums</h3>

      {albums.map((album) => {
        const isPlaying = currentAlbum?.id === album.id;

        return (
          <NavLink
            key={album.id}
            to={`/album/${album.id}`}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${isActive ? "active" : ""} ${isPlaying ? "playing" : ""}`
            }
          >
            {isPlaying ? "▶ " : ""}
            {album.title}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;