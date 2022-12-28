import styled, { keyframes } from "styled-components";

const LoadingAnimation = keyframes`
  0% {
    background-position: 0% 0, 120px 0, 120px 40px, 120px 80px;
  }
  100% {
    background-position: 100% 0, 120px 0, 120px 40px, 120px 80px;
  }
`;

const LoadingSkeleton = styled.span`
  width: 360px;
  height: 100px;
  display: block;
  position: relative;
  background-image: linear-gradient(
      100deg,
      transparent,
      rgba(38, 50, 56, 0.5) 50%,
      transparent 80%
    ),
    linear-gradient(#fff 20px, transparent 0),
    linear-gradient(#fff 20px, transparent 0),
    linear-gradient(#fff 20px, transparent 0);
  background-repeat: no-repeat;
  background-size: 75px 100px, 125px 20px, 260px 20px, 260px 20px;
  background-position: 0% 0, 120px 0, 120px 40px, 120px 80px;
  box-sizing: border-box;
  animation: ${LoadingAnimation} 1s linear infinite;
  &::after {
    content: "";
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const LoadingSkeletonForConversation = () => <LoadingSkeleton />;


export default LoadingSkeletonForConversation;
