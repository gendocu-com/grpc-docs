import React, { useEffect, useState } from 'react'
import { DefaultStyle } from '../../style/default/DefaultStyle'
import { SdkGeneratorClient } from 'GendocuPublicApis/sdk/ts/gendocu/sdk_generator/v3/api_description_service_pb_service'
import {
  Build,
  BuildSelectorRequest,
  BuildWithOrgAndName
} from 'GendocuPublicApis/sdk/ts/gendocu/sdk_generator/v3/api_description_service_pb'
import { Loading } from '../../common/Loading'
import { ErrorMessage } from '../../common/ErrorMessage'
import { ProgrammingLanguageType } from '../../common/Types'
import {
  getPreferredProgrammingLanguage,
  setPreferredProgrammingLanguage
} from '../../common/StorageUtils'
import { GendocuCodeProvider } from '../codeProviders/GendocuCodeProvider'
import {
  GenDocuBackendSdkBackend,
  getMetadata
} from '../../common/GenDocuBackendUtils'

interface GenDocuWidgetProps {
  project: string
  organization: string
}

export const GenDocuWidget = (props: GenDocuWidgetProps) => {
  const [build, setBuild] = useState<Build | undefined>(undefined)
  const [err, setError] = useState('')
  const [programmingLanguage, setProgrammingLanguageRaw] =
    useState<ProgrammingLanguageType>(
      getPreferredProgrammingLanguage() as ProgrammingLanguageType
    )
  const [availableProgrammingLangs, setAvailableProgrammingLangs] = useState<
    ProgrammingLanguageType[] | null
  >([])
  const setProgrammingLanguage = (p: ProgrammingLanguageType) => {
    setPreferredProgrammingLanguage(p)
    setProgrammingLanguageRaw(p)
  }
  var sdkGenerator0 = new SdkGeneratorClient(GenDocuBackendSdkBackend)
  useEffect(() => {
    const buildwithorgandname = new BuildWithOrgAndName()
    buildwithorgandname.setApiName(props.project)
    buildwithorgandname.setOrganization(props.organization)

    const buildselectorrequest = new BuildSelectorRequest()
    buildselectorrequest.setOrgAndName(buildwithorgandname)

    sdkGenerator0.getBuild(
      buildselectorrequest,
      getMetadata(),
      (err, value: Build | null) => {
        if (!!err || !value) {
          setError(err ? err.message : 'received empty value')
          console.error(
            'received error: ',
            err ? err.message : 'received empty value'
          )
        } else {
          setBuild(value)
          const prov = value.getSdkProvisioning()
          if (prov !== undefined) {
            const langs: ProgrammingLanguageType[] = []
            prov.getProvisioningDataMap().forEach((el, key) => {
              if (el.getError() === '') {
                langs.push(key as ProgrammingLanguageType)
              }
            })
            if (langs.length > 0) {
              const index = langs.findIndex(
                (el) => el === getPreferredProgrammingLanguage()
              )
              if (!!index && index !== -1) {
                setProgrammingLanguage(langs[index])
              } else {
                setProgrammingLanguage(langs[0])
              }
            }
            setAvailableProgrammingLangs(langs)
          }
        }
      }
    )
  }, [])
  if (err) {
    return <ErrorMessage>{err}</ErrorMessage>
  } else if (build === undefined) {
    return <Loading />
  }
  return (
    <DefaultStyle
      build={build}
      availableProgrammingLangs={availableProgrammingLangs}
      selectedProgrammingLang={programmingLanguage}
      setProgrammingLang={setProgrammingLanguage}
      codeProvider={new GendocuCodeProvider(build.getBuildId())}
    />
  )
}
