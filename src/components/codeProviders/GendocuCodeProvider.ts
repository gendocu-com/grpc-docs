import { ProgrammingLanguageType } from '../../common/Types'
import { SdkGeneratorClient } from 'gendocu-public-apis/sdk/ts/gendocu/sdk_generator/v3/api_description_service_pb_service'
import {
  GenDocuBackendSdkBackend,
  getMetadata,
  LanguageNotSupported
} from '../../common/GenDocuBackendUtils'
import { GenerateInputCodeSnippetsRequest } from 'gendocu-public-apis/sdk/ts/gendocu/sdk_generator/v3/api_description_service_pb'
import { ProgrammingLanguage } from 'gendocu-public-apis/sdk/ts/gendocu/common/types_pb'

export class GendocuCodeProvider {
  buildId: string
  sdkGeneratorClient: SdkGeneratorClient

  constructor(buildId: string) {
    this.buildId = buildId
    this.sdkGeneratorClient = new SdkGeneratorClient(GenDocuBackendSdkBackend)
  }

  getAvailableProgrammingLanguages(
    langs: ProgrammingLanguageType[]
  ): ProgrammingLanguageType[] {
    return langs.filter((el) => el !== ProgrammingLanguage.PYTHON)
  }

  getAllSnippets(
    lang: ProgrammingLanguageType,
    sessionId?: string,
  ): Promise<{ methodId: string; snippetCode: string; output: string }[]> {
    return new Promise<
      { methodId: string; snippetCode: string; output: string }[]
    >((resolve) => {
      const req = new GenerateInputCodeSnippetsRequest()
      req.setBuildId(this.buildId)
      req.setProgrammingLang(lang)
      this.sdkGeneratorClient.generateInputCodeSnippets(
        req,
        getMetadata(sessionId),
        (err, resp) => {
          if (!!err || resp === null) {
            if (!!err && LanguageNotSupported(err)) {
              return resolve([])
            }
            console.error(
              'received error:' + (err?.message || 'received empty response')
            )
          } else {
            if (resp.getProgrammingLang() !== lang) {
              return resolve([])
            }
            const snippets: Map<string, string> = new Map<string, string>()
            resp
              .getMethodIdToCodeSnippetMap()
              .forEach((el: string, key: string) => {
                snippets.set(key, el)
              })
            const outputs: Map<string, string> = new Map<string, string>()
            resp
              .getMethodIdToCodeOutputMap()
              .forEach((el: string, key: string) => {
                outputs.set(key, el)
              })
            const res: {
              methodId: string
              snippetCode: string
              output: string
            }[] = []
            snippets.forEach((el, key) => {
              res.push({
                methodId: key,
                snippetCode: el,
                output: outputs.get(key) || ''
              })
            })
            resolve(res)
          }
        }
      )
    })
  }

  getCode(
    lang: ProgrammingLanguageType,
    mode: 'snippet' | 'full'
  ): { code: string; output: string; hasFullCode: boolean } {
    return { code: 'x' + lang + mode, output: 'y', hasFullCode: false }
  }
}
