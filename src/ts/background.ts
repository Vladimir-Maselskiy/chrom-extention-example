chrome.runtime.onInstalled.addListener(async () => {
  let url = chrome.runtime.getURL('html/hello.html');
  chrome.tabs.create({ url });

  chrome.storage.sync.get(['showClock'], result => {
    console.log('result in bg', result);
    if (result.showClock) {
      chrome.action.setBadgeText({ text: 'On' });
    }
  });
});

chrome.commands.onCommand.addListener(command => {
  debugger;
  chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
    const [activeTab] = tabs;
    const { id: activeTabId } = activeTab;
    const allTabs = await chrome.tabs.query({});

    switch (command) {
      case 'pin-current-tab':
        chrome.tabs.update({ pinned: !activeTab?.pinned });
        break;
      case 'copy-current-tab':
        chrome.tabs.duplicate(activeTabId!);
        break;
      case 'move-to-first':
        chrome.tabs.move(activeTabId!, { index: 0 });
        break;
      case 'move-to-last':
        chrome.tabs.move(activeTabId!, { index: allTabs.length - 1 });
        break;
    }
  });
});
