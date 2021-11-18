import styled from "styled-components";

const Element = styled.button`
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  background: var(--white);
  border: 1px solid var(--white);
  border-radius: 24px;

  transition: 0.25s ease-in-out;
  font-size: 1.125rem;
  padding: 0.75rem 1.5rem;
  min-width: 9.6875rem;
  cursor: pointer;

  text-decoration: none;
  color: var(--black);

  &:hover {
    background: var(--black);
    color: var(--white);
    border-color: var(--white);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--orange);
  }

  @media (min-width: 50rem) {
    font-size: 1.25rem;
  }
`;

const Button = ({ as, onClick, children, ...props }) => {
  return (
    <Element as={as} onClick={onClick} {...props}>
      {children}
    </Element>
  );
};

export default Button;
