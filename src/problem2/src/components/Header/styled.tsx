import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #0a146e;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
`

interface NavLinkProps {
  isSelected: boolean
}

export const NavLink = styled(Link)<NavLinkProps>`
  margin: 0 8px;
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  padding: 5px 10px;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    border-color: #fff;
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    color: #fff;
    font-weight: bold;
    border-color: #fff;
  `}
`
