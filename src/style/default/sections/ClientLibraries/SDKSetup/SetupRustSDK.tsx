import React, {Fragment} from "react";
import {FileContent, SetupTitle} from "./Style";

export const SetupRustSDK = ({sdkRepoProjectName, repositoryUrl, branch}:{repositoryUrl:string, branch:string, sdkRepoProjectName: string}) => {
    return <Fragment>
        <SetupTitle>Cargo</SetupTitle>
        <FileContent fileName="Cargo.toml">
            {   "[dependencies]\n" +
                "tonic = \"0.8\"\n" +
                "prost-types = \"0.11\"\n" +
                "tokio = { version = \"1.0\", features = [\"macros\", \"rt-multi-thread\"] }\n" +
                sdkRepoProjectName + " = {  git = \"" + repositoryUrl + "\", branch = \"" + branch + "\"}\n\n"
            }
        </FileContent>
    </Fragment>
}
