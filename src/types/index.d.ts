export {};

declare global {
  interface Window {
    appInit: {
      csrfToken: string;
    };
  }
}
