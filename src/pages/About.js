// src/pages/About.js
import React from "react";
import { NavLink } from "react-router-dom";


const About = () => {
  return (
    <div className="about-page">
      <h1>About Zen Zinnati</h1>
      <img src="/covers/sub-header-option-3.jpg" alt="header" className="merch-page-image" />
      <p>
        Zen Zinnati is a music production project of songwriter and musician James Topmiller.
        Currently based in Los Angeles, CA, Zen Zinnati's roots are in Cincinnati, Ohio.
        Named after Cincinnati's world famous Octoberfest 'Zinzinnati' celebration and the Zen philosophy of mindfulness and simplicity,
        Zen Zinnati's music is a blend of electronic, hip hop, indie, and experimental sounds.
        Primarily active in the early 2010's, Zen Zinnati's discography includes 10 albums/mixtapes and a deep vault of unreleased instrumentals
        created over a span of about 5 years from 2010-2015.
      </p>

      <p>
        Thank you for
        listening!
      </p>

      <p>
        Follow on YouTube to check out other projects:
      </p>
      <ul>
        <li className="about-page-list">
          <a href="https://www.youtube.com/@ZenZinnati" target="_blank" rel="noreferrer">
            YouTube
          </a>
        </li>
      </ul>
      <div className="about-page-image-container-1">
        <div className="line-1"></div>
        <NavLink to="/" end>
          <img src="/covers/cart-image-2.jpg" alt="Zen Zinnati" className="about-page-image" />
        </NavLink>
        <div className="line-2"></div>
      </div>
      <p className="inquiries">Inquiries:
        <span style={{ color: '#b99f1d' }}> 1mntnjames@gmail.com </span>
      </p>
    </div>
  );
};

export default About;