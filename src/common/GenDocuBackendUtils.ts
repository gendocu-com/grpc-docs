import { grpc } from '@improbable-eng/grpc-web'

export const GenDocuBackendSdkBackend =
  'https://ncjytmo301.execute-api.eu-central-1.amazonaws.com'

export const getMetadata = (passwordSessionId?: string) => {
  const meta = new grpc.Metadata()
  if (passwordSessionId) {
    meta.append('session-id', 'pwd ' + passwordSessionId)
  }
  return meta
}
export const LanguageNotSupported = (e: { code: number; message: string }) => {
  return e.code === 100 || e.message.includes('unsupported language')
}
