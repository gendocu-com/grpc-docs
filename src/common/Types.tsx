import * as gendocu_common_types_pb from 'GendocuPublicApis/sdk/ts/gendocu/common/types_pb'
import { ProgrammingLanguage } from 'GendocuPublicApis/sdk/ts/gendocu/common/types_pb'

export type ProgrammingLanguageType =
  gendocu_common_types_pb.ProgrammingLanguageMap[keyof gendocu_common_types_pb.ProgrammingLanguageMap]

// Those names must be compatible with the syntax highlighter
export function programmingLangToString(lang: ProgrammingLanguageType) {
  switch (lang) {
    case ProgrammingLanguage.GO:
      return 'go'
    case ProgrammingLanguage.TYPESCRIPT:
      return 'typescript'
    case ProgrammingLanguage.PYTHON:
      return 'python'
    case ProgrammingLanguage.JAVASCRIPT:
      return 'javascript'
    case ProgrammingLanguage.REST_CURL:
      return 'bash'
    case ProgrammingLanguage.GRPCURL:
      return 'bash'
    case ProgrammingLanguage.JAVA:
      return 'java'
    case ProgrammingLanguage.RUST:
      return 'rust'
    case ProgrammingLanguage.CSHARP:
      return 'csharp'
    default:
      return 'unknown'
  }
}

export function programmingLangToName(lang: ProgrammingLanguageType) {
  switch (lang) {
    case ProgrammingLanguage.GO:
      return 'Golang'
    case ProgrammingLanguage.TYPESCRIPT:
      return 'Typescript'
    case ProgrammingLanguage.KOTLIN:
      return "Kotlin"
    case ProgrammingLanguage.PYTHON:
      return 'Python 3'
    case ProgrammingLanguage.JAVASCRIPT:
      return 'Javascript'
    case ProgrammingLanguage.REST_CURL:
      return 'CURL (REST)'
    case ProgrammingLanguage.GRPCURL:
      return 'gRPCURL'
    case ProgrammingLanguage.JAVA:
      return 'Java'
    case ProgrammingLanguage.RUST:
      return 'Rust'
    case ProgrammingLanguage.CSHARP:
      return 'C#'
    default:
      return 'unknown'
  }
}
