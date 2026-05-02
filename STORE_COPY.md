=== Chrome Web Store Copy (ready to paste) ===

-- Title (name)
Auto-Pause Videos

-- Short description (<=132 chars)
Automatically pauses playing videos when you switch tabs or windows to save bandwidth and avoid missing content.

-- Full Description
Auto-Pause Videos helps you stay focused and save bandwidth by automatically pausing media when you leave a tab or switch windows.

When enabled, the extension:
- Detects when a tab becomes hidden (you switch tabs) or the browser window loses focus (you switch applications).
- Pauses standard HTML5 `<video>` and `<audio>` elements immediately.
- Attempts to pause common embedded players (YouTube, Vimeo, Video.js) and known player APIs where possible.

Why use Auto-Pause Videos?
- Never miss the next segment of a lesson — playback stops when you switch away.
- Save network and CPU resources by halting background playback.
- Lightweight and privacy-first: all processing runs locally in your browser; the extension does not collect or transmit any browsing data.

Limitations
Some sites use cross-origin frames, DRM-protected players, or custom playback systems that prevent programmatic pausing. In such cases the extension may be unable to pause the video. See the support section for workarounds.

-- Promotional blurb (short marketing)
Save bandwidth and stay focused — automatically pause videos when you leave the tab.

-- What's New (for store changelog)
1.1.0 — Improved pausing reliability: added background injector and player API attempts; improved diagnostics.
1.0.0 — Initial public release: basic auto-pause for HTML5 media and embedded players.

-- Feature highlights (bullets)
- Pauses HTML5 `video`/`audio` when the tab is hidden or the window blurs.
- Signals embedded YouTube/Vimeo players to pause when possible.
- Attempts to use common player APIs (Video.js, global player objects) for better coverage.
- Local-only operation — no external servers or analytics.
- Small, low-overhead background service worker to ensure immediate pauses on tab switches.

-- Support / Contact
For support or bug reports, open an issue in this repository or email: your-email@example.com

-- Suggested keywords (for your SEO)
auto pause, pause videos, pause background videos, video pause, video control, tab pause, focus, Udemy, YouTube, Vimeo

-- Screenshot captions (copy for screenshot alt text)
1. "Auto-Pause pausing a playing video after switching tabs"
2. "Options page to enable or disable automatic pausing"

-- Permissions justification (copy into Developer Dashboard permission fields)
- `storage`: To save the user's enabled/disabled preference (no other data stored).
- `scripting`, `tabs`, `host_permissions` (if present): Required to inject pause code into active pages and frames so the extension can pause media on tab switches. The extension does not read or transmit page content.

-- Privacy summary (short text for listing)
This extension performs all actions locally in your browser and does not collect, store, or transmit any personal data or browsing history.

---

Replace `your-email@example.com` with your support email before publishing.
