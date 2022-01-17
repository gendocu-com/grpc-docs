import React, { useEffect, useState } from 'react'
import {
  Build,
  Environment
} from 'GendocuPublicApis/sdk/ts/gendocu/sdk_generator/v3/api_description_service_pb'
import { Loading } from '../../common/Loading'
import {
  APIDescriptionGeneratorModel,
  EnumDescription,
  FieldDescription,
  MethodDescription,
  ServiceDescription,
  TypeDescription
} from 'GendocuPublicApis/sdk/ts/gendocu/sdk_generator/v3/sdk_generator_pb'
import { DefaultStyle } from '../../style/default/DefaultStyle'
import { NoBackendCodeProvider } from '../codeProviders/NoBackendCodeProvider'
import { ProgrammingLanguage } from 'GendocuPublicApis/sdk/ts/gendocu/common/types_pb'
import yaml from 'js-yaml'
import minimatch from 'minimatch'

interface DescriptorSetWidgetProps {
  file: string
  scheme?: string
}

export const PseudomutoProtocGenDoc = ({
  file,
  scheme
}: DescriptorSetWidgetProps) => {
  const [err, setError] = useState('')
  const [apiBuild, setAPIBuild] = useState<Build | undefined>(undefined)
  useEffect(() => {
    const promise = scheme
      ? fetch(scheme)
          .then((res) => res.text())
          .then((res) => yaml.load(res) as APISpec)
      : undefined
    fetch(file)
      .then((res) => res.json())
      .then((res) => {
        const data = new APIDescriptionGeneratorModel()
        data.setDescription(
          'Documentation generated with github.com/gendocu-com/grpc-docs'
        )
        const map = data.getMethodsMap()
        res.files.forEach((el: FileDocDescription) => {
          el.services.forEach((service: ServiceDocDescription) => {
            const srvc = new ServiceDescription()
            srvc.setServiceId('.' + service.fullName)
            srvc.setDescription(service.description)
            srvc.setShortName(service.name)
            srvc.setFullName(service.fullName)
            srvc.setSourceProtoFile(el.name)
            data.getServicesMap().set(service.fullName, srvc)
            service.methods.forEach((method: MethodDocDescription) => {
              const m = new MethodDescription()
              m.setName(method.name)
              m.setDescription(cleanDescription(method.description))
              m.setMethodId(srvc.getServiceId() + '.' + method.name)
              m.setServiceId(srvc.getServiceId())
              m.setInTypeId(getPrimitiveTypename(method.requestFullType))
              m.setInStreaming(method.requestStreaming)
              m.setOutTypeId(getPrimitiveTypename(method.responseFullType))
              m.setOutStreaming(method.responseStreaming)
              m.setSourceProtoFile(el.name)
              map.set(m.getMethodId(), m)
            })
          })
          el.messages.forEach((type: TypeDocDescription) => {
            const typeDescription = new TypeDescription()
            typeDescription.setDescription(cleanDescription(type.description))
            typeDescription.setFullName(type.fullName)
            typeDescription.setShortName(type.name)
            typeDescription.setTypeId(getPrimitiveTypename(type.fullName))
            type.fields.forEach((el) => {
              const f = new FieldDescription()
              f.setTypeId(getPrimitiveTypename(el.fullType))
              f.setName(el.name || el.fullType)
              f.setDescription(cleanDescription(el.description))
              if (el.isoneof) {
                f.setOneOf(el.oneofdecl)
              }
              f.setRepeated(el.label.indexOf('repeated') !== -1)
              f.setOptional(false) // TODO
              f.setRequired(false) // TODO
              typeDescription.addFields(f)
            })
            data.getTypesMap().set(typeDescription.getTypeId(), typeDescription)
          })
          el.enums.forEach((e: EnumDocDescription) => {
            const typeDescription = new TypeDescription()
            typeDescription.setTypeId(e.fullName)
            typeDescription.setFullName(e.fullName)
            typeDescription.setDescription(e.description)
            const enumDescription = new EnumDescription()
            e.values.forEach((x) => {
              enumDescription.getValuesMap().set(x.name, +x.number)
            })
            typeDescription.setEnumDescription(enumDescription)
            data.getTypesMap().set(typeDescription.getTypeId(), typeDescription)
          })
        })
        const build = new Build()
        build.setData(data)
        if (promise) {
          promise
            .then((res?: APISpec) => {
              const env = new Environment()
              env.setId('default')
              build?.getData()
                ?.getServicesMap()
                .forEach((entry) => {
                  const name = entry.getFullName()
                  const d =
                    res?.servers?.find((el) => {
                      return minimatch(name, el.selector)
                    }) || undefined
                  if (d && d.envs && d.envs.length > 0) {
                    const grpc = d.envs[0].urls.find(
                      (el) => el.startsWith('grpc') && !el.startsWith('grpcweb')
                    )
                    if (grpc) {
                      env.getServiceGrpcUrlMap().set(entry.getServiceId(), grpc)
                    }
                    const grpcweb = d.envs[0].urls.find((el) =>
                      el.startsWith('grpcweb')
                    )
                    if (grpcweb) {
                      env
                        .getServiceWebgrpcUrlMap()
                        .set(entry.getServiceId(), grpcweb)
                    }
                  }
                })
              build.setEnvsList([env])
              setAPIBuild(build)
            })
            .catch((err) => {
              setError(err.toString())
            })
        } else {
          setAPIBuild(build)
        }
      })
      .catch((err) => {
        setError(err.toString())
      })
  }, [])
  if (err) {
    return <h1 style={{ color: 'red' }}>Received error: {err}</h1>
  }
  if (!apiBuild) {
    return <Loading />
  }
  return (
    <DefaultStyle
      build={apiBuild}
      availableProgrammingLangs={[ProgrammingLanguage.GRPCURL]}
      selectedProgrammingLang={ProgrammingLanguage.GRPCURL}
      setProgrammingLang={() => {}}
      codeProvider={new NoBackendCodeProvider(apiBuild)}
    />
  )
}
function getPrimitiveTypename(el: string) {
  switch (el) {
    case 'string':
      return 'TYPE_STRING'
    case 'bool':
      return 'TYPE_BOOL'
    case 'sfixed32':
      return 'TYPE_SFIXED32'
    case 'fixed32':
      return 'TYPE_FIXED32'
    case 'sint32':
      return 'TYPE_SINT32'
    case 'int32':
      return 'TYPE_INT32'
    case 'sfixed64':
      return 'TYPE_SFIXED64'
    case 'fixed64':
      return 'TYPE_FIXED64'
    case 'sint64':
      return 'TYPE_SINT64'
    case 'int64':
      return 'TYPE_INT64'
    case 'double':
      return 'TYPE_DOUBLE'
    case 'float':
      return 'TYPE_FLOAT'
    case 'uint32':
      return 'TYPE_UINT32'
    case 'uint64':
      return 'TYPE_UINT64'
    case 'bytes':
      return 'TYPE_BYTES'
    default:
      return '.' + el
  }
}

