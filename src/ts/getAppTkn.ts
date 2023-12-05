let currentCsrfToken: string | null = null;

let observer = new MutationObserver(async () => {
  const csrfToken = window?.appInit?.csrfToken;
  if (csrfToken && csrfToken !== currentCsrfToken) {
    sessionStorage.setItem('csrfToken', JSON.stringify(csrfToken));
  }
});

observer.observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true,
});
