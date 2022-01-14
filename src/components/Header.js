import { useState } from 'react'

import { useRouter } from 'next/router'
import styled from 'styled-components'

import { StyledLogo, Text, Button } from '.'

const StyledHeader = styled.header`
  margin-bottom: 3.4375rem;
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 20rem) {
    flex-direction: column;
  }

  @media (max-width: 50rem) {
    .download-button {
      display: none;
    }
  }

  @media (min-width: 50rem) {
    padding: 2rem 3rem;
    margin-bottom: 7.875rem;
  }
`

const HomeItem = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const TrailingItems = styled.span`
  margin-left: 1rem;

  display: flex;
  justify-content: flex-end;
  align-items: baseline;

  @media (min-width: 50rem) {
    gap: 1.8rem;
  }

  @media (max-width: 20rem) {
    margin-left: 0px;
    margin-top: 1rem;
  }
`

const NavItems = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  gap: 0.5rem;
`

const TextItem = styled.a`
  color: var(--white);
  font-size: 1.125rem;
  text-decoration: none;
  cursor: pointer;

  padding: 0.5rem 0.75rem;
  border-radius: 24px;
  background: ${(props) => (props.active ? 'rgba(255, 255, 255, .1)' : 'rgba(255, 255, 255, 0)')};

  @media (min-width: 50rem) {
    font-size: 1.25rem;
    padding: 0.75rem 1.5rem;

    :hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }
`

const Header = () => {
  const getActiveItemFromPath = (path) => {
    switch (true) {
      case /\/blog.*/.test(path):
        return 1
      case /\/podcast.*/.test(path):
        return 2
      default:
        return 0
    }
  }

  const router = useRouter()
  const [activeItem, setActiveItem] = useState(() => {
    return getActiveItemFromPath(router.pathname)
  })

  const handleItemClick = (e, path) => {
    e.preventDefault()

    setActiveItem(getActiveItemFromPath(path))

    router.push(path)
  }

  return (
    <StyledHeader>
      <HomeItem onClick={(e) => handleItemClick(e, '/')}>
        <StyledLogo />
      </HomeItem>
      <TrailingItems>
        <NavItems>
          <TextItem onClick={(e) => handleItemClick(e, '/blog')} active={activeItem == 1}>
            Blog
          </TextItem>
          <TextItem onClick={(e) => handleItemClick(e, '/podcast')} active={activeItem == 2}>
            Podcast
          </TextItem>
        </NavItems>
        <Button
          className="download-button"
          as="a"
          href="/static/shareholder_letter-6ae7e85717c28831bf1c0eca1d632722.pdf"
          download
        >
          Read our shareholder letter
        </Button>
      </TrailingItems>
    </StyledHeader>
  )
}

export default Header
