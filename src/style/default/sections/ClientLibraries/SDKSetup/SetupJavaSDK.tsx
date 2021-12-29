import React, { Fragment } from 'react'
import { BashLine, FileContent, SetupTitle } from './Style'

export const SetupJavaSDK = (props: {
  repositoryUrl: string
  projectName: string
  pathToBinary: string
}) => {
  const projectName = props.projectName.replaceAll(' ', '')
  const gradle =
    'plugins {\n' +
    '  id "org.ajoberstar.grgit" version "4.1.0"\n' +
    '  id "com.google.protobuf" version "0.8.17"\n' +
    '}\n' +
    "apply plugin: 'java'\n" +
    'repositories {\n' +
    '    mavenCentral()\n' +
    '}\n' +
    'dependencies {\n' +
    '    implementation "com.squareup.okhttp:okhttp:2.7.5"\n' +
    '    implementation "javax.annotation:javax.annotation-api:1.3.2"\n' +
    '    implementation "io.grpc:grpc-core:1.41.0"\n' +
    '    implementation "io.grpc:grpc-stub:1.41.0"\n' +
    '    implementation "io.grpc:grpc-okhttp:1.41.0"\n' +
    '    implementation "io.grpc:grpc-api:1.41.0"\n' +
    '    implementation "io.grpc:grpc-protobuf:1.41.0"\n' +
    '    implementation files("sdk/' +
    projectName +
    props.pathToBinary +
    projectName +
    '.jar")\n' +
    '}\n' +
    'import org.ajoberstar.grgit.Grgit\n' +
    'task downloadSDK {\n' +
    '    doLast {\n' +
    '        def grgit = Grgit.clone(dir: System.getProperty("user.dir")+"/sdk/' +
    projectName +
    '", uri: \'' +
    props.repositoryUrl +
    "')\n" +
    '        println grgit.describe()\n' +
    '    }\n' +
    '}\n' +
    'task updateSDK {\n' +
    '    doLast {\n' +
    '        def grgit = Grgit.open(dir: System.getProperty("user.dir")+"/sdk/' +
    projectName +
    '")\n' +
    '        grgit.pull()\n' +
    '   }\n' +
    '}'
  return (
    <Fragment>
      <SetupTitle>Gradle</SetupTitle>
      <BashLine>gradle downloadSDK</BashLine>
      <FileContent fileName='build.gradle'>{gradle}</FileContent>
    </Fragment>
  )
}
