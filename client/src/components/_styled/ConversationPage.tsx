import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  ChatCardOuterProps,
  PageWrapperProps,
  SIdeBarProps,
} from "../../types/StyledComponentProps/ConversationPage";

export const PageWrapper = styled.div<PageWrapperProps>`
  height: 100vh;
  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-direction: ${({ fdirection }) => fdirection};
  gap: ${({ gap }) => `${gap}rem`};
`;

export const SideBarWrapper = styled.aside`
  background-color: #121212;
  height: 100%;
  width: 18%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;
  gap: 2rem;
  border-right: 1px solid rgb(255 255 255 / .1);
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
  background-color: #101010;
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
    width: 1px;
    transform-origin: center;
    background-color: rgb(255 255 255 / .01);
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
  overflow-y: auto;
  scroll-behavior: smooth;
  box-sizing: content-box;
  scrollbar-color: rgb(0 0 0 / .8) rgb(0 0 0 / .3) !important;
  scrollbar-width: thin !important;
  scrollbar-gutter: stable both-side !important;
  &::-webkit-scrollbar {
    width: .5rem;
    cursor: pointer;
  }
  &::-webkit-scrollbar-track {
    background-color: rgb(0 0 0 / .2);
    border-radius: .5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(0 0 0 / .4);
    &:hover {
        background-color: rgb(0 0 0 / .5);
    } 
  }
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
  border-radius: 0.3rem;
  `;

export const ChatFilterButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
  width: 100%;
`;

export const SideBarChatButton = styled(NavLink)`
  background-color: #212121;
  padding: .3rem .5rem;
  text-align: center;
  font-size: 1rem;
  flex: 1;
  border-radius: .3rem;
  box-shadow: 2px 2px 10px 1px rgb(0 0 0 / 0.3);
  cursor: pointer;
  transition: background-color .1s;
  text-decoration: none;
  color: white;
  &:hover {
    background-color: #303030;
  }
`;

export const ChatOuter = styled.div<ChatCardOuterProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  padding: .5rem 0;
  cursor: pointer;
  `;

export const ChatCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: calc(100% - 1rem);
  margin: auto;
  padding: .5rem;
  border-radius: .5rem;
  & > div {
    flex: 1;
  }
  &:hover {
    background-color: #080808;
  }
  `;

export const Image = styled.img`
  height: 3.5rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  outline: 1px solid #FFA800;
  outline-offset: 1px;
`;

export const CardHeader = styled.h2`
  font-weight: 400;
`;

export const CardLastMessage = styled.span`
  color: rgb(255 255 255 / .4);
`;

/* Conversation channel components */

export const MainWrapper = styled.div`
  background-color: #141414;
  height: 100%;
  flex: 1;
`;

export const NotFoundWrapper = styled.main`
  flex: 1;
  height: 100%;
  background-color: #141414;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
`;

export const NoChatHeader = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  opacity: .2;
`;

/* Right Profile listing */

export const ProfileListContainer = styled.aside`
  width: 16%;
  height: 100%;
  background-color: #141414;
  border-inline-start: 1px solid rgb(255 255 255 / .1);
`;