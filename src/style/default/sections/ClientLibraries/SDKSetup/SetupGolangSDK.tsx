import React, { Fragment } from 'react'
import { SetupTitle, BashLine } from './Style'

export const SetupGolangSDK = (props: { repositoryUrl: string, sdkBranch: string }) => {
  const repositoryUrl = props.repositoryUrl
    .replaceAll('https://', '')
    .replaceAll('http://', '')
  return (
    <Fragment>
      <SetupTitle>Go modules (Go 1.12+)</SetupTitle>
      <BashLine>export GO111MODULE=on</BashLine>
      <BashLine>
        {'GOSUMDB=off go get -u ' + repositoryUrl + '/...@' + props.sdkBranch}
      </BashLine>
    </Fragment>
  )
}
