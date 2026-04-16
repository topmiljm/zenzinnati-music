# 🎵 Zen Zinnati Music App

A full-stack music streaming web app showcasing the discography of **Zen Zinnati** — a music production project blending electronic, hip hop, indie, and experimental sounds.

🌐 **Live Site:** https://zenzinnatimusic.vercel.app/

---

## ✨ Features

* 🎧 Stream full albums and tracks
* 📱 Responsive design (mobile + desktop)
* ⏯️ Play / pause with keyboard (spacebar / enter)
* 📀 Album pages with track durations
* 🔊 Persistent audio player across pages
* 🧭 Click currently playing track → navigate to album
* ☁️ Cloud-hosted audio (Cloudinary)

---

## 🛠️ Tech Stack

* **Frontend:** React, React Router
* **Backend:** Node.js / Express
* **Hosting:** Vercel (frontend), Render (backend)
* **Media Hosting:** Cloudinary

---

## 📁 Project Structure

```
my-music-app/
├── public/
│   ├── music/          # Local audio files (dev only)
│   ├── covers/         # Album artwork
│   └── data/
│       └── albums.json # Main data source
├── src/
│   ├── components/     # Player, UI components
│   ├── pages/          # Album, About, etc.
│   └── App.js
├── scripts/
│   └── generateAlbums.js
```

---

## ⚠️ Album Generator Script

This project includes a script to generate album data:

```bash
npm run generate
```

### What it does

* Scans `/public/music`
* Generates album + track structure
* Updates `albums.json`

---

### ⚠️ Important Notes (READ THIS)

* Running this script will **modify `albums.json`**
* New tracks will default to **local file paths**:

  ```
  /music/AlbumName/track.mp3
  ```

---

### ☁️ Cloudinary Workflow

This app uses Cloudinary for production audio.

After running the generator:

1. Open:

   ```
   public/data/albums.json
   ```
2. Find newly added tracks
3. Replace their `src` values with Cloudinary URLs
4. Save and commit

---

### 🚨 Warning

Do NOT rely on the generator for:

* Final `src` values (Cloudinary)
* Manual edits inside `albums.json`

Always verify before deploying.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/topmiljm/zenzinnati-music.git
cd my-music-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm start
```

---

## 🎨 About the Artist

Zen Zinnati is a music production project of **James Topmiller**, originally from Cincinnati, Ohio and now based in Los Angeles.

The project spans about a half decade of recordings, capturing a unique blend of genres and experimentation.

---

## 📬 Contact

* email: 1mntnjames@gmail.com

---

## 🔮 Future Improvements

* 🔐 User accounts / favorites
* 📱 Progressive Web App (PWA)
* 🎚️ Better mobile background playback
* ☁️ Fully automated Cloudinary sync

---

## 📄 License

This project is for personal/portfolio use.
