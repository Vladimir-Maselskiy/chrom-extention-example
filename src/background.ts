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
  chrome.tabs.update({}, async tab => {
    debugger;
    switch (command) {
      case 'pin-current-tab':
        chrome.tabs.update({ pinned: !tab?.pinned });
        break;
      case 'copy-current-tab':
        chrome.tabs.duplicate(tab?.id!);
        break;
      case 'move-to-first':
        chrome.tabs.move(tab?.id!, { index: 0 });
        break;
      case 'move-to-last':
        const allTabs = await chrome.tabs.query({});
        chrome.tabs.move(tab?.id!, { index: allTabs.length - 1 });
        break;
    }
  });
});
