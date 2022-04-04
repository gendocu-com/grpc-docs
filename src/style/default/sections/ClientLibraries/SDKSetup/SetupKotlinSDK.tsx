import React, {Fragment} from "react";
import {BashLine, FileContent, SetupTitle} from "./Style";

export const SetupKotlinSDK = (props:{repositoryUrl:string, branch:string, projectName:string, sdkRepoProjectName: string, pathToBinary:string}) => {
  const gradle = "plugins {\n" +
    "  id \"org.ajoberstar.grgit\" version \"4.1.0\"\n" +
    "  id \"com.google.protobuf\" version \"0.8.17\"\n" +
    "}\n" +
    "apply plugin: 'java'\n" +
    "repositories {\n" +
    "    mavenCentral()\n" +
    "}\n" +
    "dependencies {\n" +
    "    implementation \"com.squareup.okhttp:okhttp:2.7.5\"\n" +
    "    implementation \"javax.annotation:javax.annotation-api:1.3.2\"\n" +
    "    implementation \"io.grpc:grpc-core:1.41.0\"\n" +
    "    implementation \"io.grpc:grpc-stub:1.41.0\"\n" +
    "    implementation \"io.grpc:grpc-okhttp:1.41.0\"\n" +
    "    implementation \"io.grpc:grpc-api:1.41.0\"\n" +
    "    implementation \"io.grpc:grpc-protobuf:1.41.0\"\n" +
    "    implementation files(\"sdk/"+props.sdkRepoProjectName+props.pathToBinary+props.sdkRepoProjectName+".jar\")\n" +
    "}\n" +
    "import org.ajoberstar.grgit.Grgit\n" +
    "task downloadSDK {\n" +
    "    doLast {\n" +
    "        def grgit = Grgit.clone(dir: System.getProperty(\"user.dir\")+\"/app/sdk/"+props.sdkRepoProjectName+"\",  refToCheckout: \"" + props.branch + "\", uri: '"+props.repositoryUrl+"')\n" +
    "        println grgit.describe()\n" +
    "    }\n" +
    "}\n" +
    "task updateSDK {\n" +
    "    doLast {\n" +
    "        def grgit = Grgit.open(dir: System.getProperty(\"user.dir\")+\"/app/sdk/" + props.sdkRepoProjectName + "\")\n" +
    "        grgit.pull()\n" +
    "   }\n" +
    "}\n" +
    "application {\n" +
    "    // Define the main class for the application.\n" +
    "    mainClass = 'app.AppKt'\n" +
    "}"
  return <Fragment>
    <SetupTitle>Gradle</SetupTitle>
    <FileContent fileName={"build.gradle"}>
      {gradle}
    </FileContent>
    <BashLine>gradle downloadSDK</BashLine>
    Update SDK with command: <BashLine>gradle updateSDK</BashLine>
  </Fragment>
}
