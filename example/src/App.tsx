import React from 'react'

// import { GRPCGenDocuAPIReference } from 'grpc-docs'
import { GRPCSelfGeneratedAPIReference } from 'grpc-docs'

const App = () => {
  // return <GRPCGenDocuAPIReference project='LibraryApp' organization='gendocu' />
  // return <GRPCGenDocuAPIReference project='GendocuPublicApis' organization='gendocu' />
  return (
    <GRPCSelfGeneratedAPIReference
      definition={JSON.stringify({
        files: [
          {
            name: 'Booking.proto',
            description:
              'Booking related messages.\n\nThis file is really just an example. The data model is completely\nfictional.',
            package: 'com.example',
            hasEnums: false,
            hasExtensions: false,
            hasMessages: true,
            hasServices: true,
            enums: [],
            extensions: [],
            messages: [
              {
                name: 'Booking',
                longName: 'Booking',
                fullName: 'com.example.Booking',
                description:
                  'Represents the booking of a vehicle.\n\nVehicles are some cool shit. But drive carefully!',
                hasExtensions: false,
                hasFields: true,
                hasOneofs: false,
                extensions: [],
                fields: [
                  {
                    name: 'vehicle_id',
                    description: 'ID of booked vehicle.',
                    label: '',
                    type: 'int32',
                    longType: 'int32',
                    fullType: 'int32',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'customer_id',
                    description: 'Customer that booked the vehicle.',
                    label: '',
                    type: 'int32',
                    longType: 'int32',
                    fullType: 'int32',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'status',
                    description: 'Status of the booking.',
                    label: '',
                    type: 'BookingStatus',
                    longType: 'BookingStatus',
                    fullType: 'com.example.BookingStatus',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'confirmation_sent',
                    description: 'Has booking confirmation been sent?',
                    label: '',
                    type: 'bool',
                    longType: 'bool',
                    fullType: 'bool',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'payment_received',
                    description: 'Has payment been received?',
                    label: '',
                    type: 'bool',
                    longType: 'bool',
                    fullType: 'bool',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'color_preference',
                    description: 'Color preference of the customer.',
                    label: '',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: '',
                    options: {
                      deprecated: true
                    }
                  }
                ]
              },
              {
                name: 'BookingStatus',
                longName: 'BookingStatus',
                fullName: 'com.example.BookingStatus',
                description: 'Represents the status of a vehicle booking.',
                hasExtensions: false,
                hasFields: true,
                hasOneofs: false,
                extensions: [],
                fields: [
                  {
                    name: 'id',
                    description: 'Unique booking status ID.',
                    label: '',
                    type: 'int32',
                    longType: 'int32',
                    fullType: 'int32',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'description',
                    description: 'Booking status description. E.g. "Active".',
                    label: '',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: '',
                    options: {
                      'validator.field': [
                        {
                          name: 'string_not_empty',
                          value: true
                        },
                        {
                          name: 'length_lt',
                          value: 255
                        }
                      ]
                    }
                  }
                ]
              },
              {
                name: 'BookingStatusID',
                longName: 'BookingStatusID',
                fullName: 'com.example.BookingStatusID',
                description: 'Represents the booking status ID.',
                hasExtensions: false,
                hasFields: true,
                hasOneofs: false,
                extensions: [],
                fields: [
                  {
                    name: 'id',
                    description: 'Unique booking status ID.',
                    label: '',
                    type: 'int32',
                    longType: 'int32',
                    fullType: 'int32',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  }
                ]
              },
              {
                name: 'EmptyBookingMessage',
                longName: 'EmptyBookingMessage',
                fullName: 'com.example.EmptyBookingMessage',
                description: 'An empty message for testing',
                hasExtensions: false,
                hasFields: false,
                hasOneofs: false,
                extensions: [],
                fields: []
              }
            ],
            services: [
              {
                name: 'BookingService',
                longName: 'BookingService',
                fullName: 'com.example.BookingService',
                description: 'Service for handling vehicle bookings.',
                methods: [
                  {
                    name: 'BookVehicle',
                    description:
                      'Used to book a vehicle. Pass in a Booking and a BookingStatus will be returned.',
                    requestType: 'Booking',
                    requestLongType: 'Booking',
                    requestFullType: 'com.example.Booking',
                    requestStreaming: false,
                    responseType: 'BookingStatus',
                    responseLongType: 'BookingStatus',
                    responseFullType: 'com.example.BookingStatus',
                    responseStreaming: false,
                    options: {
                      'google.api.http': {
                        rules: [
                          {
                            method: 'POST',
                            pattern: '/api/bookings/vehicle/{vehicle_id}',
                            body: '*'
                          }
                        ]
                      }
                    }
                  },
                  {
                    name: 'BookingUpdates',
                    description:
                      'Used to subscribe to updates of the BookingStatus.',
                    requestType: 'BookingStatusID',
                    requestLongType: 'BookingStatusID',
                    requestFullType: 'com.example.BookingStatusID',
                    requestStreaming: false,
                    responseType: 'BookingStatus',
                    responseLongType: 'BookingStatus',
                    responseFullType: 'com.example.BookingStatus',
                    responseStreaming: true
                  }
                ]
              }
            ]
          },
          {
            name: 'Customer.proto',
            description: 'This file has messages for describing a customer.',
            package: 'com.example',
            hasEnums: false,
            hasExtensions: false,
            hasMessages: true,
            hasServices: false,
            enums: [],
            extensions: [],
            messages: [
              {
                name: 'Address',
                longName: 'Address',
                fullName: 'com.example.Address',
                description: 'Represents a mail address.',
                hasExtensions: false,
                hasFields: true,
                hasOneofs: false,
                extensions: [],
                fields: [
                  {
                    name: 'address_line_1',
                    description: 'First address line.',
                    label: 'required',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'address_line_2',
                    description: 'Second address line.',
                    label: 'optional',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'address_line_3',
                    description: 'Second address line.',
                    label: 'optional',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'town',
                    description: 'Address town.',
                    label: 'required',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'county',
                    description: 'Address county, if applicable.',
                    label: 'optional',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'country',
                    description: 'Address country.',
                    label: 'required',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  }
                ]
              },
              {
                name: 'Customer',
                longName: 'Customer',
                fullName: 'com.example.Customer',
                description: 'Represents a customer.',
                hasExtensions: false,
                hasFields: true,
                hasOneofs: false,
                extensions: [],
                fields: [
                  {
                    name: 'id',
                    description: 'Unique customer ID.',
                    label: 'required',
                    type: 'int32',
                    longType: 'int32',
                    fullType: 'int32',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'first_name',
                    description: 'Customer first name.',
                    label: 'required',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'last_name',
                    description: 'Customer last name.',
                    label: 'required',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'details',
                    description: 'Customer details.',
                    label: 'optional',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'email_address',
                    description: 'Customer e-mail address.',
                    label: 'optional',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'phone_number',
                    description: 'Customer phone numbers, primary first.',
                    label: 'repeated',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'mail_addresses',
                    description: 'Customer mail addresses, primary first.',
                    label: 'repeated',
                    type: 'Address',
                    longType: 'Address',
                    fullType: 'com.example.Address',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  }
                ]
              }
            ],
            services: []
          },
          {
            name: 'Vehicle.proto',
            description: 'Messages describing manufacturers / vehicles.',
            package: 'com.example',
            hasEnums: false,
            hasExtensions: true,
            hasMessages: true,
            hasServices: false,
            enums: [
              {
                name: 'Category',
                longName: 'Manufacturer.Category',
                fullName: 'com.example.Manufacturer.Category',
                description:
                  'Manufacturer category. A manufacturer may be either inhouse or external.',
                values: [
                  {
                    name: 'CATEGORY_INHOUSE',
                    number: '0',
                    description: 'The manufacturer is inhouse.'
                  },
                  {
                    name: 'CATEGORY_EXTERNAL',
                    number: '1',
                    description: 'The manufacturer is external.'
                  }
                ]
              }
            ],
            extensions: [
              {
                name: 'country',
                longName: 'Manufacturer.country',
                fullName: 'com.example.Manufacturer.country',
                description: 'Manufacturer country.',
                label: 'optional',
                type: 'string',
                longType: 'string',
                fullType: 'string',
                number: 100,
                defaultValue: 'China',
                containingType: 'Manufacturer',
                containingLongType: 'Manufacturer',
                containingFullType: 'com.example.Manufacturer'
              }
            ],
            messages: [
              {
                name: 'Manufacturer',
                longName: 'Manufacturer',
                fullName: 'com.example.Manufacturer',
                description: 'Represents a manufacturer of cars.',
                hasExtensions: false,
                hasFields: true,
                hasOneofs: false,
                extensions: [],
                fields: [
                  {
                    name: 'id',
                    description: 'The unique manufacturer ID.',
                    label: 'required',
                    type: 'int32',
                    longType: 'int32',
                    fullType: 'int32',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'code',
                    description: 'A manufacturer code, e.g. "DKL4P".',
                    label: 'required',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'details',
                    description: 'Manufacturer details (minimum orders et.c.).',
                    label: 'optional',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'category',
                    description: 'Manufacturer category.',
                    label: 'optional',
                    type: 'Category',
                    longType: 'Manufacturer.Category',
                    fullType: 'com.example.Manufacturer.Category',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: 'CATEGORY_EXTERNAL'
                  }
                ]
              },
              {
                name: 'Model',
                longName: 'Model',
                fullName: 'com.example.Model',
                description: 'Represents a vehicle model.',
                hasExtensions: false,
                hasFields: true,
                hasOneofs: false,
                extensions: [],
                fields: [
                  {
                    name: 'id',
                    description: 'The unique model ID.',
                    label: 'required',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'model_code',
                    description: 'The car model code, e.g. "PZ003".',
                    label: 'required',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'model_name',
                    description: 'The car model name, e.g. "Z3".',
                    label: 'required',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'daily_hire_rate_dollars',
                    description: 'Dollars per day.',
                    label: 'required',
                    type: 'sint32',
                    longType: 'sint32',
                    fullType: 'sint32',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'daily_hire_rate_cents',
                    description: 'Cents per day.',
                    label: 'required',
                    type: 'sint32',
                    longType: 'sint32',
                    fullType: 'sint32',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  }
                ]
              },
              {
                name: 'Vehicle',
                longName: 'Vehicle',
                fullName: 'com.example.Vehicle',
                description: 'Represents a vehicle that can be hired.',
                hasExtensions: true,
                hasFields: true,
                hasOneofs: false,
                extensions: [
                  {
                    name: 'series',
                    longName: 'Model.series',
                    fullName: 'com.example.Model.series',
                    description: 'Vehicle model series.',
                    label: 'optional',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    number: 100,
                    defaultValue: '',
                    containingType: 'Model',
                    containingLongType: 'Model',
                    containingFullType: 'com.example.Model',
                    scopeType: 'Vehicle',
                    scopeLongType: 'Vehicle',
                    scopeFullType: 'com.example.Vehicle'
                  }
                ],
                fields: [
                  {
                    name: 'id',
                    description: 'Unique vehicle ID.',
                    label: 'required',
                    type: 'int32',
                    longType: 'int32',
                    fullType: 'int32',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'model',
                    description: 'Vehicle model.',
                    label: 'required',
                    type: 'Model',
                    longType: 'Model',
                    fullType: 'com.example.Model',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'reg_number',
                    description: 'Vehicle registration number.',
                    label: 'required',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'mileage',
                    description: 'Current vehicle mileage, if known.',
                    label: 'optional',
                    type: 'sint32',
                    longType: 'sint32',
                    fullType: 'sint32',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'category',
                    description: 'Vehicle category.',
                    label: 'optional',
                    type: 'Category',
                    longType: 'Vehicle.Category',
                    fullType: 'com.example.Vehicle.Category',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'daily_hire_rate_dollars',
                    description: 'Dollars per day.',
                    label: 'optional',
                    type: 'sint32',
                    longType: 'sint32',
                    fullType: 'sint32',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: '50'
                  },
                  {
                    name: 'daily_hire_rate_cents',
                    description: 'Cents per day.',
                    label: 'optional',
                    type: 'sint32',
                    longType: 'sint32',
                    fullType: 'sint32',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  }
                ]
              },
              {
                name: 'Category',
                longName: 'Vehicle.Category',
                fullName: 'com.example.Vehicle.Category',
                description:
                  'Represents a vehicle category. E.g. "Sedan" or "Truck".',
                hasExtensions: false,
                hasFields: true,
                hasOneofs: false,
                extensions: [],
                fields: [
                  {
                    name: 'code',
                    description: 'Category code. E.g. "S".',
                    label: 'required',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  },
                  {
                    name: 'description',
                    description: 'Category name. E.g. "Sedan".',
                    label: 'required',
                    type: 'string',
                    longType: 'string',
                    fullType: 'string',
                    ismap: false,
                    isoneof: false,
                    oneofdecl: '',
                    defaultValue: ''
                  }
                ]
              }
            ],
            services: []
          }
        ],
        scalarValueTypes: [
          {
            protoType: 'double',
            notes: '',
            cppType: 'double',
            csType: 'double',
            goType: 'float64',
            javaType: 'double',
            phpType: 'float',
            pythonType: 'float',
            rubyType: 'Float'
          },
          {
            protoType: 'float',
            notes: '',
            cppType: 'float',
            csType: 'float',
            goType: 'float32',
            javaType: 'float',
            phpType: 'float',
            pythonType: 'float',
            rubyType: 'Float'
          },
          {
            protoType: 'int32',
            notes:
              'Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead.',
            cppType: 'int32',
            csType: 'int',
            goType: 'int32',
            javaType: 'int',
            phpType: 'integer',
            pythonType: 'int',
            rubyType: 'Bignum or Fixnum (as required)'
          },
          {
            protoType: 'int64',
            notes:
              'Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead.',
            cppType: 'int64',
            csType: 'long',
            goType: 'int64',
            javaType: 'long',
            phpType: 'integer/string',
            pythonType: 'int/long',
            rubyType: 'Bignum'
          },
          {
            protoType: 'uint32',
            notes: 'Uses variable-length encoding.',
            cppType: 'uint32',
            csType: 'uint',
            goType: 'uint32',
            javaType: 'int',
            phpType: 'integer',
            pythonType: 'int/long',
            rubyType: 'Bignum or Fixnum (as required)'
          },
          {
            protoType: 'uint64',
            notes: 'Uses variable-length encoding.',
            cppType: 'uint64',
            csType: 'ulong',
            goType: 'uint64',
            javaType: 'long',
            phpType: 'integer/string',
            pythonType: 'int/long',
            rubyType: 'Bignum or Fixnum (as required)'
          },
          {
            protoType: 'sint32',
            notes:
              'Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s.',
            cppType: 'int32',
            csType: 'int',
            goType: 'int32',
            javaType: 'int',
            phpType: 'integer',
            pythonType: 'int',
            rubyType: 'Bignum or Fixnum (as required)'
          },
          {
            protoType: 'sint64',
            notes:
              'Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s.',
            cppType: 'int64',
            csType: 'long',
            goType: 'int64',
            javaType: 'long',
            phpType: 'integer/string',
            pythonType: 'int/long',
            rubyType: 'Bignum'
          },
          {
            protoType: 'fixed32',
            notes:
              'Always four bytes. More efficient than uint32 if values are often greater than 2^28.',
            cppType: 'uint32',
            csType: 'uint',
            goType: 'uint32',
            javaType: 'int',
            phpType: 'integer',
            pythonType: 'int',
            rubyType: 'Bignum or Fixnum (as required)'
          },
          {
            protoType: 'fixed64',
            notes:
              'Always eight bytes. More efficient than uint64 if values are often greater than 2^56.',
            cppType: 'uint64',
            csType: 'ulong',
            goType: 'uint64',
            javaType: 'long',
            phpType: 'integer/string',
            pythonType: 'int/long',
            rubyType: 'Bignum'
          },
          {
            protoType: 'sfixed32',
            notes: 'Always four bytes.',
            cppType: 'int32',
            csType: 'int',
            goType: 'int32',
            javaType: 'int',
            phpType: 'integer',
            pythonType: 'int',
            rubyType: 'Bignum or Fixnum (as required)'
          },
          {
            protoType: 'sfixed64',
            notes: 'Always eight bytes.',
            cppType: 'int64',
            csType: 'long',
            goType: 'int64',
            javaType: 'long',
            phpType: 'integer/string',
            pythonType: 'int/long',
            rubyType: 'Bignum'
          },
          {
            protoType: 'bool',
            notes: '',
            cppType: 'bool',
            csType: 'bool',
            goType: 'bool',
            javaType: 'boolean',
            phpType: 'boolean',
            pythonType: 'boolean',
            rubyType: 'TrueClass/FalseClass'
          },
          {
            protoType: 'string',
            notes:
              'A string must always contain UTF-8 encoded or 7-bit ASCII text.',
            cppType: 'string',
            csType: 'string',
            goType: 'string',
            javaType: 'String',
            phpType: 'string',
            pythonType: 'str/unicode',
            rubyType: 'String (UTF-8)'
          },
          {
            protoType: 'bytes',
            notes: 'May contain any arbitrary sequence of bytes.',
            cppType: 'string',
            csType: 'ByteString',
            goType: '[]byte',
            javaType: 'ByteString',
            phpType: 'string',
            pythonType: 'str',
            rubyType: 'String (ASCII-8BIT)'
          }
        ]
      })}
      // file='/example-descriptors/all-types.json'
      // scheme='/example-descriptors/library-app-apispec.yaml'
    />
  )
  // return <GRPCSelfGeneratedAPIReference file='/example-descriptors/all-types.json' />
}

export default App
