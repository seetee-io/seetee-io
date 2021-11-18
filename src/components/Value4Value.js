import styled from 'styled-components'

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

export default function Value4Value({ recipients }) {
  return (
    <Container>
      {recipients.map((r) => (
        <Recipient key={r.address}>
          {r.name}
        </Recipient>
      ))}
    </Container>
  )
}
