import React from 'react'
import { SectionTitle } from '../../common/SectionTitle'
import { TwoPaneWrapper, Pane } from '../../common/TwoPaneWrapper'
import { SectionWrapper } from '../../common/SectionWrapper'
import styled from 'styled-components'
import { SDKSetup } from './SDKSetup/SDKSetup'
import { colors, grid, style } from '../../Constant'
import { ProgrammingLanguageSelector } from './ProgrammingLanguageSelector'
import { ProgrammingLanguageType } from '../../../../common/Types'

interface ClientLibrariesProps {
  protoUrl: string
  repositoryUrl: string
  projectName: string
  availableSetupLangs: ProgrammingLanguageType[]
  selectedProgrammingLang: ProgrammingLanguageType
  setProgrammingLang: (l: ProgrammingLanguageType) => void
}

export const ClientLibraries = (props: ClientLibrariesProps) => {
  return (
    <SectionWrapper>
      <TwoPaneWrapper direction='row'>
        <Pane>
          <SectionTitle>Client Libraries</SectionTitle>
          The API is implemented using gRPC framework. You can generate the SDK
          on your own -{' '}
          <a href='https://grpc.io/docs/languages/'>
            check out the official gRPC documentation.
          </a>
          <br />
          The source protofiles are available{' '}
          <a href={props.protoUrl} rel='noopener noreferrer' target='_blank'>
            here.
          </a>
        </Pane>
        <Pane>
          <ClientLibrariesSelector {...props} />
        </Pane>
      </TwoPaneWrapper>
    </SectionWrapper>
  )
}

const ClientLibrariesSelector = (
  props: Omit<ClientLibrariesProps, 'protoUrl'>
) => {
  return (
    <ClientLibrariesWrapper>
      <ClientLibrariesSelectorTitleWrapper>
        <ClientLibrariesSelectorTitle>
          Client Libraries
        </ClientLibrariesSelectorTitle>
        <ProgrammingLanguageSelector
          availableProgrammingLangs={props.availableSetupLangs}
          selectedProgrammingLang={props.selectedProgrammingLang}
          setProgrammingLang={props.setProgrammingLang}
        />
      </ClientLibrariesSelectorTitleWrapper>
      <SDKSetupWrapper>
        <SDKSetup
          repositoryUrl={props.repositoryUrl}
          lang={props.selectedProgrammingLang}
          projectName={props.projectName}
        />
      </SDKSetupWrapper>
    </ClientLibrariesWrapper>
  )
}

const ClientLibrariesWrapper = styled.div`
  flex: 1;
  min-width: 250px;
  border-radius: 8px;
  border: 1px solid ${colors.lightGrey};
  padding: 0px 0px;
  max-width: 600px;
  width: 100%;
`

const ClientLibrariesSelectorTitle = styled.div`
  text-transform: uppercase;
  margin-bottom: ${grid(1)}px;
`
const ClientLibrariesSelectorTitleWrapper = styled.div`
  padding: 0px ${grid(2)}px;
  padding-top: ${grid(1)}px;
`

const SDKSetupWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.veryLightGrey};
  padding: ${grid(1)}px ${grid(1)}px;
  box-sizing: border-box;
  background-color: ${colors.veryVeryLightGrey};
  border-bottom-left-radius: ${style.radius}px;
  border-bottom-right-radius: ${style.radius}px;
  line-height: 1.2;
`
