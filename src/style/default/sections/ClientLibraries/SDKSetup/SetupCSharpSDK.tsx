import React, { Fragment } from 'react'
import { BashLine, FileContent, SetupTitle } from './Style'

export const SetupCSharpSDK = (props: {
  repositoryUrl: string
  projectName: string
  commitSha: string
}) => {
  const projectName = props.projectName.replaceAll(' ', '')
  return (
    <Fragment>
      <SetupTitle>NuGet</SetupTitle>
      In the project root (dir with yourproject.csproj file):
      <BashLine>
        {'git clone ' +
          props.repositoryUrl +
          ' \\\n\t --branch master ../' +
          projectName}
      </BashLine>
      <FileContent fileName='YourProject.csproj'>
        {CSProjOverride(projectName)}
      </FileContent>
    </Fragment>
  )
}

const CSProjOverride = (projectName: string) => {
  return (
    '<Project>\n' +
    '....\n' +
    '  <ItemGroup>\n' +
    '    <ProjectReference Include="../' +
    projectName +
    '/sdk/csharp/*.csproj"/>\n' +
    '  </ItemGroup>\n' +
    '....\n' +
    '</Project>'
  )
}
