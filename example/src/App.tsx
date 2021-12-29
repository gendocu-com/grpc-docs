import React from 'react'

import { GRPCGenDocuAPIReference } from 'grpc-docs'
// import { GRPCSelfGeneratedAPIReference } from 'grpc-docs'
import 'grpc-docs/dist/index.css'

const App = () => {
  return <GRPCGenDocuAPIReference project='LibraryApp' organization='gendocu' />
  // return <GRPCGenDocuAPIReference project='GendocuPublicApis' organization='gendocu' />
  // return <GRPCSelfGeneratedAPIReference file='/example-descriptors/library-app.json' scheme='/example-descriptors/library-app-apispec.yaml' />
  // return <GRPCSelfGeneratedAPIReference file='/example-descriptors/all-types.json' />
}

export default App
