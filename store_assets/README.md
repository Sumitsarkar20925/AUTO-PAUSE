Store assets checklist and screenshot guidance

Required assets for Chrome Web Store listing:

- `icon_128.png` (128×128) — Primary store icon (PNG, transparent background allowed)
- `screenshot_1.png` (recommended 1280×800 or similar landscape) — Show the extension in action (DevTools Console with logs and a playing video paused)
- `screenshot_2.png` — Highlight popup/options UI (if you implement a popup or options page)
- `promo_tile.png` (optional) — large promotional tile if you want to feature the extension

Screenshot guidance:
- Use high-resolution PNGs (no compression artifacts)
- Show the extension actively pausing a video (capture the page with a visible player before/after pause) — add a small caption to the image
- Avoid including personally-identifiable information or other users' data
- Save at least two screenshots; the store accepts multiple sizes but commonly uses 1280×800 or 640×400

How to capture screenshots on Windows:
1. Open the target page (e.g., `http://localhost:8000/test_videos.html` or a page with a video)
2. Open DevTools (F12) and ensure `content.js` logs are visible in Console
3. Use `PrtScn` or the Snipping Tool to capture the browser window
4. Crop and export to PNG at the recommended resolution

File naming suggestions (place in `store_assets/`):
- `icon_128.png`
- `screenshot_1.png`
- `screenshot_2.png`
- `promo_tile.png` (optional)

Accessibility & alt text
- For each screenshot, provide short alt text describing the image, e.g.: "Extension pausing a playing video on a lesson page"

Hosting suggestion for Privacy Policy
- If you don't already have a hosted URL for `PRIVACY_POLICY.md`, publish it via GitHub Pages or a raw GitHub URL.
- Example: `https://your-username.github.io/AUTO-PAUSE/PRIVACY_POLICY.html`

Tips for the store listing text
- Keep the short description to one sentence (~120 characters).
- The long description can be 2–4 short paragraphs highlighting benefits, features, and privacy assurances.
- Include contact/support information and a brief troubleshooting line.
