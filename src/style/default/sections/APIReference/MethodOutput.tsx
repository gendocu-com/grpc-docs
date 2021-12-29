import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { style } from '../../Constant'
import atomOneDarkReasonable from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark'
import { Loading } from '../../../../common/Loading'

interface MethodOutputProps {
  output: string
  language: string
}
export const MethodOutput = ({ output, language }: MethodOutputProps) => {
  return <StyledHighlighter code={output} programmingLanguage={language} />
}

const StyledHighlighter = (props: {
  code: string
  programmingLanguage: string
}) =>
  props.code === '' ? (
    <Loading />
  ) : (
    <SyntaxHighlighter
      style={atomOneDarkReasonable}
      customStyle={{
        padding: '16px 8px',
        margin: '0px',
        lineHeight: '1.2',
        boxSizing: 'border-box',
        borderBottomLeftRadius: style.radius,
        borderBottomRightRadius: style.radius
      }}
      // lineNumberStyle={(line: number) => {
      // return !!props.highlightMap.get(line) ? lineNumberStyle() : {}
      // }}
      lineProps={() => {
        return {
          style: {
            boxSizing: 'border-box',
            display: 'block',
            wordBreak: 'break-all',
            whiteSpace: 'pre-wrap'
          }
        }
      }}
      showLineNumbers
      language={props.programmingLanguage}
    >
      {props.code}
    </SyntaxHighlighter>
  )
