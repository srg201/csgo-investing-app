export const getRssDomain = (feedUrl: string) => {
  const url = new URL(feedUrl);
  return url.hostname;
};

export const getNewsLink = (feedUrl: string, itemLink: string) => {
  const domain = getRssDomain(feedUrl);
  return itemLink.includes('http') ? itemLink : domain + itemLink;
};
