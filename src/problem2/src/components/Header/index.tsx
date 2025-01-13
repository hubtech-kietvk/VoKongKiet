import React from 'react'
import { useLocation } from 'react-router-dom'
import * as S from './styled'

export const Header: React.FC = () => {
  const location = useLocation()

  return (
    <S.HeaderContainer>
      <S.Nav>
        <S.NavLink to='/' isSelected={location.pathname === '/'}>
          Home
        </S.NavLink>
        <S.NavLink to='/currencies' isSelected={location.pathname === '/currencies'}>
          Currencies
        </S.NavLink>
      </S.Nav>
    </S.HeaderContainer>
  )
}
