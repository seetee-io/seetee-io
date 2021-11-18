import styled from 'styled-components'
import Link from 'next/link'

import Badge from '../../public/breez_white.svg'

const StyledBreezBadge = styled(Badge)`
	width: ${({width}) => `${width}rem` };
`

const getBreezLink = (episode) => {
	// todo: config file for feed
	const feed = encodeURIComponent('https://closing-the-loop.github.io/feed.xml')

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
