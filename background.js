// Background service worker: pause media in the tab that loses focus
let lastActiveTabId = null;

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0]) lastActiveTabId = tabs[0].id;
  });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  const newTabId = activeInfo.tabId;
  if (lastActiveTabId && lastActiveTabId !== newTabId) {
    pauseTab(lastActiveTabId);
  }
  lastActiveTabId = newTabId;
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (tabId === lastActiveTabId) lastActiveTabId = null;
});

function pauseTab(tabId) {
  // Ensure the tab URL is a web-accessible URL (not chrome://, about:, or the Web Store)
  chrome.tabs.get(tabId, (tab) => {
    if (chrome.runtime.lastError) {
      console.warn('Auto-Pause: tabs.get error', chrome.runtime.lastError.message);
      return;
    }
    if (!tab || !tab.url) return;
    const url = tab.url + '';
    // Only inject into http(s) and file URLs
    if (!/^https?:\/\//.test(url) && !/^file:\/\//.test(url)) {
      console.log('Auto-Pause: skipping non-web URL', url);
      return;
    }

    try {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId, allFrames: true },
          func: () => {
            try {
              const medias = Array.from(document.querySelectorAll('video, audio'));
              medias.forEach(m => { try { if (!m.paused) m.pause(); } catch (e) {} });

              const iframes = Array.from(document.querySelectorAll('iframe'));
              iframes.forEach(iframe => {
                try {
                  const src = iframe.src || '';
                  if (src.includes('youtube.com') || src.includes('youtube-nocookie.com')) {
                    iframe.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
                  } else if (src.includes('vimeo.com')) {
                    iframe.contentWindow?.postMessage({ method: 'pause' }, '*');
                  }
                } catch (e) {}
              });

              // Try player APIs (videojs, global player) in the injected context
              try {
                if (window.videojs) {
                  try {
                    if (typeof window.videojs.getAllPlayers === 'function') {
                      window.videojs.getAllPlayers().forEach(p => { try { if (typeof p.pause === 'function') p.pause(); } catch (e) {} });
                    } else if (window.videojs.players) {
                      Object.values(window.videojs.players).forEach(p => { try { p.pause && p.pause(); } catch (e) {} });
                    }
                  } catch (e) {}
                }
              } catch (e) {}

              try { if (window.player && typeof window.player.pause === 'function') { window.player.pause(); } } catch (e) {}

              console.log('Auto-Pause (injected): paused media via background script.');
            } catch (e) {
              // ignore
            }
          }
        },
        () => {
          if (chrome.runtime.lastError) {
            console.warn('Auto-Pause: scripting.executeScript error', chrome.runtime.lastError.message);
          }
        }
      );
    } catch (e) {
      console.warn('Auto-Pause: executeScript threw', e && e.message);
    }
  });
}
