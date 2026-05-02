Release and packaging instructions

1) Bump version in `manifest.json`
- Open `manifest.json` and update the `version` field (e.g., "1.1.0" -> "1.1.1").

2) Build/verify
- Confirm all files are present in the extension folder: `manifest.json`, `content.js`, `background.js`, `popup.html` (if present), `options.html`, icons, and other assets.
- Test locally by loading Unpacked in chrome://extensions.

3) Create ZIP package (PowerShell example)
```powershell
cd "C:\Users\Ssark\Desktop\Mern\practise\AUTO-PAUSE"
# Create zip in parent folder
Compress-Archive -Path * -DestinationPath ..\auto-pause-v1.1.1.zip
```
Or using Command Prompt with 7zip (if installed):
```cmd
cd C:\Users\Ssark\Desktop\Mern\practise\AUTO-PAUSE
"C:\Program Files\7-Zip\7z.exe" a ..\auto-pause-v1.1.1.zip *
```

4) Developer Dashboard
- Sign in to the Chrome Web Store Developer Dashboard
- Create a new item or update an existing item
- Upload the ZIP package
- Fill in listing fields (use `STORE_COPY.md` and `STORE_LISTING.md` for copy)
- Upload screenshots found in `store_assets/` and the `icon_128.png`
- Provide the Privacy Policy URL (host `PRIVACY_POLICY.md` via GitHub Pages or another public URL)
- Provide a contact/support email and permission justifications

5) Submit for review and monitor
- Click Publish/Submit and follow the dashboard notifications. The review typically takes anywhere from a few hours to several days.

6) Post-publish
- Verify the extension installs from the Chrome Web Store and behaves as expected.
- Monitor user feedback and crash/reports in the dashboard.

Notes
- Keep `manifest_version` at 3 and avoid runtime inline scripts or use proper CSP.
- If your extension requests `<all_urls>` or broad host permissions, be ready to provide clear justification in the dashboard.
