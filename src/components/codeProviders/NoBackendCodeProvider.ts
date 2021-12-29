import { ProgrammingLanguageType } from '../../common/Types'
import { Build } from 'GendocuPublicApis/sdk/ts/gendocu/sdk_generator/v3/api_description_service_pb'
import { ProgrammingLanguage } from 'GendocuPublicApis/sdk/ts/gendocu/common/types_pb'

export class NoBackendCodeProvider {
  build: Build

  constructor(build: Build) {
    this.build = build
  }

  getAvailableProgrammingLanguages(): ProgrammingLanguageType[] {
    return [ProgrammingLanguage.GRPCURL]
  }

  getAllSnippets(
    lang: ProgrammingLanguageType
  ): Promise<{ methodId: string; snippetCode: string; output: string }[]> {
    if (lang !== ProgrammingLanguage.GRPCURL) {
      console.error()
      return Promise.reject('selected unsupported programming language')
    }
    const env = this.build.getEnvsList()[0]
    return new Promise<
      { methodId: string; snippetCode: string; output: string }[]
    >((resolve) => {
      const l: { methodId: string; snippetCode: string; output: string }[] = []
      this.build
        .getData()
        ?.getMethodsMap()
        .forEach((el, key) => {
          l.push({
            methodId: key,
            snippetCode:
              "grpcurl -d '{}' " +
              convertUrlToGRPCurl(
                env.getServiceGrpcUrlMap().get(el.getServiceId())
              ) +
              ' ' +
              el.getServiceId().substr(1) +
              '/' +
              el.getName(),
            output: ''
          })
        })
      resolve(l)
    })
  }

  getCode(
    lang: ProgrammingLanguageType,
    mode: 'snippet' | 'full'
  ): { code: string; output: string; hasFullCode: boolean } {
    return { code: 'x' + lang + mode, output: 'y', hasFullCode: false }
  }
}

function convertUrlToGRPCurl(url?: string) {
  if(!url) {
    return '<unkown-url>'
  }
  if(url.startsWith("grpcs:")) {
    return url.replaceAll('grpcs://', '')
  } else if(url.startsWith('grpc:')) {
    return '-plaintext ' + url.replaceAll('grpc://', '')
  } else {
    return '<invalid-url-scheme:' + url + '>'
  }
}
