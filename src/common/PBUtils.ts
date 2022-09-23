export const getTypeName = (typpe: string) => {
  switch (typpe) {
    case 'TYPE_STRING':
    case '.google.protobuf.StringValue':
      return 'string'
    case 'TYPE_ENUM':
      return 'enum' // TODO
    case 'TYPE_SFIXED32':
    case 'TYPE_FIXED32':
    case 'TYPE_SINT32':
    case 'TYPE_INT32':
    case '.google.protobuf.Int32Value':
      return 'int (32 bit)'
    case 'TYPE_SFIXED64':
    case 'TYPE_FIXED64':
    case 'TYPE_SINT64':
    case 'TYPE_INT64':
    case '.google.protobuf.Int64Value':
      return 'int (64 bit)'
    case 'TYPE_DOUBLE':
    case '.google.protobuf.DoubleValue':
      return 'float (64 bit)'
    case 'TYPE_FLOAT':
    case '.google.protobuf.FloatValue':
      return 'float (32 bit)'
    case 'TYPE_UINT32':
    case '.google.protobuf.UInt32Value':
      return 'unsigned int (32 bit)'
    case 'TYPE_UINT64':
    case '.google.protobuf.UInt64Value':
      return 'unsigned int (64 bit)'
    case 'TYPE_BOOL':
    case '.google.protobuf.BoolValue':
      return 'boolean'
    case 'TYPE_BYTES':
    case '.google.protobuf.BytesValue':
      return 'array of bytes'
    case '[oneof]':
      return '[oneof]'
    case '.google.protobuf.Any':
      return 'google.protobuf.Any'
    case '.google.protobuf.Api':
      return 'google.protobuf.Api'
    case '.google.protobuf.Duration':
      return 'google.protobuf.Duration'
    case '.google.protobuf.Empty':
      return 'google.protobuf.Empty'
    case '.google.protobuf.Enum':
      return 'google.protobuf.Enum'
    case '.google.protobuf.EnumValue':
      return 'google.protobuf.EnumValue'
    case '.google.protobuf.Field':
      return 'google.protobuf.Field'
    case '.google.protobuf.FieldMask':
      return 'google.protobuf.FieldMask'
    case '.google.protobuf.ListValue':
      return 'google.protobuf.ListValue'
    case '.google.protobuf.Method':
      return 'google.protobuf.Method'
    case '.google.protobuf.NullValue':
      return 'google.protobuf.NullValue'
    case '.google.protobuf.Option':
      return 'google.protobuf.Option'
    case '.google.protobuf.SourceContext':
      return 'google.protobuf.SourceContext'
    case '.google.protobuf.Struct':
      return 'google.protobuf.Struct'
    case '.google.protobuf.Timestamp':
      return 'google.protobuf.Timestamp'
    case '.google.protobuf.Type':
      return 'google.protobuf.Type'
    case '.google.protobuf.Value':
      return 'google.protobuf.Value'
    default:
      console.error('unknown scalar type', typpe)
      return typpe.substr(1)
  }
}
