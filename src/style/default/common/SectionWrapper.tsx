import styled from 'styled-components'
import { style } from '../Constant'

export const SectionWrapper = styled.div`
  margin: auto;
  max-width: ${style.section.maxWidth}px;
  padding: ${style.section.padding.horizontal}px;
  padding-top: ${style.section.padding.top}px;
  padding-bottom: ${style.section.padding.bottom}px;
  @media (max-width: 600px) {
    padding: ${style.section.padding.mobile.vertical}px
      ${style.section.padding.mobile.horizontal}px;
  }
`
