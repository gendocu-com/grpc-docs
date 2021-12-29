import styled from 'styled-components'
import React, { Fragment } from 'react'
import { CopyButton } from '../../../common/CopyButton'
import { colors, grid } from '../../../Constant'

export const SetupTitle = styled.div`
  color: ${colors.darkGrey};
  font-weight: bold;
  margin: ${grid(1)}px 0px;
`
export const SetupSubtitle = styled.div`
  color: ${colors.darkGrey};
  font-weight: bold;
  margin: ${grid(1)}px 0px;
`
export const BashLine = (props: { children: string }) => {
  return (
    <BashLineWrapper>
      <BashLineDollar>$</BashLineDollar>&nbsp;
      <BashCodeSection>{props.children}</BashCodeSection>
      <CopyButton text={props.children} />
    </BashLineWrapper>
  )
}

export const Troubleshooting = (props: { url: string }) => {
  return (
    <TroubleshootingLink>
      <a href={props.url} target='_blank' rel='noreferrer'>
        Troubleshooting
      </a>
    </TroubleshootingLink>
  )
}
export const FileContent = (props: { children: string; fileName: string }) => {
  return (
    <Fragment>
      <FileContentTitle>
        <FileName>{props.fileName}</FileName>
        <CopyButton text={props.children} />
      </FileContentTitle>
      <FileContentWrapper>{props.children}</FileContentWrapper>
    </Fragment>
  )
}
const TroubleshootingLink = styled.div`
  margin: ${grid(1)}px;
  margin-top: ${grid(2)}px;
  display: block;
`

const BashLineDollar = styled.ins`
  color: ${colors.darkGrey};
  text-decoration: none;
`
const BashCodeSection = styled.pre`
  overflow-x: auto;
  margin: 0;
  color: inherit;
  flex: 1;
`
const BashLineWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`
const FileContentTitle = styled.div`
  border-bottom: 0px;
  display: flex;
  margin-top: ${grid(2)}px;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${colors.grey};
  box-sizing: border-box;
`
const FileContentWrapper = styled.pre`
  overflow-x: auto;
  width: 100%;
  border: 1px solid ${colors.grey};
  border-top: 0px;
  margin: 0px;
  padding: ${grid(1)}px ${grid(2)}px;
  box-sizing: border-box;
`

const FileName = styled.div`
  padding: ${grid(1)}px ${grid(2)}px;
  padding-top: ${grid(1.5)}px;
`
