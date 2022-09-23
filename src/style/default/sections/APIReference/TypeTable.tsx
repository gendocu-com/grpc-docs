import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import {colors, grid, style} from '../../Constant'
import {
  TypeDescription,
  FieldDescription
} from 'gendocu-public-apis/sdk/ts/gendocu/sdk_generator/v3/sdk_generator_pb'
import * as jspb from 'google-protobuf'
import { getTypeName } from '../../../../common/PBUtils'

interface TypeTable {
  type: TypeDescription | undefined
  allTypes: jspb.Map<string, TypeDescription>
}
export const TypeTable = ({ type, allTypes }: TypeTable) => {
  if (!type) {
    return <Fragment />
  }
  return (
    <TableWrapper>
      <Table>
        <thead>
          <TrHead>
            <ThStyled>Field</ThStyled>
            <ThStyled>Type</ThStyled>
            <ThStyled>Description</ThStyled>
          </TrHead>
        </thead>
        <tbody>
          <TypeFields type={type} allTypes={allTypes} />
        </tbody>
      </Table>
    </TableWrapper>
  )
}

interface TypeFieldsProps {
  type: TypeDescription | undefined
  allTypes: jspb.Map<string, TypeDescription>
}

const TypeFields = (props: TypeFieldsProps) => {
  if (props.type === undefined) {
    return <Fragment />
  }
  const maxDepth = calculateMaxDepth(1) - 1
  if (!props.type || props.type.getFieldsList().length === 0) {
    return (
      <TrStyled>
        <TdStyled indent={0} colSpan={3}>
          There are no fields!
        </TdStyled>
      </TrStyled>
    )
  }
  const fl = props.type.getFieldsList().filter((el) => el.getOneOf() === '')
  const oneofMap = new Map<string, FieldDescription[]>()
  if (props.type !== undefined) {
    props.type
      .getFieldsList()
      .filter((el) => el.getOneOf() !== '')
      .forEach((el) => {
        const l = el.getOneOf()
        const arr = oneofMap.get(l) || []
        arr.push(el)
        oneofMap.set(l, arr)
      })
  }
  return (
    <Fragment>
      {fl.map((el, key) => (
        <Fragment key={key}>
          <FieldFields
            {...props}
            field={el}
            depth={1}
            maxDepth={maxDepth}
            lastField={key === fl.length + oneofMap.size - 1}
          />
        </Fragment>
      ))}
      <OneofFields
        {...props}
        m={Array.from(oneofMap)}
        depth={1}
        maxDepth={maxDepth}
        lastField={oneofMap.size > 0}
      />
    </Fragment>
  )
}
const FieldFields = (props: {
  field: FieldDescription | undefined
  allTypes: jspb.Map<string, TypeDescription>
  depth: number
  maxDepth: number
  lastField: boolean
}) => {
  const [visible, setVisible] = useState(props.maxDepth > props.depth)
  useEffect(() => {
    setVisible(props.maxDepth > props.depth)
  }, [props.maxDepth, props.depth])
  if (!props.field) {
    console.error('field undefined ', props)
    return <Fragment />
  }
  const tid = props.field.getTypeId()
  const typpe = props.allTypes.get(tid)
  if (props.depth >= 25) {
    console.error('depth exceeded ', props)
    return <Fragment />
  }
  const fl =
    typpe === undefined
      ? []
      : typpe.getFieldsList().filter((el) => el.getOneOf() === '')
  const oneofMap = new Map<string, FieldDescription[]>()
  if (typpe !== undefined) {
    typpe
      .getFieldsList()
      .filter((el) => el.getOneOf() !== '')
      .forEach((el) => {
        const l = el.getOneOf()
        const arr = oneofMap.get(l) || []
        arr.push(el)
        oneofMap.set(l, arr)
      })
  } else if (!!tid && !tid.startsWith('TYPE_') && !tid.startsWith('.google.protobuf.')) {
    console.error('unable to find type ', tid)
  }
  const m = Array.from(oneofMap)
  return (
    <Fragment>
      <FieldTableRow
        depth={props.depth}
        setVisible={setVisible}
        visible={visible}
        unfoldable={fl.length === 0}
        field={props.field}
        typpe={typpe}
      />
      {visible &&
        fl.map((el, key) => (
          <Fragment key={key}>
            <FieldFields
              {...props}
              field={el}
              depth={props.depth + 1}
              lastField={key + 1 === fl.length}
            />
          </Fragment>
        ))}
      {visible && (
        <OneofFields
          {...props}
          m={m}
          depth={props.depth + 1}
          lastField={m.length > 0}
        />
      )}
    </Fragment>
  )
}
const OneofFields = (props: {
  m: [string, FieldDescription[]][]
  allTypes: jspb.Map<string, TypeDescription>
  depth: number
  maxDepth: number
  lastField: boolean
}) => {
  const [visible, setVisible] = useState(props.maxDepth > props.depth)
  return (
    <Fragment>
      {props.m.map((el, key) => {
        const f = new FieldDescription()
        f.setName(el[0])
        f.setTypeId('[oneof]')
        return (
          <Fragment key={key}>
            <FieldTableRow
              depth={props.depth}
              field={f}
              typpe={undefined}
              setVisible={setVisible}
              visible={visible}
              unfoldable={false}
            />
            {visible &&
              el[1].map((el2, key2) => (
                <Fragment key={key2}>
                  <FieldFields
                    {...props}
                    field={el2}
                    depth={props.depth}
                    lastField={key2 + 1 === el[1].length}
                  />
                </Fragment>
              ))}
          </Fragment>
        )
      })}
    </Fragment>
  )
}
const FieldTableRow = (props: {
  depth: number
  field: FieldDescription
  typpe: TypeDescription | undefined
  setVisible: (x: boolean) => void
  visible: boolean
  unfoldable: boolean
}) => {
  return (
    <TrStyled>
      <TdStyled
        indent={props.depth - 1}
        noItalic
        style={{ whiteSpace: 'nowrap' }}
      >
        <ins
          style={{
            fontFamily: 'monospace',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
          onClick={() => props.setVisible(!props.visible)}
        >
          {props.unfoldable ? (
            <Fragment>&nbsp;&nbsp;</Fragment>
          ) : props.visible ? (
            <Fragment>▾&nbsp;</Fragment>
          ) : (
            <Fragment>▸&nbsp;</Fragment>
          )}
        </ins>
        {!!props.field.getOneOf() && (
          <FieldMarker markerType='oneof' direction='left'>
            oneof
          </FieldMarker>
        )}
        {/* {!!props.field.getRequired() && <FieldMarker bgColor="red" color="white">required</FieldMarker>} */}
        {props.field.getName()}
      </TdStyled>
      <TdStyled
        indent={1}
        style={{ whiteSpace: 'nowrap', minWidth: '100px' }}
        noItalic
      >
        {!!props.typpe && props.typpe.getIsMapType() ? (
          'Map'
        ) : (
          <Fragment>
            <ins
              style={{
                display: 'inline-block',
                textDecoration: 'none'
              }}
            >
              {props.typpe === undefined
                ? getTypeName(props.field.getTypeId())
                : props.typpe.getShortName()}
            </ins>
            {props.field.getRepeated() && (
              <FieldMarker markerType='repeated' direction='right'>
                repeated
              </FieldMarker>
            )}
          </Fragment>
        )}
      </TdStyled>
      <TdStyled
        indent={1}
        noItalic
        dangerouslySetInnerHTML={{ __html: props.field.getDescription() }}
      />
    </TrStyled>
  )
}

const calculateMaxDepth = (fieldsLength: number): number => {
  if (fieldsLength === 0) {
    return 1
  }
  if (7 - fieldsLength < 0) {
    return 0
  }
  return 2
}

const TableWrapper = styled.div`
  max-width: 100vw;
  overflow-x: auto;
  border: 1px solid ${colors.lightGrey};
  border-radius: 8px;
`

const TrHead = styled.tr`
  border-top-left-radius: ${style.radius}px;
  border-top-right-radius: ${style.radius}px;
`

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  flex: 1;
`

const ThStyled = styled.th`
  overflow-wrap: break-word;
  hyphens: auto;
  font-weight: normal;
  padding: ${style.typeTable.th.padding.vertical}px
    ${style.typeTable.th.padding.horizontal}px;
  border-bottom: 1px solid ${colors.lightGrey};
  &:nth-child(odd) {
    background: ${colors.veryVeryLightGrey};
  }
`

const TdStyled = styled.td<{ indent: number; noItalic?: boolean }>`
  overflow-wrap: break-word;
  hyphens: auto;
  ${(props) => (props.noItalic ? '' : 'font-style: oblique;')}
  padding: ${style.typeTable.td.padding.vertical}px ${style.typeTable.td.padding.horizontal}px;
  padding-left: ${(props) => props.indent * style.typeTable.td.indent + style.typeTable.td.padding.vertical}px;
  min-width: 120px;
  vertical-align: top;
  &:nth-child(odd) {
    background: ${colors.veryVeryLightGrey};
  }
`

const TrStyled = styled.tr`
  border-bottom: 1px solid ${colors.lightGrey};
  &:last-child {
    border-bottom: 0px;
  }
`

const FieldMarker = styled.div<{
  direction: 'left' | 'right'
  markerType: 'oneof' | 'repeated'
}>`
  display: inline-block;
  border-radius: 4px;
  padding: ${grid(0.5)}px ${grid(1)}px;
  margin-left: ${(props) => (props.direction === 'right' ? '8px' : '0px')};
  margin-right: ${(props) => (props.direction === 'left' ? '8px' : '0px')};
  background-color: ${(props) =>
    props.markerType === 'oneof' ? colors.red : colors.yellow};
  color: ${colors.white};
  white-space: nowrap;
`
