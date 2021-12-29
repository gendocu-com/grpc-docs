import React from 'react'
import styled from 'styled-components'
import { ClientLibraries } from './sections/ClientLibraries/ClientLibraries'
import { APIReference } from './sections/APIReference/APIReference'
import { Build } from 'GendocuPublicApis/sdk/ts/gendocu/sdk_generator/v3/api_description_service_pb'
import { ProgrammingLanguageType } from '../../common/Types'
import { Loading } from '../../common/Loading'
import { CodeProvider } from '../../common/CodeProvider'
import { colors, grid } from './Constant'

interface DefaultStyleProps {
  build: Build
  availableProgrammingLangs: ProgrammingLanguageType[] | null
  selectedProgrammingLang: ProgrammingLanguageType
  setProgrammingLang: (l: ProgrammingLanguageType) => void
  codeProvider: CodeProvider
}

export const DefaultStyle = ({
  build,
  availableProgrammingLangs,
  selectedProgrammingLang,
  setProgrammingLang,
  codeProvider
}: DefaultStyleProps) => {
  if (availableProgrammingLangs === null) {
    return <Loading />
  }
  return (
    <DefaultStyleWrapper>
      {!!availableProgrammingLangs && (
        <ClientLibraries
          protoUrl={build.getGrpcRepoSourceUrl()}
          availableSetupLangs={availableProgrammingLangs}
          selectedProgrammingLang={selectedProgrammingLang}
          setProgrammingLang={setProgrammingLang}
          repositoryUrl={build.getSdkProvisioning()?.getFetchUrl() || ''}
          projectName={build.getApiName()}
        />
      )}
      {/* TODO implement me */}
      {/* <Authentication */}
      {/*  description={build.getData()?.getAuthenticationDescription() || ''} */}
      {/*  authMethods={build.getAuthenticationDescription()?.getMethodsList()} */}
      {/* /> */}
      <APIReference
        data={build.getData()}
        codeProvider={codeProvider}
        sdkProgrammingLangs={availableProgrammingLangs || []}
        selectProgrammingLanguage={setProgrammingLang}
        selectedProgrammingLanguage={selectedProgrammingLang}
      />
      <Footer>
        Generated with{' '}
        <a href='https://github.com/gendocu-com/grpc-docs'>grpc-docs</a>
      </Footer>
    </DefaultStyleWrapper>
  )
}

const DefaultStyleWrapper = styled.div`
  margin: auto;
  @media (max-width: 600px) {
    padding: 0px;
    border-left: 0px;
  }
`

const Footer = styled.div`
  margin: ${grid(3)}px 0px;
  text-align: center;
  color: ${colors.grey};
`
