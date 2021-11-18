import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import { Text } from '.'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.5rem;

  @media (min-width: 50rem) {
    flex-direction: row;
    font-size: 0.8rem;
  }
`

const Recipient = styled.div`
  padding: 0.3rem;
  border: 1px solid  rgba(0,0,0,0.4);
  border-radius: 4px;
  color: rgba(0,0,0,0.4);
  cursor: pointer;
`

const getTooltipText = (recipient, recipients) => {
  const recipientSplit = parseInt(recipient.split)
  if (isNaN(recipientSplit)) { return 0 }

  const totalShares = recipients.reduce((acc, r) => {
    const parsedSplit = parseInt(r.split)
    if (isNaN(parsedSplit)) { return 0 }
    return acc + parsedSplit
  }, 0)

  const recipientShare = Math.floor((recipientSplit / totalShares) * 100)

  return `${recipient.name} will receive ${recipientShare}% of the payments streamed to this episode.`
}

export default function Value4Value({ recipients }) {
  return (
    <Container>
      <ReactTooltip effect="solid" place="bottom" multiline="true"/>
      {recipients.map((r, index) => (
        <Recipient key={index} data-tip={getTooltipText(r, recipients)}>
          {r.name}
        </Recipient>
      ))}
    </Container>
  )
}
