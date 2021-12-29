import React, { Fragment } from 'react'
import {
  BashLine,
  FileContent,
  SetupSubtitle,
  SetupTitle,
  Troubleshooting
} from './Style'

export const SetupPythonSDK = (props: {
  repositoryUrl: string
  projectName: string
}) => {
  const projectName = props.projectName.toLowerCase().replaceAll(' ', '')
  return (
    <Fragment>
      <SetupTitle>Python 3</SetupTitle>
      <BashLine>pip3 install grpcio protobuf</BashLine>
      <BashLine>
        {'git clone \\\n\t' +
          props.repositoryUrl +
          ' \\\n\t--branch master  ' +
          projectName}
      </BashLine>
      <SetupSubtitle>Then start with a code:</SetupSubtitle>
      <FileContent fileName='main.py'>
        {'from ' + projectName + '.sdk.python3.<filepath> import <servicename>'}
      </FileContent>
      <Troubleshooting url='https://wiki.gendocu.com/docs/troubleshooting/python/' />
    </Fragment>
  )
}
