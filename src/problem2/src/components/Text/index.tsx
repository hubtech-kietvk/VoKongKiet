import styled, { css } from 'styled-components'

interface TextProps {
  color?: string
  lineHeight?: string
  lineNumber?: number
  size?: string
  weight?: string
  textTransform?: string
  styles?: any
}

export const Text = styled.span<TextProps>`
  word-break: break-word;
  color: ${(p) => p.color};
  line-height: ${(p) => p.lineHeight};
  font-size: ${(p) => p.size || '14px'};
  font-weight: ${(p) => p.weight};
  ${(p) =>
    p.textTransform &&
    css`
      text-transform: ${p.textTransform};
    `};
  ${(p) => p.styles}

  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${(props) => props.lineNumber};
  -webkit-box-orient: vertical;
  display: -webkit-box;
`
