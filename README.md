# Auto-Pause Videos Extension

A lightweight Chrome extension that automatically pauses all playing videos when you switch tabs or windows. Perfect for saving bandwidth and improving productivity.

## Features

- **Automatic Pause**: Instantly pauses videos when you switch tabs
- **Multiple Formats**: Works with standard HTML5 `<video>` elements
- **Shadow DOM Support**: Handles videos in Shadow DOM (custom elements)
- **Lightweight**: Minimal performance impact
- **Settings Page**: Turn auto-pause on or off from the extension options
- **No Tracking**: Runs locally without analytics or external calls

## Installation

### For Chrome Web Store (Recommended)
1. Publish the packaged extension through the Chrome Web Store Developer Dashboard
2. Click "Add to Chrome"
3. Confirm the permissions
4. Done! The extension will start working immediately

### For Development/Manual Installation
1. Clone or download this repository
2. Open `chrome://extensions/` in Chrome
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked"
5. Select the extension folder
6. The extension will appear in your extensions list

## How It Works

When you:
- Switch to another tab
- Minimize the browser window
- Switch to another application

All playing videos on the current tab will automatically pause. This helps:
- **Save Bandwidth**: Stop unnecessary data usage
- **Improve Productivity**: Focus on what matters without distracting autoplay
- **Extend Battery Life**: Reduce CPU usage on laptop/mobile devices

## File Structure

```
AUTO-PAUSE/
├── manifest.json      # Extension configuration
├── content.js         # Core functionality
├── icons/             # Extension icons (16x16, 48x48, 128x128)
├── README.md          # This file
├── PRIVACY_POLICY.md  # Privacy policy
└── LICENSE            # MIT License
```

## Technical Details

### Manifest V3
The extension uses Manifest V3, the latest Chrome extension standard with improved security and performance.

### Permissions
- `storage`: Stores the on/off setting in Chrome sync storage

### Content Script
- Runs on all pages (`http://` and `https://`)
- Executes at `document_idle` for performance
- Works across all frames including Shadow DOM

## Troubleshooting

### Videos not pausing?
- Ensure the extension is enabled in `chrome://extensions/`
- Some custom video players may override pause functionality
- Try refreshing the page

### Performance issues?
- The extension is designed to be lightweight
- If you notice issues, check if other extensions are conflicting
- Report the issue on GitHub

## Privacy

This extension:
- ✅ Does NOT collect any data
- ✅ Does NOT track user behavior
- ✅ Does NOT require login or authentication
- ✅ Works entirely offline

See [PRIVACY_POLICY.md](PRIVACY_POLICY.md) for complete details.

## Permissions Explanation

The extension requires:
- **storage**: To persist the user preference for enabling or disabling auto-pause

These permissions are necessary and only used to pause videos when tabs become hidden.

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Version History

### Version 1.0.0
- Initial release
- Auto-pause on tab switch
- Shadow DOM support
- Works on all websites

## Support

For issues, feature requests, or suggestions:
- Use the extension settings page to disable auto-pause if needed
- Update this section with your support contact before publishing

## Acknowledgments

Built with the Chrome Extension API documentation and community best practices.

---

**Enjoy productive browsing with Auto-Pause Videos!** 🎬⏸️
