import React from 'react';
import styled from 'styled-components';

let Wrapper = styled.div`
  z-index: 991;
  left: 50%;
  top: 50%;
  position: absolute;
  background-color: transparent !important;
  transform: translate(-50%, -50%);
`;

let Circle = styled.div`
  width: 15px;
  height: 15px;
  font-size: 10px;
  border-radius: 50%;
  text-indent: -9999em;
  border-top: 3px solid rgba(255, 255, 255, 0.2);
  border-right: 3px solid rgba(255, 255, 255, 0.2);
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
  border-left: 3px solid #ffffff;
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;

  &::after {
    content: '';
    border-radius: 50%;
    width: 10px;
    height: 10px;
  }

  @-webkit-keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Spinner() {
  return (
    <Wrapper>
      <Circle />
    </Wrapper>
  );
}

export default Spinner;
