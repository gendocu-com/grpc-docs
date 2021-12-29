import React, { useEffect, useState, Fragment } from 'react'

import { SectionWrapper } from '../../common/SectionWrapper'
import { Service } from './Service'
import { Method } from './Method'
import {
  APIDescriptionGeneratorModel,
  MethodDescription,
  ServiceDescription
} from 'GendocuPublicApis/sdk/ts/gendocu/sdk_generator/v3/sdk_generator_pb'
import { ServiceDescriptionsInOrder } from '../../../../common/ServiceOrder'
import { Loading } from '../../../../common/Loading'
import { CodeProvider } from '../../../../common/CodeProvider'
import { ProgrammingLanguageType } from '../../../../common/Types'

interface APIReferenceProps {
  data: APIDescriptionGeneratorModel | undefined
  sdkProgrammingLangs: ProgrammingLanguageType[]
  codeProvider: CodeProvider
  selectedProgrammingLanguage: ProgrammingLanguageType
  selectProgrammingLanguage: (p: ProgrammingLanguageType) => void
}

export const APIReference = ({
  data,
  codeProvider,
  sdkProgrammingLangs,
  selectedProgrammingLanguage,
  selectProgrammingLanguage
}: APIReferenceProps) => {
  const [services, setService] = useState<ServiceDescription[]>([])
  const [snippets, setSnippets] = useState(
    new Map<string, { code: string; output: string }>()
  )
  const [sid2method, setSid2method] = useState(
    new Map<string, MethodDescription[]>()
  )
  useEffect(() => {
    if (!data) {
      return
    }
    setService(ServiceDescriptionsInOrder(data.getServicesMap()))
    const mm = new Map<string, MethodDescription[]>()
    data.getMethodsMap().forEach((value: MethodDescription) => {
      const x = mm.get(value.getServiceId())
      if (x === undefined) {
        mm.set(value.getServiceId(), [value])
      } else {
        x.push(value)
      }
    })
    setSid2method(mm)
  }, [data])
  useEffect(() => {
    const m = new Map<string, { code: string; output: string }>()
    const resp = codeProvider.getAllSnippets(selectedProgrammingLanguage)
    resp.then((el) => {
      el.forEach((el) => {
        m.set(el.methodId, { code: el.snippetCode, output: el.output })
      })
      setSnippets(m)
    })
  }, [selectedProgrammingLanguage])
  if (!data) {
    return <Loading />
  }
  return (
    <SectionWrapper>
      {services.map((value: ServiceDescription, key: number) => (
        <div key={key}>
          <Service service={value} />
          {sid2method.get(value.getServiceId())?.map((method, key) => {
            const codeSnippet = snippets.get(method.getMethodId())
            return (
              <Fragment key={key}>
                <Method
                  method={method}
                  availableProgrammingLangs={sdkProgrammingLangs}
                  types={data.getTypesMap()}
                  codeProvider={codeProvider}
                  snippets={codeSnippet}
                  selectedProgrammingLanguage={selectedProgrammingLanguage}
                  selectProgrammingLanguage={selectProgrammingLanguage}
                />
              </Fragment>
            )
          })}
        </div>
      ))}
    </SectionWrapper>
  )
}
