import styled from 'styled-components'
import Link from 'next/link'
import config from '../config'

import Badge from '../../public/breez_white.svg'

const StyledBreezBadge = styled(Badge)`
  width: ${({ width }) => `${width}rem`};
`

const getBreezLink = (episode) => {
  const feed = encodeURIComponent(config.podcastFeed)

  return `https://breez.link/p?feedURL=${feed}&episodeID=${episode.guid}`
}

export default function BreezBadge({ width, episode }) {
  return (
    <Link href={getBreezLink(episode)}>
      <a>
        <StyledBreezBadge width={width} />
      </a>
    </Link>
  )
}
