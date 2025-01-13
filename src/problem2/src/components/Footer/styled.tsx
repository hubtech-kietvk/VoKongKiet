import styled from 'styled-components'

export const FooterContainer = styled.footer`
  background-color: #0a146e;
  margin-top: 50px;
  color: #fff;
  text-align: center;
  padding: 40px 0px;
  position: relative;
`

export const WaveBorder = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  background-color: #0a146e;

  svg {
    display: block;
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
    height: auto;
  }
`

export const FooterContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
`

export const FooterLinks = styled.div`
  margin: 20px 0;
  a {
    color: #fff;
    text-decoration: none;
    margin: 0 15px;
    transition: color 0.3s ease;

    &:hover {
      color: #d1eaff;
    }
  }
`

export const FooterCopyright = styled.p`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #d1eaff;
`
