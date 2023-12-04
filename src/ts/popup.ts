import { site } from './const';

const activeCurrentTab = { active: true, currentWindow: true };

document.addEventListener('DOMContentLoaded',  () =>{
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
      console.log('redirectSpan', redirectSpan);
      redirectSpan.addEventListener('click', () => {
        console.log('click');
        chrome.tabs.query(activeCurrentTab, function (tabs) {
          chrome.tabs.update(tabs[0].id!, { url: site });
          window.close();
        });
      });
    }
  });
});
