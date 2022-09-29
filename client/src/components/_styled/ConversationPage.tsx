import styled, { keyframes } from "styled-components";
import { PageWrapperProps } from "../../types/ComponentProps/ConversationPage";

export const PageWrapper = styled.div<PageWrapperProps>`
    height: 100vh;
    display: ${({ display }) => display};
    justify-content: ${({ justifyContent }) => justifyContent};
    align-items: ${({ alignItems }) => alignItems};
    flex-direction: ${({ fdirection }) => fdirection};
    gap: ${({ gap }) => `${gap}rem`}
`;

export const SideBarWrapper = styled.aside`
    background-color: #1a1a1a;
    height: 100%;
    width: 20%;
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
    width: 10rem;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 5rem;
    align-items: center;
    justify-content: space-around;
    padding: 4rem 0;
    &::after {
        content: '';
        display: inline;
        position: absolute;
        right: 0;
        width: 2px;
        transform-origin: center;
        background-color: rgb(255 255 255 / .1);
        animation: ${MiniSideBarRightBorderAnimation} .5s ease forwards;
    }
`;