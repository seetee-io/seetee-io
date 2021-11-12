import { useEffect } from 'react'
import { StyleSheetManager } from 'styled-components';
import smoothscroll from 'smoothscroll-polyfill'

import 'normalize.css/normalize.css'
import '../styles/global.css'

import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  useEffect(() => { smoothscroll.polyfill() })

  const Content = <>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>

  return process.env.NODE_ENV === "production" ? (
    Content
  ) : (
    <StyleSheetManager disableVendorPrefixes>{Content}</StyleSheetManager>
  )
}

export default MyApp
