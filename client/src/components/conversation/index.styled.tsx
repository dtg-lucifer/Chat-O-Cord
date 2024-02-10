import styled, { keyframes } from "styled-components";

// ! Side Bar

export const SideBarWrapper = styled.div`
  background-color: var(--clr-dark-bg-faint);
  min-width: 20rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  padding: 1rem 0.5rem;
`;

export const TopWrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 0 0.5rem;
`;

export const SearchBarDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  gap: 0.5rem;
  background-color: var(--clr-dark-bg-faint);
  box-shadow: var(--shadow-dark);
  border-radius: 0.5rem;

  & > * {
    cursor: pointer;
    color: var(--clr-light-bg);
    background-color: var(--clr-dark-bg-faint);
    padding: 0.3rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding: 0.5rem;

    &:hover {
      color: var(--clr-light-bg);
      background-color: var(--clr-dark-bg);
    }

    & > img {
      aspect-ratio: 1 / 1;
      object-fit: cover;
      height: 2.5rem;
      border-radius: 50%;
      outline: 2px solid var(--clr-sts-light);
      outline-offset: 2px;
    }
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem;

  & > button {
    width: 100%;
  }
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
  overflow-y: scroll;
  gap: 0.5rem;
  padding: 0 0.5rem;
`;

export const ChatCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  width: 100%;
  padding: 0.6rem;
  border-radius: 5px;
  cursor: pointer;

  & > img {
    aspect-ratio: 1 / 1;
    object-fit: cover;
    height: 2.5rem;
    border-radius: 50%;
    outline: 2px solid var(--clr-sts-light);
    outline-offset: 2px;
  }

  & > div.details__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.2rem;
    flex: 1;

    & > h4 {
      font-size: 15px;
      font-weight: 600;
      color: var(--clr-light-bg);
      width: 100%;
    }

    & > p {
      width: 100%;
      font-size: 12px;
      font-weight: 500;
      color: #bbbbbb;
    }
  }

  &:hover {
    background-color: #333333;
  }
`;

export const ChatCardActive = styled(ChatCard)`
  background-color: #333333;
`;

// ! Chat Section

const MainWrapperAnimation = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 100%;
  }
`;

const SpinnerAnimation = keyframes`
  0% { transform: rotate(0deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(360deg) }
`;

export const ChatSectionMainWrapper = styled.main`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: -1;
  animation: ${MainWrapperAnimation} 0.2s ease-in-out;
  position: relative;
`;

export const ChatTopWrapper = styled.header`
  height: 4rem;
  background-color: var(--clr-dark-bg-faint);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  position: relative;
  gap: 1.5rem;

  & > img {
    aspect-ratio: 1 / 1;
    object-fit: cover;
    height: 2.5rem;
    border-radius: 50%;
    outline: 2px solid var(--clr-sts-light);
    outline-offset: 2px;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: -100%;
    background-color: var(--clr-dark-bg-faint);
    z-index: -1;
  }
`;

export const ChatMessagesStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;

  & > div.spinner__wrapper {
    width: 100px;
    height: 100px;
    display: inline-block;
    overflow: hidden;
    background: rgba(241, 242, 243, 0);

    & > div.spinner {
      width: 100%;
      height: 100%;
      position: relative;
      transform: translateZ(0) scale(1);
      backface-visibility: hidden;
      transform-origin: 0 0;

      & > div {
        box-sizing: content-box;
        position: absolute;
        animation: ${SpinnerAnimation} 1s linear infinite;
        width: 73px;
        height: 73px;
        top: 14px;
        left: 14px;
        border-radius: 50%;
        box-shadow: 0 1.1px 0 0 #55ff00;
        transform-origin: 36px 36.55px;
      }
    }
  }

  & > span {
    font-size: 1.3rem;
    color: rgb(85 85 85);
    font-family: var(--primary-font);
  }
`;

export const ConversationWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  padding: 1rem;
  background-color: var(--clr-dark-bg);
  border-radius: 0.5rem 0 0 0;
  overflow-y: scroll;
`;

export const ChatTypingStatusWrapper = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(85 85 85);
  align-self: flex-start;
  margin-top: 5px;
  margin-inline-start: 3rem;
`;

export const ChatBottomWrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1rem 2rem 1rem;
  background-color: var(--clr-dark-bg);
  box-shadow: var(--shadow-primary);
  position: relative;

  & > * {
    box-shadow: var(--shadow-primary);
  }

  & > :not(input, div) {
    cursor: pointer;
    box-sizing: content-box;
    background-color: var(--clr-dark-bg-faint);
    padding: 1rem;
    border-radius: 0.5rem;
  }

  & > div.emoji__wrapper > aside.EmojiPickerReact {
    position: absolute;
    bottom: 100%;
    right: calc(0% + 1rem);
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.2s ease-in-out;
    appearance: none;
    visibility: hidden;
  }

  & > div.emoji__wrapper > aside.EmojiPickerReact.emoji__wrapper__active {
    transform: translateX(0);
    opacity: 100%;
    appearance: none;
    visibility: visible;
  }
`;
