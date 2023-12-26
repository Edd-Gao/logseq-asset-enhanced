import { doc, globals } from "./global";

export const getExternalLinks = () => {
  // Select all anchor elements
  const allLinks = doc.querySelectorAll(globals.extLinksSelector);

  // Filter to get only those with href starting with 'file://'
  console.log(allLinks)
  const fileLinks = Array.from(allLinks).filter(link => link.href.startsWith('file://'));
  console.log(fileLinks)
  return fileLinks as HTMLAnchorElement[];
};
