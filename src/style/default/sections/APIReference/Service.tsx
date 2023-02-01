import React, { Fragment } from 'react'
import { SectionTitle } from '../../common/SectionTitle'
import { TwoPaneWrapper, Pane } from '../../common/TwoPaneWrapper'
import { ServiceDescription } from 'GendocuPublicApis/sdk/ts/gendocu/sdk_generator/v3/sdk_generator_pb'
import { toHumanReadableName } from '../../../../common/ServiceOrder'
import {colors, grid} from "../../Constant";
import styled from "styled-components";

interface ServiceProps {
  service: ServiceDescription
}

export const Service = ({ service }: ServiceProps) => (
  <Fragment>
    <TwoPaneWrapper>
      <Pane>
        <SectionTitle>{toHumanReadableName(service.getShortName())}</SectionTitle>
        <ServiceId>
          {getServiceId(service)}
        </ServiceId>
        <p>{service.getDescription()}</p>
      </Pane>
      <Pane></Pane>
    </TwoPaneWrapper>
  </Fragment>
)

const getServiceId = (service: ServiceDescription) => {
  if (service.getServiceId().startsWith('.')) {
    return service.getServiceId().substr(1)
  } else {
    return service.getServiceId()
  }
}

const ServiceId = styled.div`
  color: ${colors.darkGrey};
  margin-bottom: ${grid(2)}px;
  margin-top: ${grid(1)}px;
`
