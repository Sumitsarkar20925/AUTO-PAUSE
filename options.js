document.addEventListener('DOMContentLoaded', () => {
  const autoPauseToggle = document.getElementById('autoPauseToggle');
  const statusText = document.getElementById('statusText');

  const setStatus = (enabled) => {
    autoPauseToggle.checked = enabled;
    statusText.textContent = enabled
      ? 'Auto-pause is enabled.'
      : 'Auto-pause is paused until you turn it back on.';
  };

  const saveSetting = (enabled) => {
    if (!chrome?.storage?.sync) {
      setStatus(enabled);
      return;
    }

    chrome.storage.sync.set({ autoPauseEnabled: enabled }, () => {
      setStatus(enabled);
    });
  };

  if (chrome?.storage?.sync) {
    chrome.storage.sync.get({ autoPauseEnabled: true }, (result) => {
      setStatus(result.autoPauseEnabled);
    });
  } else {
    setStatus(true);
  }

  autoPauseToggle.addEventListener('change', () => {
    saveSetting(autoPauseToggle.checked);
  });
});