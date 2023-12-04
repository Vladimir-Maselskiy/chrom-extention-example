import { site } from './const';

// константа настроек активной текущей вкладки
const activeCurrentTab = { active: true, currentWindow: true };

// открываєм страницу приветсвия при установке или обновлении расширения
chrome.runtime.onInstalled.addListener(async () => {
  let url = chrome.runtime.getURL('html/hello.html');
  chrome.tabs.create({ url });
});

// функция добавления/удаления badge "on" если url вкладки соответсвуєт условию расширения
const setBadgeToIcon = (tabs: chrome.tabs.Tab[]) => {
  const [activeTab] = tabs;
  const { url } = activeTab;
  console.log('url in onActivated', url);
  if (url!.includes(site)) {
    chrome.action.setBadgeText({ text: 'on' });
  } else {
    chrome.action.setBadgeText({ text: '' });
  }
};

// add/remove badge "on" при переключении вкладок
chrome.tabs.onActivated.addListener(_ => {
  chrome.tabs.query(activeCurrentTab, tabs => {
    setBadgeToIcon(tabs);
  });
});

// add/remove badge "on" при изменении url внутри вкладки
chrome.tabs.onUpdated.addListener(_ => {
  chrome.tabs.query(activeCurrentTab, tabs => {
    setBadgeToIcon(tabs);
  });
});

chrome.commands.onCommand.addListener(command => {
  debugger;
  chrome.tabs.query(activeCurrentTab, async tabs => {
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
