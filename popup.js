document.addEventListener('DOMContentLoaded', () => {
  const statusText = document.getElementById('statusText');
  const statusIndicator = document.getElementById('statusIndicator');
  const openOptions = document.getElementById('openOptions');
  const openPrivacy = document.getElementById('openPrivacy');

  const updateStatus = (enabled) => {
    statusText.textContent = enabled ? 'Enabled' : 'Paused';
    statusIndicator.classList.toggle('active', enabled);
    statusIndicator.setAttribute('aria-label', enabled ? 'Extension enabled' : 'Extension paused');
  };

  const loadStatus = () => {
    if (!chrome?.storage?.sync) {
      updateStatus(true);
      return;
    }

    chrome.storage.sync.get({ autoPauseEnabled: true }, (result) => {
      updateStatus(result.autoPauseEnabled);
    });
  };

  openOptions.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  openPrivacy.addEventListener('click', () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('PRIVACY_POLICY.md')
    });
  });

  loadStatus();
});
