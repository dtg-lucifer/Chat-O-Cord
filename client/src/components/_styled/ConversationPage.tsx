import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  ChatCardOuterProps,
  PageWrapperProps,
  SIdeBarProps,
} from "../../types/StyledComponentProps/ConversationPage";

export const PageWrapper = styled.div<PageWrapperProps>`
  height: 100vh;
  background-color: #141414;
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
  padding: 1rem 2rem;
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
  background-color: #101010;
  height: 100%;
  width: 7rem;
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
    background-color: rgb(255 255 255 / 0.01);
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
  padding: 0 0 calc(1.5rem - 1px) 0;
  overflow-y: auto;
  scroll-behavior: smooth;
  box-sizing: content-box;
  scrollbar-color: rgb(0 0 0 / 0.8) rgb(0 0 0 / 0.3) !important;
  scrollbar-width: thin !important;
  scrollbar-gutter: stable both-side !important;
  &::-webkit-scrollbar {
    width: 0.5rem;
    cursor: pointer;
  }
  &::-webkit-scrollbar-track {
    background-color: rgb(0 0 0 / 0.2);
    border-radius: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(0 0 0 / 0.4);
    &:hover {
      background-color: rgb(0 0 0 / 0.5);
    }
  }
  ::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    background-color: rgb(255 255 255 / 0.1);
    opacity: ${({ bottomLine }) => (bottomLine === true ? "1" : "0")};
    animation: ${InputBottomLineAnimation} 1s 0.5s ease forwards;
  }
`;

export const SearhBar = styled.input`
  width: 100%;
  padding: 1rem 1rem;
  font-size: 1.2rem;
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
  padding: 0.3rem 0.5rem;
  text-align: center;
  font-size: 1rem;
  flex: 1;
  border-radius: 0.3rem;
  box-shadow: 2px 2px 10px 1px rgb(0 0 0 / 0.3);
  cursor: pointer;
  transition: background-color 0.1s;
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
  padding: 0.5rem 0;
  cursor: pointer;
`;

export const ChatCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: calc(100% - 1rem);
  margin: auto;
  padding: 0.5rem;
  border-radius: 0.5rem;
  height: 6rem;
  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
  }
  &:hover {
    background-color: #080808;
  }
`;

export const Image = styled.img`
  height: 3.5rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  outline: 1px solid #ffa800;
  outline-offset: 1px;
`;

export const CardHeader = styled.h3`
  font-size: 1.8rem;
  font-weight: 400;
`;

export const CardLastMessage = styled.span`
  color: rgb(255 255 255 / 0.4);
`;

/* Conversation channel components */

export const MainWrapper = styled.div`
  background-color: #141414;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
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
  opacity: 0.2;
`;

const HeaderBottomLineAnimation = keyframes`
  from {
    width: 0;
  } to {
    width: 95%;
  }
`;

export const ChatHeader = styled.header`
  position: relative;
  height: 6rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  &::after {
    position: absolute;
    content: "";
    display: block;
    height: 1px;
    background-color: rgb(255 255 255 / 0.1);
    bottom: 0;
    left: auto;
    right: auto;
    animation: ${HeaderBottomLineAnimation} 1s ease forwards;
  }
`;

export const HeaderAvatar = styled.img`
  height: 4rem;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
`;

export const HeaderIconContainer = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  & svg {
    font-size: 2rem;
    cursor: pointer;
  }
`;

export const ConversationWrapper = styled.main`
  width: 100%;
  padding: 0.5rem 2rem;
  flex: 1;
`;

export const ConversationInputWrapper = styled.form`
  margin: 1rem 2rem 4rem 2rem;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background-color: #101010;
  border-radius: 1rem;
  & div {
    height: 2rem;
    aspect-ratio: 1 / 1;
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
`;

export const MsgInput = styled.input`
  background-color: transparent;
  color: white;
  font-size: 1.2rem;
  outline: none;
  border: none;
  flex: 1;
  padding: 1rem;
  &:focus {
    outline: none;
  }
`;

/* Right Profile listing */

export const ProfileListContainer = styled.aside`
  width: 16%;
  height: 100%;
  background-color: #101010;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
  & header {
    border-bottom: 1px solid rgb(255 255 255 / .1);
  }
`;

export const Section = styled.section`
  width: 100%;
`;
