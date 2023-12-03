chrome.runtime.onInstalled.addListener(async () => {
  let url = chrome.runtime.getURL('html/hello.html');
  console.log('url in bgJS', url);
  chrome.tabs.create({ url });
});
``;
