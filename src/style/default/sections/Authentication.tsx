import React from 'react'
import { SectionTitle } from '../common/SectionTitle'
import { TwoPaneWrapper, Pane } from '../common/TwoPaneWrapper'
import { SectionWrapper } from '../common/SectionWrapper'
import { AuthenticationMethod } from 'GendocuPublicApis/sdk/ts/gendocu/sdk_generator/v3/authentication_model_pb'

interface AuthenticationProps {
  description: string
  authMethods: Array<AuthenticationMethod> | undefined
}

export const Authentication = (props: AuthenticationProps) => {
  return (
    <SectionWrapper>
      <SectionTitle>Authentication</SectionTitle>
      {props.description && <p>{props.description}</p>}
      <TwoPaneWrapper>
        <Pane>
          {props.authMethods?.map((el, key) => (
            <div key={key}>{el.getTitle()}</div>
          ))}
        </Pane>
        <Pane />
      </TwoPaneWrapper>
    </SectionWrapper>
  )
}
