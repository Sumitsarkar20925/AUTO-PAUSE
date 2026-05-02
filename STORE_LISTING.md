Title
Auto-Pause Videos

Short description
Automatically pauses playing videos when you switch tabs or windows.

Long description
Auto-Pause Videos helps you focus and saves bandwidth by automatically pausing media when you leave a tab or switch windows.

Features
- Pauses HTML5 `<video>` and `<audio>` elements when the tab becomes hidden or the window loses focus.
- Attempts to pause common player APIs (Video.js, embedded YouTube/Vimeo players).
- Runs locally in your browser; no data is collected or sent externally.
- Lightweight and unobtrusive UI — runs silently in the background.

How it works
- The extension injects a small content script into pages to detect when a tab becomes hidden or the window blurs and pauses playing media elements. A background service worker injects a pause helper when tabs switch to ensure media is paused immediately.

Permissions and justification
- `storage` — store the user's enabled/disabled preference.
- `scripting`, `tabs`, `host_permissions` (if used) — required to inject pause code into pages and frames. Provide clear justification in the Chrome Web Store form explaining that these are used only to pause media and not to read or transmit content.

Notes and limitations
- The extension pauses standard HTML5 players and well-known embedded players (YouTube/Vimeo). Some DRM-protected players, cross-origin frames, or custom players may prevent programmatic pausing — in these cases, the extension may not be able to pause the video.
- If a website uses a cross-origin iframe for playback, it may be impossible for an extension to pause that media due to browser security.

Support
- For issues or questions, open an issue in this repository or contact: your-email@example.com

Changelog (for store)
- 1.1.0 — Add background injector and player API attempts, better diagnostics

---

Suggested short marketing blurb
Save time and bandwidth — automatically pauses videos when you switch tabs or windows so you never miss a moment and reduce background playback.
