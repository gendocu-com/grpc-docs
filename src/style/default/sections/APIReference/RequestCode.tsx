import React, { Fragment } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import styled from 'styled-components'
import { colors, style } from '../../Constant'
import {
  programmingLangToName,
  programmingLangToString,
  ProgrammingLanguageType
} from '../../../../common/Types'
import { CopyButton } from '../../common/CopyButton'
import { Loading } from '../../../../common/Loading'
import { CodeProvider } from '../../../../common/CodeProvider'

interface RequestCodeProps {
  sdkAvailableLanguages: ProgrammingLanguageType[]
  codeProvider: CodeProvider
  snippetCode: string
  fullCodeAvailable: boolean
  selectedProgrammingLanguage: ProgrammingLanguageType
  selectProgrammingLanguage: (p: ProgrammingLanguageType) => void
}

export const RequestCode = ({
  sdkAvailableLanguages,
  codeProvider,
  snippetCode,
  selectedProgrammingLanguage,
  selectProgrammingLanguage
}: RequestCodeProps) => {
  return (
    <Fragment>
      <CodeSnippetTitle>
        <CustomSelect
          onSelect={(x) => {
            selectProgrammingLanguage(+x as ProgrammingLanguageType)
          }}
          value={'' + selectedProgrammingLanguage}
        >
          {codeProvider
            .getAvailableProgrammingLanguages(sdkAvailableLanguages)
            .map((el, key) => (
              <CustomOption key={key} value={el}>
                {programmingLangToName(el)}
              </CustomOption>
            ))}
        </CustomSelect>
        <div
          style={{
            borderLeft: '2px solid ' + colors.lightGrey,
            height: '70%',
            opacity: '0.3',
            margin: '0px 8px'
          }}
        />
        <CopyButton text={snippetCode} />
      </CodeSnippetTitle>
      <StyledHighlighter
        code={snippetCode}
        programmingLanguage={selectedProgrammingLanguage}
        highlightMap={new Map<number, number>()}
      />
    </Fragment>
  )
}

const StyledHighlighter = (props: {
  code: string
  programmingLanguage: ProgrammingLanguageType
  highlightMap: Map<number, number>
}) =>
  props.code === '' ? (
    <div
      style={{
        height: '200px',
        border: '1px solid ' + colors.lightGrey,
        borderTop: '0px'
      }}
    >
      <Loading />
    </div>
  ) : (
    <SyntaxHighlighter
      style={style.codeStyle}
      customStyle={{
        padding: '16px 8px',
        margin: '0px',
        lineHeight: '1.2',
        boxSizing: 'border-box'
      }}
      lineProps={(line: number | any) => {
        return {
          style: {
            backgroundColor: props.highlightMap.has(line)
              ? colors.codeHighlight
              : 'transparent',
            boxSizing: 'border-box',
            display: 'block',
            wordBreak: 'break-all',
            whiteSpace: 'pre-wrap'
          }
        }
      }}
      showLineNumbers
      language={programmingLangToString(props.programmingLanguage)}
    >
      {props.code}
    </SyntaxHighlighter>
  )

export const CustomSelect = (props: {
  children: React.ReactNode
  onSelect: (e: string) => void
  value: string
}) => {
  return (
    <CustomSelectWrapper>
      <CustomSelectStyle
        onChange={(e) => props.onSelect(e.target.value)}
        value={props.value}
      >
        {props.children}
      </CustomSelectStyle>
    </CustomSelectWrapper>
  )
}

const CodeSnippetTitle = styled.div`
  border: 1px solid ${colors.lightGrey};
  display: flex;
  color: black;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: ${style.radius}px;
  border-top-right-radius: ${style.radius}px;
  padding: 0px;
`

const CustomSelectWrapper = styled.label`
  cursor: pointer;
  text-align: right;
`

const CustomSelectStyle = styled.select`
  text-indent: 1px;
  text-overflow: '';
  border: 0;
  background-color: transparent;
  color: inherit;
  padding: 16px 4px;
  text-align: right;
`

export const CustomOption = styled.option`
  text-align: right;
  padding: 4px;
  background-color: white;
`
