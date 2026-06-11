import AlbumCard from "../components/AlbumCard";

const Home = ({ albums }) => {
  if (!albums.length) {
    return <div>Loading...</div>;
  }
  return (
    <div className="home">
      <h1>Zen Zinnati Music</h1>
      <div className="home-header-img">
        <img src="/covers/sub-header-option-3.jpg" alt="header" className="home-page-image" />
      </div>
      <div className="section-label">
        Discography
        <div className="section-divider" />
      </div>

      <div className="album-grid">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default Home;