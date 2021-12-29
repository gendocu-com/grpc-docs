import { ProgrammingLanguageType } from './Types'

export function setPreferredProgrammingLanguage(p: ProgrammingLanguageType) {
  localStorage.setItem('preferred_programming_language', '' + p)
}

export function getPreferredProgrammingLanguage() {
  const x = localStorage.getItem('preferred_programming_language')
  return x === null ? -1 : +x
}
