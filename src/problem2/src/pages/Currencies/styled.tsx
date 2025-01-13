import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, #0a146e, #fff);
  min-height: 100vh;
  height: 100%;
  width: 100%;
  position: relative;
  color: #fff;
  width: 100%;
  padding-bottom: 100px;
`

export const WrapperTitle = styled.div`
  padding: 40px 0px;
  text-align: center;

  @media (max-width: 768px) {
    .title {
      font-size: 24px;
    }

    .description {
      font-size: 16px;
    }
  }
`

export const WrapperTable = styled.div`
  width: '60%';
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;

  .mobile {
    display: none;
  }

  @media (max-width: 768px) {
    .mobile {
      display: block;
    }

    .desktop {
      display: none !important;
    }
  }
`

export const PriceItem = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  gap: 12px;
`
export const Icon = styled.img`
  height: 32px;
  width: 32px;

  @media (max-width: 768px) {
    height: 24px;
    width: 24px;
  }
`
