# Auto-Pause Videos Extension

A lightweight open-source Chrome extension that automatically pauses media when you switch tabs or windows. It is designed to reduce distraction, save bandwidth, and keep playback under control.

## Features

- Pauses HTML5 video and audio elements when a tab becomes hidden.
- Attempts to pause common embedded players such as YouTube, Vimeo, and Video.js-based players.
- Works locally in your browser with no analytics or external data collection.
- Includes an options page for enabling or disabling auto-pause.
- Supports Manifest V3 and a background injector for faster tab-switch pauses.

## Installation

### Development
1. Clone or download this repository.
2. Open `chrome://extensions/` in Chrome.
3. Enable Developer mode.
4. Click Load unpacked.
5. Select this project folder.

### Chrome Web Store
If the extension is published, install it from the Chrome Web Store like any other extension.

## How it works

When you switch tabs, switch windows, or the browser loses focus, the extension pauses active media on the page. It uses a content script plus a background service worker to improve reliability across pages and frames.

## Privacy

This extension does not collect, store, or transmit browsing history or personal data. All behavior runs locally in your browser.

See [PRIVACY_POLICY.md](PRIVACY_POLICY.md) for full details.

## Permissions

- `storage` is used to save the user's on/off preference.
- `tabs`, `scripting`, and host permissions are used only to pause media in the active tab and its frames.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Open a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

## Support

If you find a site where auto-pause does not work, open an issue with the site name and a short reproduction step.

---

Open source and ready to extend.
