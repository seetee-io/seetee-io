import Head from 'next/head'
import config from '../config'

const MetaHead = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={'favicon.ico'} />

        <title>{config.title}</title>

        <meta name="description" content={config.description} />

        <meta name="og:type" property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={config.title} />
        <meta name="og:description" property="og:description" content={config.description} />
        <meta name="og:image" property="og:image" content={config.url + '/logo_social.png'} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@seetee_io" />
        <meta name="twitter:image:alt" content="Seetee" />
      </Head>
    </>
  )
}

export default MetaHead
