/**
 * Auto-Pause Videos Extension
 * Automatically pauses all playing videos when switching tabs or windows
 */

(function () {
  const logPrefix = 'Auto-Pause:';

  function pauseMediaElements() {
    try {
      const medias = Array.from(document.querySelectorAll('video, audio'));
      let pausedCount = 0;
      medias.forEach(m => {
        if (!m.paused) {
          try { m.pause(); pausedCount++; } catch (e) { /* ignore */ }
        }
      });

      // Pause YouTube/Vimeo iframes
      const iframes = Array.from(document.querySelectorAll('iframe'));
      let iframePaused = 0;
      iframes.forEach(iframe => {
        const src = iframe.src || '';
        try {
          if (src.includes('youtube.com') || src.includes('youtube-nocookie.com')) {
            // YouTube iframe API 'pauseVideo' command via postMessage
            iframe.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
            iframePaused++;
          } else if (src.includes('vimeo.com')) {
            // Vimeo postMessage API
            iframe.contentWindow?.postMessage({ method: 'pause' }, '*');
            iframePaused++;
          }
        } catch (e) {
          // cross-origin may throw; still safe to attempt postMessage on iframe element
          try {
            iframe.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
            iframePaused++;
          } catch (_) { /* ignore */ }
        }
      });

      // Try common player APIs on the page and same-origin frames (videojs, global player, shaka, mux)
      let playerAPIAttempts = 0;
      try {
        // Top-level page globals
        try {
          if (window.videojs) {
            try {
              if (typeof window.videojs.getAllPlayers === 'function') {
                window.videojs.getAllPlayers().forEach(p => { try { if (typeof p.pause === 'function') { p.pause(); playerAPIAttempts++; } } catch (e) {} });
              } else if (window.videojs.players) {
                Object.values(window.videojs.players).forEach(p => { try { p.pause && p.pause(); playerAPIAttempts++; } catch (e) {} });
              }
            } catch (e) {}
          }
        } catch (e) {}

        try { if (window.player && typeof window.player.pause === 'function') { window.player.pause(); playerAPIAttempts++; } } catch (e) {}
        try { if (window.shaka && typeof window.shaka.Player !== 'undefined') { /* shaka instances usually attached to video; fallback to pausing videos above */ playerAPIAttempts++; } } catch (e) {}
        try { if (window.mux && typeof window.mux === 'object') { /* can't reliably call pause globally, but note presence */ playerAPIAttempts++; } } catch (e) {}

        // Try same-origin iframes for player globals
        iframes.forEach(iframe => {
          try {
            const cw = iframe.contentWindow;
            if (!cw) return;
            try {
              if (cw.videojs) {
                try {
                  if (typeof cw.videojs.getAllPlayers === 'function') {
                    cw.videojs.getAllPlayers().forEach(p => { try { if (typeof p.pause === 'function') { p.pause(); playerAPIAttempts++; } } catch (e) {} });
                  } else if (cw.videojs.players) {
                    Object.values(cw.videojs.players).forEach(p => { try { p.pause && p.pause(); playerAPIAttempts++; } catch (e) {} });
                  }
                } catch (e) {}
              }
            } catch (e) {}

            try { if (cw.player && typeof cw.player.pause === 'function') { cw.player.pause(); playerAPIAttempts++; } } catch (e) {}
          } catch (e) {
            // cross-origin frames will throw here; ignore
          }
        });
      } catch (e) {
        // ignore
      }

      console.log(`${logPrefix} paused ${pausedCount} media elements, signaled ${iframePaused} iframes, playerAPI attempts ${playerAPIAttempts}.`);
      return { pausedCount, iframePaused, playerAPIAttempts };
    } catch (err) {
      console.error(`${logPrefix} error pausing media:`, err);
      return { pausedCount: 0, iframePaused: 0, playerAPIAttempts: 0 };
    }
  }

  // Pause immediately when tab becomes hidden
  function handleVisibilityChange() {
    console.log(`${logPrefix} visibilitychange -> hidden=${document.hidden}`);
    if (document.hidden) {
      pauseMediaElements();
    }
  }

  // Also pause on window blur as a fallback for some browsers/environments
  function handleBlur() {
    console.log(`${logPrefix} blur event`);
    pauseMediaElements();
  }

  // Observe new media elements being added and pause them immediately if tab is hidden
  const mediaObserver = new MutationObserver(mutations => {
    if (!document.hidden) return;
    let found = false;
    for (const m of mutations) {
      for (const node of Array.from(m.addedNodes || [])) {
        if (node.nodeType !== 1) continue;
        if (node.matches && (node.matches('video') || node.matches('audio') || node.querySelector && (node.querySelector('video, audio')))) {
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (found) pauseMediaElements();
  });

  function startObserver() {
    try {
      mediaObserver.observe(document.documentElement || document.body || document, {
        childList: true,
        subtree: true
      });
    } catch (e) {
      // ignore
    }
  }

  // Expose a test helper for manual invocation in the page console
  window.__autoPauseTest = function () {
    console.log(`${logPrefix} manual test invoked`);
    return pauseMediaElements();
  };

  // Alt+P shortcut
  window.addEventListener('keydown', (e) => {
    if (e.altKey && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      console.log(`${logPrefix} Alt+P pressed`);
      pauseMediaElements();
    }
  });

  // Setup listeners
  document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
  window.addEventListener('blur', handleBlur, { passive: true });

  // Start observer and log initialization
  startObserver();
  console.log(`${logPrefix} Initialized - listening for visibilitychange/blur and new media nodes.`);
})();
