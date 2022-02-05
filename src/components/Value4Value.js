import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 0.7rem;

  @media (min-width: 50rem) {
    flex-direction: row;
    font-size: 0.8rem;
  }
`

const Recipient = styled.div`
  padding: 0.3rem;
  border: 1px solid var(--gray);
  border-radius: 4px;
  color: var(--gray);
  cursor: pointer;

  margin: 0 0 0.5rem 0;

  @media (min-width: 50rem) {
    margin: 0 0.5rem 0 0;
  }
`

const getTooltipText = (recipient, recipients) => {
  const recipientSplit = parseInt(recipient.split)
  if (isNaN(recipientSplit)) {
    return 0
  }

  const totalShares = recipients.reduce((acc, r) => {
    const parsedSplit = parseInt(r.split)
    if (isNaN(parsedSplit)) {
      return acc
    }
    return acc + parsedSplit
  }, 0)

  const recipientShare = Math.floor((recipientSplit / totalShares) * 100)

  return `${recipient.name} will receive ${recipientShare}% of the payments streamed to this episode.`
}

export default function Value4Value({ recipients }) {
  return (
    <Container>
      <ReactTooltip effect="solid" place="bottom" multiline={true} />
      {recipients.map((r, index) => (
        <Recipient key={index} data-tip={getTooltipText(r, recipients)}>
          {r.name}
        </Recipient>
      ))}
    </Container>
  )
}
