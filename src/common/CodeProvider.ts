import {ProgrammingLanguageType} from "./Types";

export interface CodeProvider {
  getAvailableProgrammingLanguages: (langs: ProgrammingLanguageType[]) => ProgrammingLanguageType[]
  getAllSnippets: (lang:ProgrammingLanguageType, sessionId:string) => Promise<{methodId: string, snippetCode: string, output: string}[]>
  getCode: (lang:ProgrammingLanguageType, mode: "snippet"|"full") => {code: string, output: string, hasFullCode: boolean}
}
