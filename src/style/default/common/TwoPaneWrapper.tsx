import styled from 'styled-components'
import { style } from '../Constant'

export const TwoPaneWrapper = styled.div<{ direction?: 'column' | 'row' }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.direction ? props.direction : 'column')};
  width: 100%;
  gap: ${style.section.gap}px;
`
export const Pane = styled.div`
  display: block;
  flex-grow: 1;
  max-width: 100%;
`
