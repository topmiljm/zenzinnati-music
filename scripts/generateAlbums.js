// ⚠️ WARNING:
// This script may overwrite src values in albums.json.
// Cloudinary URLs should be verified after running.


const fs = require("fs");
const path = require("path");

// ----------------- CONFIG -----------------
const musicDir = path.join(__dirname, "..", "public", "music");
const outputFile = path.join(__dirname, "..", "public", "data", "albums.json");

// Hard-coded durations map (seconds)
const customDurations = {
  "A Tape": {
    "Can Never Steal My Dream": 203,
    "Forensick": 197,
    "Inimitable": 213,
    "Fat Pockets": 215,
    "Runners": 218,
    "R U Not Entertained": 176,
    "92 At the Knees": 198,
    "Chop It Down": 222,
    "Somebody Lied": 205,
    "Beep Beep": 241,
    "Temptation": 190,
    "No Matter How Things May Be": 193,
  },
  "B Tape": {
    "Venus": 80,
    "Cause Problem": 213,
    "Call The Waiter": 168,
    "That Wind": 168,
    "Like I Do": 168,
    "What You Wanna Do": 92,
    "Precocious": 185,
    "Recognize": 248,
    "Dark Picket Fence": 110,
    "Typical": 159,
    "Winter": 178,
    "Looking At A Star": 264,
  },
  "Beauty": {
    "East to West Girls": 186,
    "Soak": 198,
    "Be World Famous": 197,
    "Blow It In The Air": 206,
    "Lost In the Rain": 223,
    "Happy Elated": 186,
    "Everything Brighter": 219,
    "Alone I Dream": 166,
    "Good Talk": 209,
    "All of That Tea": 177,
    "Drunk Kids Make Love": 178,
    "Dark Sunglasses": 191,
  },
  "C Tape": {
    "Record A Song For You": 237,
    "Like I Might Have Seen Ya": 194,
    "I Got A Song": 237,
    "I Don't Need": 180,
    "I'll Write You": 189,
    "Take Me To Jail": 156,
    "New Force (LaLa)": 208,
    "Intoxicated": 258,
    "It Make Me Laugh": 144,
    "Choo Choo": 241,
    "Fuzz": 210,
    "Mister Demeanor": 182,
    "Galactic": 37,
    "Super Sweet Obscene": 240,
  },
  "D Tape": {
    "Speak To Me": 156,
    "Fierceo": 240,
    "Hy Heaven": 183,
    "Still Fly On No Sleep": 213,
    "Smokey": 144,
    "Fossil": 178,
    "Oh, Now You Do": 233,
    "Mad Dog": 46,
    "Mile High": 157,
    "Band": 268,
    "Like That": 217,
    "Gloomers": 177,
    "Time N Place": 59,
    "When I Leave": 265,
  },
  "E Tape": {
    "Sleeves": 232,
    "Thunder": 167,
    "Dope People": 214,
    "Dirt Tricks": 186,
    "Don't Understand": 211,
    "Mali": 267,
    "Look Glorious": 152,
    "Thirteenth Floor": 231,
    "Sick Wit It": 135,
    "A King Is A King": 222,
    "Flaming Yawn": 225,
    "Taste": 144,
    "Cuatro": 189,
    "On My Way to Wonderful": 217,
  },
  "Nite-Walk": {
    "Traveller": 179,
    "You Play Your Cards Right": 224,
    "He Don't Hang Around": 241,
    "Fire Up": 211,
    "Monster In The Dark": 234,
    "Make A Scene For Me": 209,
    "Rock de Hard Place": 184,
    "Peek It Real": 191,
    "Have the World": 179,
    "Crows (No Love)": 215,
    "Feeling Different": 228,
    "People Say": 208,
  },
  "The Neighborhood Changed": {
    "Trigger": 191,
    "Sole Benefactor": 177,
    "New Moon Money": 197,
    "Island Hopping Turnstyles": 193,
    "Queen of the Ghetto": 200,
    "Dope Abyss": 174,
    "Man Alive": 238,
    "Burkina Faso": 194,
    "Expect That": 243,
    "Ill Zone": 186,
  },
  "The-'09-Dreamer-Phase-Tape": {
    "Good Cops and Bad Pixar Movies": 178,
    "Silver Tongue": 202,
    "Bon Voyage": 204,
    "09 Dreamer Phase": 224,
    "Knock Me Back To Earth": 182,
    "The Aha Moment": 243,
    "Dialed Up": 197,
    "Take Me To Clouds": 238,
    "Gullible": 182,
    "Hearts In Bubbles": 194,
    "Be Funny": 171,
    "Whether You Like The Weather Or Not": 173,
    "After The Storm": 188,
    "Plantain": 168,
    "Tower": 231,
  },
  "The-Menahan-Street-NYC-Tape": {
    "Luna": 191,
    "G Train": 212,
    "Those Waves": 200,
    "Tony Talk": 207,
    "Salmon": 199,
    "Fillet": 189,
    "Rosie": 188,
    "Helen of Troy": 172,
    "Coming": 178,
    "Buddy": 187,
    "Velcro": 145,
    "Zags": 162,
    "Iron Claws": 154,
  }
};

// ----------------- HELPERS -----------------
const formatTitle = (filename) =>
  filename
    .replace(/\.[^/.]+$/, "")
    .replace(/^[a-zA-Z]?\d+\./, "")
    .replace(/_/g, " ")
    .trim();

const formatId = (name) => name.toLowerCase().replace(/\s+/g, "-");

// ----------------- GENERATE ALBUMS -----------------
const generateAlbums = () => {
  const albumFolders = fs.readdirSync(musicDir);
  const albums = [];

  for (const albumFolder of albumFolders) {
    const albumPath = path.join(musicDir, albumFolder);

    const files = fs
      .readdirSync(albumPath)
      .filter((file) => file.endsWith(".wav") || file.endsWith(".mp3"))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const tracks = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const title = formatTitle(file);

      // ✅ Use custom duration if available, else default 180s
      const duration =
        (customDurations[albumFolder] &&
          customDurations[albumFolder][title]) ||
        180;

      tracks.push({
        id: String(i + 1),
        title,
        src: `/music/${albumFolder}/${file}`,
        duration,
      });
    }

    const totalDuration = tracks.reduce((sum, t) => sum + t.duration, 0);

    albums.push({
      id: formatId(albumFolder),
      title: albumFolder.replace(/-/g, " "),
      artist: "Zen Zinnati",
      cover: `/covers/${formatId(albumFolder)}.jpg`,
      totalDuration,
      tracks,
    });
  }

  // Ensure output folder exists
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });

  // Write JSON
  fs.writeFileSync(outputFile, JSON.stringify(albums, null, 2));
  console.log("✅ albums.json generated with preserved durations!");
};

// Run it
generateAlbums();