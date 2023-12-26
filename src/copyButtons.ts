import { logseq as PL } from "../package.json";
import { doc } from "./global";
import { clipboardIcon, checkIcon } from ".";
import axios from 'axios';
// import {exec} from "node:child_process";
// import { saveAs } from 'file-saver';

export const setCopyButtons = (links: HTMLAnchorElement[]) => {
  links.forEach((link) => {
    if (link.nextElementSibling?.classList.contains(`${PL.id}-button`)) return;

    const href = link.getAttribute("data-href");

    // check if there is a link
    if (!href) return;

    // create button
    const button = doc.createElement("button");
    // add styles
    button.classList.add(`${PL.id}-button`);
    // add icon
    button.innerHTML = clipboardIcon;

    button.addEventListener("click", async () => {
      try {
        const response = await axios.post('http://127.0.0.1:3000/openfile', {filePath: href});
        console.log(response.data);
        await parent.navigator.clipboard.writeText(href);
        // window.open(href.slice(0, href.lastIndexOf('/')));
        // saveAs("https://httpbin.org/image", "/tmp/image.jpg");
        button.innerHTML = checkIcon;
        setTimeout(() => (button.innerHTML = clipboardIcon), 1000);
      } catch (e) {
        console.error("Error while copying a url", e);
      }
    });

    // add button
    link.insertAdjacentElement("afterend", button);
  });
};

export const removeCopyButtons = () => {
  const buttons = [
    ...doc.querySelectorAll(`.${PL.id}-button`),
  ] as HTMLButtonElement[];
  buttons.forEach((button) => button.remove());
};
