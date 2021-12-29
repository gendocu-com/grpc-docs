import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100px;
`

const Wrapper2 = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`
// const Img = styled.img`
//   width: 64px;
//   -webkit-animation: spin 1s ease infinite;
//   -moz-animation: spin 1s ease infinite;
//   animation: spin 1s ease infinite;
// `

export const Loading = () => (
  <Wrapper>
    <Wrapper2>
      {/*<Img src={smartAsset.load("../assets/images/gendocu-favico-256.png")} alt='loading' />*/}
      Loading
    </Wrapper2>
  </Wrapper>
)
