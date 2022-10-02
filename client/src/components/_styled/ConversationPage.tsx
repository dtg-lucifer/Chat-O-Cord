import styled, { keyframes } from "styled-components";
import {
  PageWrapperProps,
  SIdeBarProps,
} from "../../types/ComponentProps/ConversationPage";

export const PageWrapper = styled.div<PageWrapperProps>`
  height: 100vh;
  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-direction: ${({ fdirection }) => fdirection};
  gap: ${({ gap }) => `${gap}rem`};
`;

export const SideBarWrapper = styled.aside`
  background-color: #1a1a1a;
  height: 100%;
  width: 16%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;
  gap: 2rem;
  & > div:last-child {
    flex: 1;
  }
`;

const MiniSideBarRightBorderAnimation = keyframes`
    from {
        height: 0;
    } to {
        height: 95%;
    }
`;

export const ConversationMiniSideBarWrapper = styled.div`
  background-color: #1a1a1a;
  height: 100%;
  width: 8rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  align-items: center;
  justify-content: space-around;
  padding: 2rem 0;
  &::after {
    content: "";
    display: inline;
    position: absolute;
    right: 0;
    width: 2px;
    transform-origin: center;
    background-color: rgb(255 255 255 / 0.1);
    animation: ${MiniSideBarRightBorderAnimation} 1s ease forwards;
  }
`;

/* Main side bar syled components */

const InputBottomLineAnimation = keyframes`
    from {
        width: 0;
    } to {
        width: 100%;
    }
`;

export const Wrapper = styled.div<SIdeBarProps>`
  width: 100%;
  position: relative;
  padding: 0 0 2rem 0;
  ::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    background-color: rgb(255 255 255 / 0.2);
    opacity: ${({ bottomLine }) => (bottomLine === true ? "1" : "0")};
    animation: ${InputBottomLineAnimation} 1s 0.5s ease forwards;
  }
`;

export const SearhBar = styled.input`
  width: 100%;
  padding: 1rem 1rem;
  font-size: 1rem;
  outline: none;
  background-color: #202020;
  border: none;
  color: white;
  box-shadow: 2px 2px 10px 1px rgb(0 0 0 / 0.3);
  border-radius: 0.5rem;
`;
