import React, { Fragment } from 'react'
import {BashLine, FileContent, SectionSeparator, SetupTitle} from './Style'

export const SetupJavaSDK = (props: {
  repositoryUrl: string
  pathToBinary: string
  sdkRepoName: string
  sdkBranch: string
}) => {
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
    props.sdkRepoName  +
    props.pathToBinary +
    props.sdkRepoName  +
    '.jar")\n' +
    '}\n' +
    'import org.ajoberstar.grgit.Grgit\n' +
    'task downloadSDK {\n' +
    '    doLast {\n' +
    '        def grgit = Grgit.clone(dir: System.getProperty("user.dir")+"/sdk/' +
    props.sdkRepoName  +
    '", uri: \'' +
    props.repositoryUrl +
    '\', refToCheckout: \'' +
    props.sdkBranch +
    '\')\n' +
    '        println grgit.describe()\n' +
    '    }\n' +
    '}\n' +
    'task updateSDK {\n' +
    '    doLast {\n' +
    '        def grgit = Grgit.open(dir: System.getProperty("user.dir")+"/sdk/' +
    props.sdkRepoName  +
    '")\n' +
    '        grgit.pull()\n' +
    '   }\n' +
    '}'
  return (
    <Fragment>
      <SetupTitle>Maven</SetupTitle>
      <BashLine>{`mvn scm:checkout -DconnectionUrl=scm:git:${props.repositoryUrl} -DscmVersionType=${props.sdkBranch} -DcheckoutDirectory=sdk/${props.sdkRepoName}`}</BashLine>
      <FileContent fileName={"pom.xml"} >
        {`<dependency>
    <groupId>com.${props.sdkRepoName}</groupId>
    <artifactId>${props.sdkRepoName}</artifactId>
    <version>1.0</version>
    <scope>system</scope>
    <systemPath>\${project.basedir}/sdk/${props.sdkRepoName}/sdk/java/${props.sdkRepoName}.jar</systemPath>
</dependency>
<dependency>
    <groupId>io.grpc</groupId>
    <artifactId>grpc-netty</artifactId>
    <version>1.41.2</version>
</dependency>
<dependency>
    <groupId>io.grpc</groupId>
    <artifactId>grpc-protobuf</artifactId>
    <version>1.41.2</version>
</dependency>
<dependency>
    <groupId>io.grpc</groupId>
    <artifactId>grpc-stub</artifactId>
    <version>1.41.2</version>
</dependency>`}
      </FileContent>
      <SectionSeparator/>
      <SetupTitle>Gradle</SetupTitle>
      <BashLine>gradle downloadSDK</BashLine>
      <FileContent fileName='build.gradle'>{gradle}</FileContent>
    </Fragment>
  )
}
