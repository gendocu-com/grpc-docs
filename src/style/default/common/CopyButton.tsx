import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import styled from 'styled-components'
import { colors, grid } from '../Constant'

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)
  const copyEffect = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <CopyToClipboard text={text} onCopy={copyEffect}>
      <div style={{ position: 'relative' }}>
        <CopyButtonBefore>
          {/* <Icon icon="duplicate"/> */}
          Copy
        </CopyButtonBefore>
        <TickEffect visible={copied}>Copied!</TickEffect>
      </div>
    </CopyToClipboard>
  )
}
const CopyButtonBefore = styled.div`
  cursor: pointer;
  padding: ${grid(2)}px ${grid(2)}px;
  background: transparent;
  color: black;
  text-align: center;
  align-items: center;
  display: flex;
  gap: ${grid(1)}px;
  &:hover {
    background: ${colors.veryLightGrey};
  }
`

const TickEffect = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  position: absolute;
  padding: ${grid(1)}px ${grid(2)}px;
  box-sizing: border-box;
  background: ${colors.green};
  color: white;
  pointer-events: none;
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: opacity 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`
