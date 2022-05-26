import React from 'react'

// import { GRPCGenDocuAPIReference } from 'grpc-docs'
import { GRPCSelfGeneratedAPIReference } from 'grpc-docs'

const App = () => {
  // return <GRPCGenDocuAPIReference project='LibraryApp' organization='gendocu' />
  // return <GRPCGenDocuAPIReference project='GendocuPublicApis' organization='gendocu' />

  return (
    <GRPCSelfGeneratedAPIReference file='/example-descriptors/all-types.json' />
  )
}

export default App
