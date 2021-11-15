import { fetchEpisodes } from '../../lib/feed'

export default function Podcast({ id }) {
  return (
    <>
      {id}
    </>
  )
}

export async function getStaticPaths() {
  const episodes = await fetchEpisodes()
  const paths = episodes.map((episode) => {
    return {
      params: {
        id: episode.slug
      }
    }
  })

  return {
    paths,
    fallback : false
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id
    }
  }
}
