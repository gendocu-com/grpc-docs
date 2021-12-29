import React, {Fragment} from "react";
import {BashLine, SetupTitle} from "./Style";

export const SetupGrpcurl = () => (
  <Fragment>
    <SetupTitle>Mac OS</SetupTitle>
    <BashLine>brew install grpcurl</BashLine>
    <SetupTitle>Linux</SetupTitle>
    <div>Before installing grpcurl install brew with command: </div>
    <BashLine>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</BashLine>
    <BashLine>brew install grpcurl</BashLine>
  </Fragment>
)
