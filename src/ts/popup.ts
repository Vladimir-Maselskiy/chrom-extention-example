import { site } from './const';

const activeCurrentTab = { active: true, currentWindow: true };

document.addEventListener('DOMContentLoaded', () => {
  const inputRef = <HTMLInputElement>document.querySelector('.message-input');

  const onCoButtonRefClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id!, { action: 'customAction' });
    });
  };

  const onClearButtonRefClick = () => {
    chrome.storage.local.remove('values', function () {
      console.log('Значение успешно удалено');
    });
  };

  const onSubmitButtonRefClick = (e: any) => {
    const currentValue = inputRef?.value.trim();
    if (currentValue !== '') {
      chrome.storage.local.get('values', res => {
        const storageValue: string[] = res.values || [];
        chrome.storage.local.set({
          values: [...storageValue, currentValue],
        });
      });
    }
  };

  const submitButtonRef = document.querySelector('.submit-button');
  const clearStorageButtonRef = document.querySelector('.clear-storage-button');
  const coButtonRef = document.querySelector('.co-button');

  submitButtonRef?.addEventListener('click', onSubmitButtonRefClick);
  clearStorageButtonRef?.addEventListener('click', onClearButtonRefClick);
  coButtonRef?.addEventListener('click', onCoButtonRefClick);

  chrome.tabs.query(activeCurrentTab, function (tabs) {
    let activeTabUrl = tabs[0].url;
    let matchingContentRef = <HTMLElement>(
      document.querySelector('.matching-content')
    );
    let nonMatchingContentRef = <HTMLElement>(
      document.querySelector('.non-matching-content')
    );

    // определяєм контент для отображения попап окна, в зависимости соответсвия url страници условию
    if (activeTabUrl!.includes(site)) {
      matchingContentRef!.style.display = 'block';
      nonMatchingContentRef.style.display = 'none';
    } else {
      matchingContentRef.style.display = 'none';
      nonMatchingContentRef.style.display = 'block';

      //  фунционал для условия: если url не сооствествует,юзер может сделать редирект на таргет сайт
      let redirectSpan = <HTMLElement>document.querySelector('.redirect-span');
      redirectSpan.addEventListener('click', () => {
        chrome.tabs.query(activeCurrentTab, function (tabs) {
          chrome.tabs.update(tabs[0].id!, { url: site });
          window.close();
        });
      });
    }
  });
});
