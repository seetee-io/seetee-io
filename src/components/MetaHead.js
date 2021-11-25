import Head from 'next/head'
import config from '../config'

const MetaHead = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={'favicon.ico'} />
      </Head>
      <SubHead {...config} />
    </>
  )
}

const SubHead = (props) => {
  return (
    <Head>
      <title>{props.title}</title>

      {props.description && (
        <meta name="description" content={props.description} />
      )}
      {props.url && <meta property="og:url" content={props.url} />}
      <meta property="og:title" content={props.title} />
      {props.description && (
        <meta property="og:description" content={props.description} />
      )}
      {props.image && <meta property="og:image" content={props.image} />}
      <meta name="twitter:title" content={props.title} />
      {props.description && (
        <meta name="twitter:description" content={props.description} />
      )}
      {props.image && <meta name="twitter:image" content={props.image} />}
    </Head>
  )
}

export default MetaHead
