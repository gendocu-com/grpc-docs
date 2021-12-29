import {grpc} from "@improbable-eng/grpc-web";

export const GenDocuBackendSdkBackend = 'https://ncjytmo301.execute-api.eu-central-1.amazonaws.com'

export const getMetadata = () => {
  const meta = new grpc.Metadata()
  // const sid = store.documentationSession
  // if(!!sid) {
  //   meta.append("session-id", "pwd " + store.documentationSession)
  // }
  return meta
}
export const LanguageNotSupported = (e: {code: number, message:string}) => {
  return e.code === 100 || e.message.includes("unsupported language")
}
