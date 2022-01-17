import * as React from 'react'
import { GenDocuWidget } from './components/widgets/gendocuWidget'
import { PseudomutoProtocGenDoc } from './components/widgets/pseudomutoProtocGenDoc'
import ReactDOM from 'react-dom'

export const GRPCGenDocuAPIReference = (props: {
  project: string
  organization: string
}) => {
  return <GenDocuWidget {...props} />
}

export const GRPCSelfGeneratedAPIReference = ({
  file,
  scheme
}: {
  file: string
  scheme?: string
}) => {
  return <PseudomutoProtocGenDoc file={file} scheme={scheme} />
}

interface Config {
  classname: string
  GenDocuBackend: {
    project: string
    organization: string
  }
  descriptor: {
    file: string
    scheme: string
  }
}

export const init = (config: Config) => {
  const el = document.getElementById(config.classname)
  if (!el) {
    console.error('Unable to find element with class=' + config.classname)
    return
  }
  const component =
    config.GenDocuBackend.project !== '' ? (
      <GRPCGenDocuAPIReference
        project={config.GenDocuBackend.project}
        organization={config.GenDocuBackend.organization}
      />
    ) : (
      <GRPCSelfGeneratedAPIReference
        file={config.descriptor.file}
        scheme={config.descriptor.scheme}
      />
    )
  ReactDOM.render(component, el)
}
