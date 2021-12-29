import {RequestCode} from './RequestCode'
import {MethodOutput} from './MethodOutput'
import React, {Fragment} from 'react'
import styled from 'styled-components'
import {colors, grid} from '../../Constant'
import {ProgrammingLanguageType} from '../../../../common/Types'
import {CodeProvider} from '../../../../common/CodeProvider'

interface MethodSnippetsProps {
  availableProgrammingLangs: ProgrammingLanguageType[]
  codeProvider: CodeProvider
  snippets: { code: string; output: string } | undefined
  selectedProgrammingLanguage: ProgrammingLanguageType
  selectProgrammingLanguage: (p: ProgrammingLanguageType) => void
}

export const MethodSnippets = ({
                                 snippets,
                                 availableProgrammingLangs,
                                 codeProvider,
                                 selectedProgrammingLanguage,
                                 selectProgrammingLanguage
                               }: MethodSnippetsProps) => {
  return (
    <Fragment>
      <RequestCode
        sdkAvailableLanguages={availableProgrammingLangs}
        fullCodeAvailable={false}
        snippetCode={snippets?.code || ''}
        codeProvider={codeProvider}
        selectedProgrammingLanguage={selectedProgrammingLanguage}
        selectProgrammingLanguage={selectProgrammingLanguage}
      />
      {snippets?.output && <Fragment>
        <OutputSeparator>Example output (decoded)</OutputSeparator>
        <MethodOutput output={snippets?.output || ''} language='json'/>
      </Fragment>}
    </Fragment>
  )
}

const OutputSeparator = styled.div`
  padding: ${grid(2)}px ${grid(1)}px;
  border-left: 1px solid ${colors.lightGrey};
  border-right: 1px solid ${colors.lightGrey};
`
