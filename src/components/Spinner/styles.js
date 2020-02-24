import styled, { keyframes } from 'styled-components';

const rotateSvg = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
`;

const rotateCircle = keyframes`
  0%, 25% {
    stroke-dashoffset: 274.26104271;
    transform: rotate(0);
  }
  50%, 75% {
    stroke-dashoffset: 70.68583575;
    transform: rotate(45deg);
  }
  100% {
    stroke-dashoffset: 274.26104271;
    transform: rotate(360deg);
  }
`;

export const Svg = styled.svg`
  animation: 1.5s linear infinite both ${rotateSvg};
`;

export const Circle = styled.circle`
  animation: 1.4s ease-in-out infinite both ${rotateCircle};
  fill: transparent;
  stroke: ${({ theme }) => theme.spinner.color};
  stroke-dasharray: 282.743343;
  stroke-linecap: round;
  stroke-width: 10;
  transform-origin: 50% 50%;
`;
