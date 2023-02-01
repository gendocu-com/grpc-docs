import React, { Fragment, useEffect, useState } from 'react'
import { DefaultStyle } from '../../style/default/DefaultStyle'
import {
  SdkGeneratorClient,
  ServiceError
} from 'GendocuPublicApis/sdk/ts/gendocu/sdk_generator/v3/api_description_service_pb_service'
import {
  Build,
  BuildSelectorRequest,
  BuildWithOrgAndName,
  EnterPasswordRequest
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
import { grpc } from '@improbable-eng/grpc-web'
import { DefaultStyleLoginWidget } from '../../style/default/DefaultStyleLogin'
import { CodeSnippet } from '../../common/CodeSnippet'

interface GenDocuWidgetProps {
  project: string
  organization: string
}

export const GenDocuWidget = (props: GenDocuWidgetProps) => {
  const [build, setBuild] = useState<Build>()
  const [err, setError] = useState<ServiceError>()
  const [passwordMessage, setPasswordMessage] = useState<string>()
  const [passwordSessionId, setPasswordSessionId] = useState<string>()
  const [codeSnippets, setCodeSnippets] = useState(
    new Map<string, CodeSnippet>()
  )
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
  var sdkGenerator = new SdkGeneratorClient(GenDocuBackendSdkBackend)
  console.log("here!")
  useEffect(() => {
    console.log("here2!")
    const buildwithorgandname = new BuildWithOrgAndName()
    buildwithorgandname.setApiName(props.project)
    buildwithorgandname.setOrganization(props.organization)

    const buildselectorrequest = new BuildSelectorRequest()
    buildselectorrequest.setOrgAndName(buildwithorgandname)

    sdkGenerator.getBuild(
      buildselectorrequest,
      getMetadata(passwordSessionId),
      (err, value: Build | null) => {
        if (!!err || !value) {
          setError(
            err || {
              message: 'received empty value',
              code: -1,
              metadata: new grpc.Metadata()
            }
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
            console.log("available langs", langs)
            setAvailableProgrammingLangs(langs)
          }
        }
      }
    )
  }, [passwordSessionId])

  useEffect(() => {
    if (!build) {
      return
    }
    const codeProvider = new GendocuCodeProvider(build.getBuildId())
    const m = new Map<string, { code: string; output: string }>()
    const resp = codeProvider.getAllSnippets(
      programmingLanguage,
      passwordSessionId
    )
    resp.then((el) => {
      el.forEach((el) => {
        m.set(el.methodId, { code: el.snippetCode, output: el.output })
      })
      setCodeSnippets(m)
    })
  }, [build, passwordSessionId, programmingLanguage])
  const testPassword = (password: string) => {
    const buildwithorgandname = new BuildWithOrgAndName()
    buildwithorgandname.setApiName(props.project)
    buildwithorgandname.setOrganization(props.organization)

    const buildselectorrequest = new BuildSelectorRequest()
    buildselectorrequest.setOrgAndName(buildwithorgandname)

    const req = new EnterPasswordRequest()
    req.setSelector(buildselectorrequest)
    req.setPassword(password)
    setPasswordMessage('Checking password')
    sdkGenerator.enterPassword(req, getMetadata(), (err, resp) => {
      if (err || !resp) {
        setError(
          err || {
            message: 'received empty response',
            code: -1,
            metadata: new grpc.Metadata()
          }
        )
        setPasswordMessage(undefined)
      } else {
        setError(undefined)
        setPasswordMessage('Password is valid, loading documentation')
        setPasswordSessionId(resp.getSessionId())
      }
    })
  }
  if (err) {
    if (err?.code === grpc.Code.PermissionDenied) {
      return (
        <Fragment>
          <DefaultStyleLoginWidget
            testPassword={testPassword}
            err={err}
            message={passwordMessage}
          />
        </Fragment>
      )
    } else {
      return (
        <ErrorMessage>
          Code {err.code}: {err.message}
        </ErrorMessage>
      )
    }
  } else if (build === undefined) {
    return <Loading />
  }
  return (
    <DefaultStyle
      build={build}
      codeSnippets={codeSnippets}
      availableProgrammingLangs={availableProgrammingLangs}
      selectedProgrammingLang={programmingLanguage}
      setProgrammingLang={setProgrammingLanguage}
      codeProvider={new GendocuCodeProvider(build.getBuildId())}
    />
  )
}
