export const $ = (selector) => {
  const maybeHTMLElement = document.querySelector(selector);

  if (!(maybeHTMLElement instanceof HTMLElement)) return null;

  return maybeHTMLElement;
};
