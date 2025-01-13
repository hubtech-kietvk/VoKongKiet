import { Button, InputNumber, Select, Tag } from 'antd'
import styled, { keyframes } from 'styled-components'

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
`

export const FormContainer = styled.div`
  background-color: #fff;
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  height: fit-content;
  width: 80%;
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

export const WrapperIcons = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border-radius: 12px;
  height: 48px;
  background-color: rgba(10, 20, 110, 0.2);
  overflow: hidden;
  position: relative;
  margin-bottom: 18px;
`

export const moveIcons = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`

export const AnimationWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  animation: ${moveIcons} 50s linear infinite;

  @media (max-width: 768px) {
    gap: 12px;
    animation: ${moveIcons} 20s linear infinite;
  }
`

export const Icon = styled.img`
  height: 32px;
  width: 32px;

  @media (max-width: 768px) {
    height: 24px;
    width: 24px;
  }
`

export const WrapperForm = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: start;

  .mobile {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6px;

    .desktop {
      display: none !important;
    }

    .mobile {
      display: block;
    }
  }
`

export const WrapperFormItem = styled.div`
  position: relative;
  width: 33%;
  .input {
    height: 68px;
  }

  input {
    height: 68px !important;
  }

  @media (max-width: 768px) {
    width: 100%;

    .picks {
      display: none;
    }

    .input {
      height: 52px;
    }

    input {
      height: 52px !important;
    }

    .ant-form-item {
      margin-bottom: 0px;

      label {
        display: none;
      }
    }
  }
`

export const CInputNumber = styled(InputNumber)`
  width: 100%;

  .ant-input-prefix {
    margin: 0px 12px;
  }
`

export const CSelect = styled(Select)<{ mr?: string }>`
  .ant-select-selector {
    padding: 0 22px !important;
  }

  .ant-select-arrow {
    margin-right: 18px;
  }

  @media (max-width: 768px) {
    .ant-select-selector {
      padding: 0;
    }

    .ant-select-arrow {
      margin-right: 0px;
    }
  }
`

export const SwapButton = styled(Button)`
  position: absolute;
  top: 46px;
  left: -22px;

  @media (max-width: 768px) {
    top: -16px;
    left: calc(50% - 20px);

    transform: rotate(90deg);
    transform-origin: center;
  }
`

export const CTag = styled(Tag)`
  cursor: pointer;

  &:hover {
    color: #1677ff;
    border-color: #1677ff;
  }
`

export const PriceItem = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  gap: 12px;
`
