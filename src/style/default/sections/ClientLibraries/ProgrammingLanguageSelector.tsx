import React from 'react'
import styled from 'styled-components'
import { colors, grid } from '../../Constant'
import {
  programmingLangToName,
  ProgrammingLanguageType
} from '../../../../common/Types'

interface ProgrammingLanguageSelectorProps {
  availableProgrammingLangs: ProgrammingLanguageType[]
  selectedProgrammingLang: ProgrammingLanguageType
  setProgrammingLang: (lang: ProgrammingLanguageType) => void
}

export const ProgrammingLanguageSelector = ({
  availableProgrammingLangs,
  selectedProgrammingLang,
  setProgrammingLang
}: ProgrammingLanguageSelectorProps) => {
  const langs = [...availableProgrammingLangs]
  return (
    <ProgrammingLanguageContainer>
      {langs.map((el, key) => (
        <ProgrammingLanguageSelectorDiv
          key={key}
          onClick={() => setProgrammingLang(el)}
          selected={selectedProgrammingLang === el}
        >
          {/* <ProgrammingLanguageIcon */}
          {/*  alt={programmingLangToName(el)} */}
          {/*  src={programmingLanguageToIcon(el)} */}
          {/* /> */}
          <p>{programmingLangToName(el)}</p>
        </ProgrammingLanguageSelectorDiv>
      ))}
    </ProgrammingLanguageContainer>
  )
}
const ProgrammingLanguageContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
`
// const ProgrammingLanguageIcon = styled.img`
//   width: 48px;
//   height: 30px;
//   object-fit: contain;
// `
const ProgrammingLanguageSelectorDiv = styled.div<{ selected: boolean }>`
  text-align: center;
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
  cursor: pointer;
  padding: ${grid(1)}px ${grid(1)}px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 2px solid
    ${(props) => (props.selected ? colors.blue : colors.white)};
`
