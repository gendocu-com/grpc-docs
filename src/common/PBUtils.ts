export const getTypeName = (typpe: string) => {
  switch (typpe) {
    case 'TYPE_STRING':
      return 'string'
    case 'TYPE_ENUM':
      return 'enum' // TODO
    case 'TYPE_SFIXED32':
    case 'TYPE_FIXED32':
    case 'TYPE_SINT32':
    case 'TYPE_INT32':
      return 'int (32 bit)'
    case 'TYPE_SFIXED64':
    case 'TYPE_FIXED64':
    case 'TYPE_SINT64':
    case 'TYPE_INT64':
      return 'int (64 bit)'
    case 'TYPE_DOUBLE':
      return 'float (64 bit)'
    case 'TYPE_FLOAT':
      return 'float (32 bit)'
    case 'TYPE_UINT32':
      return 'unsigned int (32 bit)'
    case 'TYPE_UINT64':
      return 'unsigned int (64 bit)'
    case 'TYPE_BOOL':
      return 'boolean'
    case 'TYPE_BYTES':
      return 'array of bytes'
    case '[oneof]':
      return '[oneof]'
    default:
      console.error('unknown scalar type', typpe)
      return typpe.substr(1)
  }
}
