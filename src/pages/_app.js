import {useEffect} from 'react'
import { StyleSheetManager } from "styled-components";
import smoothscroll from 'smoothscroll-polyfill'
import 'normalize.css/normalize.css'

import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => { smoothscroll.polyfill() })

  const Content = <>
    <Component {...pageProps} />
  </>;

  return process.env.NODE_ENV === "production" ? (
    Content
  ) : (
    <StyleSheetManager disableVendorPrefixes>{Content}</StyleSheetManager>
  );
}

export default MyApp