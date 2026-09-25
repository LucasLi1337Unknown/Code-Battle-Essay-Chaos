# Code Battle: The 0.0000000001-Bit Essay

A ridiculous interactive web game about Lucas pretending to write an English essay while playing chess, Dad revealing suspiciously strong C++ knowledge, Stockfish calculating the family conversation, Doubao becoming a refrigerator, and one innocent goat being blamed for dead RAM.

## Features

- Five-round branching Code Battle
- Multiple endings based on player choices
- Interactive fake terminal with secret commands
- Persistent achievements using `localStorage`
- Sound effects generated in-browser
- Responsive layout for desktop and mobile
- No frameworks, packages, accounts or API keys

## Run locally

Open `index.html` in a browser. For the most reliable local preview, run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with GitHub Pages

1. Upload every file to the root of a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Click **Save**.

## Files

- `index.html` — page structure and story content
- `styles.css` — visual design and responsive layout
- `app.js` — battle system, terminal, achievements and sound

## License

MIT. Fork it, remix it, add more academically questionable decisions.
