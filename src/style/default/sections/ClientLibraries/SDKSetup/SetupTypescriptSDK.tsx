import React, { Fragment } from 'react'
import { BashLine, SetupTitle } from './Style'

export const SetupTypescriptSDK = (props: {
  repositoryUrl: string
  commitSha: string
}) => {
  return (
    <Fragment>
      {/* <SetupTitle>NPM</SetupTitle> */}
      {/* <BashLine>{"npm install git+"+props.repositoryUrl+"#"+props.commitSha}</BashLine> */}
      {/* <BashLine>npm install @improbable-eng/grpc-web google-protobuf @types/google-protobuf</BashLine> */}
      <SetupTitle>Yarn</SetupTitle>
      <BashLine>
        {'yarn add ' + props.repositoryUrl + '#' + props.commitSha}
      </BashLine>
      <BashLine>
        {
          'yarn add @improbable-eng/grpc-web \\\n\tgoogle-protobuf @types/google-protobuf'
        }
      </BashLine>
    </Fragment>
  )
}
