import React from 'react'
import * as S from './styled'
import { Text } from '../Text'

export const Footer: React.FC = () => {
  return (
    <S.FooterContainer>
      <S.WaveBorder>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100' preserveAspectRatio='none'>
          <path fill='#fff' d='M0,96 C288,48 576,48 864,80 C1152,112 1440,64 1440,64 L1440,0 L0,0 Z' />
        </svg>
      </S.WaveBorder>
      <S.FooterContent>
        <h2>Contact Us</h2>
        <Text>Email: vokongkiet@gmail.com.com</Text>
        <Text>Phone: 0386406764</Text>
        <S.FooterLinks>
          <a href='/privacy-policy'>Privacy Policy</a>
          <a href='/terms-of-service'>Terms of Service</a>
        </S.FooterLinks>
        <S.FooterCopyright>&copy; {new Date().getFullYear()} KietVo Company. All Rights Reserved.</S.FooterCopyright>
      </S.FooterContent>
    </S.FooterContainer>
  )
}