function cleanDescription(desc: string) {
  return desc
  // return desc.replaceAll(/\[Example[^\]]*]\s*\{[^}]*}/gi, "") // TODO remove the whole valid JSON object
}

interface ServiceDocDescription {
  name: string
  longName: string
  fullName: string
  description: string
  methods: MethodDocDescription[]
}

interface MethodDocDescription {
  name: string
  description: string
  requestFullType: string
  requestStreaming: boolean
  responseFullType: string
  responseStreaming: boolean
}

interface TypeDocDescription {
  name: string
  fullName: string
  description: string
  fields: FieldDocDescription[]
}

interface FieldDocDescription {
  name: string
  description: string
  label: string
  fullType: string
  ismap: boolean
  isoneof: boolean
  oneofdecl: string
  defaultValue: string
}

interface EnumDocDescription {
  name: string
  longName: string
  fullName: string
  description: string
  values: EnumDocValue[]
}

interface EnumDocValue {
  name: string
  number: string
  description: string
}

interface FileDocDescription {
  name: string
  description: string
  enums: EnumDocDescription[]
  messages: TypeDocDescription[]
  services: ServiceDocDescription[]
}

interface APISpec {
  servers: APISpecServer[] | undefined
}
interface APISpecServer {
  envs: APISpecServerEnvironment[] | undefined
  selector: string
}
interface APISpecServerEnvironment {
  name: string
  urls: string[]
}
