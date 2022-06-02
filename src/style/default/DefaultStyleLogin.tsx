import React, { Fragment, useState } from 'react'
import { ServiceError } from 'gendocu-public-apis/sdk/ts/gendocu/sdk_generator/v3/api_description_service_pb_service'
import { colors, grid, style } from './Constant'
import styled from 'styled-components'

export const DefaultStyleLoginWidget = (props: {
  testPassword: (x: string) => void
  err: ServiceError | undefined
  message: string | undefined
}) => {
  const [newPassword, setNewPassword] = useState('')
  return (
    <Fragment>
      <LoginWrapper>
        <LoginBox>
          <h1>Password protected</h1>
          <div>
            <Description>Enter the password.</Description>
            <PasswordLine>
              <PasswordInput
                type='password'
                placeholder='Password'
                onChange={(val) => setNewPassword(val.target.value)}
              />
              <PasswordButton
                type='button'
                value='Submit'
                onClick={() => props.testPassword(newPassword)}
              />
            </PasswordLine>
            {props.message ? (
              <Message>{props.message}</Message>
            ) : (
              <ErrMessage>{props.err?.message}</ErrMessage>
            )}
          </div>
        </LoginBox>
      </LoginWrapper>
    </Fragment>
  )
}
const PasswordLine = styled.div`
  display: flex;
  gap: ${grid(1)}px;
  justify-content: center;
`
const PasswordInput = styled.input`
  padding: ${grid(1)}px ${grid(2)}px;
  border-radius: ${style.radius}px;
  box-shadow: 0px;
  border: 1px solid ${colors.darkGrey};
`
const PasswordButton = styled.input`
  padding: ${grid(1)}px ${grid(2)}px;
  border-radius: ${style.radius}px;
  box-shadow: 0px;
  border: 1px solid ${colors.darkGrey};
`

const ErrMessage = styled.div`
  color: ${colors.red};
  margin: ${grid(2)}px;
`
const Message = styled.div`
  color: ${colors.grey};
  margin: ${grid(2)}px;
`
const Description = styled.div`
  margin: ${grid(2)}px;
`
const LoginWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`
const LoginBox = styled.div`
  position: relative;
  min-height: 300px;
  top: 50%;
  transform: translateY(-50%);
  max-width: ${grid(50)}px;
  margin: auto;
  text-align: center;
`
