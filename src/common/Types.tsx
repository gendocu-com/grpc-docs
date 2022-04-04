import * as gendocu_common_types_pb from 'GendocuPublicApis/sdk/ts/gendocu/common/types_pb'
import { ProgrammingLanguage } from 'GendocuPublicApis/sdk/ts/gendocu/common/types_pb'
import golang_logo from '../assets/images/langs/go-logo.svg'
import typescript_logo from '../assets/images/langs/typescript.svg'
import python_logo from '../assets/images/langs/python-logo.svg'
import curl_logo from '../assets/images/langs/curl-logo.svg'
import js_logo from '../assets/images/langs/js-logo.svg'
import java_logo from '../assets/images/langs/java.svg'
import csharp_logo from '../assets/images/langs/csharp.svg'

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
    case ProgrammingLanguage.CSHARP:
      return 'C#'
    default:
      return 'unknown'
  }
}

export function programmingLanguageToIcon(lang: ProgrammingLanguageType) {
  switch (lang) {
    case ProgrammingLanguage.GO:
      return golang_logo
    case ProgrammingLanguage.TYPESCRIPT:
      return typescript_logo
    case ProgrammingLanguage.PYTHON:
      return python_logo
    case ProgrammingLanguage.JAVASCRIPT:
      return js_logo
    case ProgrammingLanguage.REST_CURL:
      return curl_logo
    case ProgrammingLanguage.GRPCURL:
      return curl_logo
    case ProgrammingLanguage.JAVA:
      return java_logo
    case ProgrammingLanguage.CSHARP:
      return csharp_logo
    default:
      return typescript_logo
  }
}
