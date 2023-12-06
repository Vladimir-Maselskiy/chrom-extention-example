let currentCsrfToken: string | null = null;

let observer = new MutationObserver(async () => {
  const csrfToken = window?.appInit?.csrfToken;
  if (csrfToken && currentCsrfToken !== csrfToken) {
    currentCsrfToken = csrfToken;
    sessionStorage.setItem('csrfToken', currentCsrfToken);
  }
});

observer.observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true,
});
