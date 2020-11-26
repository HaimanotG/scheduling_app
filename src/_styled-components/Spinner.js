
import React from 'react';
import styled from 'styled-components';

const Spinner = () => (
  <StyledSpinner viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </StyledSpinner>
);

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;
  
  position: fixed;
  top: 40%;
  left: 49%;
  margin: 0 auto;
  
  & .path {
    stroke: var(--info);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default Spinner;


// import React from 'react';
// import styled,{keyframes} from "styled-components";

// const rotate = keyframes`
//     from {
//         transform: rotate(0deg);
//     }
    
//     to { 
//         transform: rotate(360deg);
//     }
// `;

// const Circle = styled.div`
//     height: 100px;
//     width: 100px;
//     background: none;
//     border-radius: 50%;
    
//     border: 10px solid #fff;
//     border-top: 10px solid var(--colorPrimary);
//     animation: ${rotate} 2s linear infinite;
//     position: absolute;
//     left: 45%;
//     top: 40%;
//     transform: translate(-50%, -50%);
// `;

// const SpinnerWrapper = styled.div`
//     position: fixed;
//     z-index: 1;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     overflow: auto;
//     background-color: rgba(255,255,255,0.5);
// `;

// const Spinner = () => {
//     return (
//         <SpinnerWrapper>
//             <Circle/>
//         </SpinnerWrapper>
//     )
// };
// export default Spinner;