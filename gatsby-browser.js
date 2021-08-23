import wrapProviders from "./wrap-providers";
import smoothscroll from "smoothscroll-polyfill";
import "normalize.css";
import "@styles/global.css";

export const wrapRootElement = (props) => {
  smoothscroll.polyfill();
  return wrapProviders(props);
};
