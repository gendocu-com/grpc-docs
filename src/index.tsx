import * as React from 'react'
import { GenDocuWidget } from './components/widgets/gendocuWidget'
import { PseudomutoProtocGenDoc } from './components/widgets/pseudomutoProtocGenDoc'

export const GRPCGenDocuAPIReference = (props: {
  project: string
  organization: string
}) => {
  return <GenDocuWidget {...props} />
}

export const GRPCSelfGeneratedAPIReference = ({ file, scheme }: { file: string, scheme ?: string }) => {
  return <PseudomutoProtocGenDoc file={file} scheme={scheme} />
}
