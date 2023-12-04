let existingDivRef: HTMLElement | null = null;
let isFirstUpdate = true;
let currentLocation = '';

const setElementStyles = (element: HTMLElement) => {
  element.style.width = '100%';
  element.style.minHeight = '40px';
  element.style.border = '2px solid green';
  element.style.margin = '10px 0';
  element.style.borderRadius = '4px';
};

let observer = new MutationObserver(() => {
  // если изменился url сбрасываем значения флага и ссылки на место вставки
  if (currentLocation !== window.location.href) {
    currentLocation = window.location.href;
    isFirstUpdate = true;
    existingDivRef = null;
  }

  //   получаем ссылку на блок за которым будем вставлять кастомный блок
  if (!existingDivRef) {
    existingDivRef = <HTMLElement>(
      document.getElementById('sale-light-tour-step5')
    );
  }

  //   если есть место вставки и вставка не была езе произведена, то вставляем кастомный блок на сайт
  if (existingDivRef && isFirstUpdate) {
    isFirstUpdate = false;
    const customDivElement = document.createElement('div');
    customDivElement.textContent = '';
    setElementStyles(customDivElement);
    existingDivRef.parentNode?.insertBefore(
      customDivElement,
      existingDivRef.nextElementSibling
    );

    const storageChangeListener = () => {
      customDivElement.textContent = '';
      chrome.storage.local.get('values', res => {
        let currentValues = res.values as string[];
        console.log('currentValues', currentValues);
        currentValues.forEach(value => {
          let valueDivRef = document.createElement('div');
          valueDivRef.textContent = value;
          customDivElement.appendChild(valueDivRef);
        });
      });
    };
    chrome.storage.onChanged.addListener(storageChangeListener);
  }
});

observer.observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true,
});
