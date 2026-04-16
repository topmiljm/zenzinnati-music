## ⚠️ Album Generator Script (`generateAlbums.js`)

This project uses a script to generate `albums.json` from local files:

```bash
npm run generate
```

### Important Notes

* Running this script will:

  * Regenerate all albums and tracks
  * Use local file paths (`/music/...`) for `src` if no existing value is found
  * Overwrite parts of `albums.json`

### ⚠️ Cloudinary URLs

* If you are using Cloudinary (or any remote hosting) for audio files:

  * Existing `src` values will be preserved **only if the track already exists**
  * New tracks will default to local paths and must be updated manually

### Recommended Workflow

1. Add new tracks to `/public/music`
2. Run:

   ```bash
   npm run generate
   ```
3. Open `public/data/albums.json`
4. Replace new track `src` values with Cloudinary URLs
5. Commit changes

### ⚠️ Warning

Do NOT rely on this script as a source of truth for:

* Cloudinary URLs
* Custom durations (unless defined in the script)

Always verify `albums.json` before deploying.
