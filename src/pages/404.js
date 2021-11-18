import Link from 'next/link'
import styled from 'styled-components'

import Text from '../components/Text'
import Button from '../components/Button'

const Wrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledText = styled(Text)`
  margin-bottom: 2rem;
`

const Buttons = styled.span`
  display: flex;
  align-items: center
  justify-content: center;
  gap: 2rem;

  @media (max-width: 50rem) {
    flex-direction: column;
  }
`

const NotFoundPage = () => {
  return (
    <Wrapper>
      <StyledText>We couldn't find the page you're looking for.</StyledText>
      <Buttons>
      <Link href="/">
        <a>
          <Button>Return home</Button>
        </a>
      </Link>
      <Button as="a" href={"/shareholder_letter.pdf"} download>
        Read our shareholder letter
      </Button>
      </Buttons>
    </Wrapper>
  )
}

export default NotFoundPage