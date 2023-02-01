import React from 'react'
import { TwoPaneWrapper, Pane } from '../../common/TwoPaneWrapper'
import { SectionSubtitle } from '../../common/SectionSubtitle'
import {
  MethodDescription,
  TypeDescription
} from 'GendocuPublicApis/sdk/ts/gendocu/sdk_generator/v3/sdk_generator_pb'
import {
  cutOutCommonPackage,
  toHumanReadableName
} from '../../../../common/ServiceOrder'
import { colors, grid } from '../../Constant'
import styled from 'styled-components'
import { TypeTable } from './TypeTable'
import * as jspb from 'google-protobuf'
import { MethodSnippets } from './MethodSnippets'
import { CodeProvider } from '../../../../common/CodeProvider'
import { ProgrammingLanguageType } from '../../../../common/Types'
import {ProgrammingLanguage} from "GendocuPublicApis/sdk/ts/gendocu/common/types_pb";

interface MethodProps {
  method: MethodDescription
  types: jspb.Map<string, TypeDescription>
  availableProgrammingLangs: ProgrammingLanguageType[]
  snippets: { code: string; output: string } | undefined
  codeProvider: CodeProvider
  selectedProgrammingLanguage: ProgrammingLanguageType
  selectProgrammingLanguage: (p: ProgrammingLanguageType) => void
}

export const Method = ({
  snippets,
  method,
  types,
  codeProvider,
  availableProgrammingLangs,
  selectedProgrammingLanguage,
  selectProgrammingLanguage
}: MethodProps) => {
  return (
    <MethodWrapper>
      <SectionSubtitle>
        <span style={{ color: colors.darkGrey }}>rpc</span>{' '}
        {toHumanReadableName(method.getName())}
      </SectionSubtitle>
      <TwoPaneWrapper>
        <Pane>
          <div>{method.getDescription()}</div>
          <MethodTypeName>
            <TypePrefix>
              requests
              {method.getInStreaming() && 'stream of'}
            </TypePrefix>
            &nbsp;
            {cutOutCommonPackage(method.getInTypeId(), method.getMethodId())}
          </MethodTypeName>
          <TypeDescriptionDiv>
            {types.get(method.getInTypeId())?.getDescription()}
          </TypeDescriptionDiv>
          <TypeTable type={types.get(method.getInTypeId())} allTypes={types} />
          <MethodTypeName>
            <TypePrefix>
              returns
              {method.getOutStreaming() && 'stream of'}
            </TypePrefix>
            &nbsp;
            {cutOutCommonPackage(method.getOutTypeId(), method.getMethodId())}
          </MethodTypeName>
          <TypeDescriptionDiv>
            {types.get(method.getOutTypeId())?.getDescription()}
          </TypeDescriptionDiv>
          <TypeTable type={types.get(method.getOutTypeId())} allTypes={types} />
        </Pane>
        <Pane>
          {selectedProgrammingLanguage !== ProgrammingLanguage.PYTHON && (
            <MethodSnippets
              codeProvider={codeProvider}
              availableProgrammingLangs={availableProgrammingLangs}
              snippets={snippets}
              selectedProgrammingLanguage={selectedProgrammingLanguage}
              selectProgrammingLanguage={selectProgrammingLanguage}
            />
          )}
        </Pane>
      </TwoPaneWrapper>
    </MethodWrapper>
  )
}

const TypePrefix = styled.span`
  color: ${colors.darkGrey};
`
const TypeDescriptionDiv = styled.div`
  margin-top: ${grid(1)}px;
  margin-bottom: ${grid(2)}px;
`
const MethodTypeName = styled.h4`
  margin-top: ${grid(4)}px;
  margin-bottom: ${grid(1)}px;
  font-size: 20px;
  font-weight: normal;
`
const MethodWrapper = styled.div`
  margin-top: ${grid(8)}px;
`
