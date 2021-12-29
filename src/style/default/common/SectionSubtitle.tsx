import styled from 'styled-components'
import { style } from '../Constant'

export const SectionSubtitle = styled.h3`
  font-size: ${style.section.title.fontSize}px;
  margin-top: ${style.section.title.margin.top}px;
  margin-bottom: ${style.section.title.margin.bottom}px;
  padding: ${style.section.title.padding.vertical}px
    ${style.section.title.padding.horizontal}px;
  overflow-wrap: break-word;
  hyphens: auto;
  font-weight: normal;
`
