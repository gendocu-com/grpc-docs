import { ServiceDescription } from 'gendocu-public-apis/sdk/ts/gendocu/sdk_generator/v3/sdk_generator_pb'
import * as jspb from 'google-protobuf'

export function ServiceDescriptionsInOrder(
  services: jspb.Map<string, ServiceDescription>
) {
  const res: ServiceDescription[] = []
  const serviceIds: string[] = services
    .getEntryList()
    .map((el) => el[0])
    .sort((a, b) =>
      (services.get(a)?.getShortName() || '') <
      (services.get(b)?.getShortName() || '')
        ? -1
        : 1
    )
  serviceIds.forEach((el) => {
    const y = services.get(el)
    if (y) {
      res.push(y)
    }
  })
  return res
}

export const toHumanReadableName = (s: string) => {
  const x = s.replace(/([a-z])([A-Z])/g, '$1 $2')
  return x[0].toUpperCase() + x.substr(1)
}

export const cutOutCommonPackage = (typeName: string, pkg: string) => {
  const y = typeName.split('.')
  y.pop()
  const typenamePkg = y.join('.')
  if (pkg.startsWith(typenamePkg)) {
    return typeName.substr(typenamePkg.length + 1)
  } else {
    return typeName.substr(1)
  }
}
