import styled from "styled-components";
import { SocialIconWrapperProps } from "../../types/StyledComponentProps/SocialIconsProps";

export const SocialWrapper = styled.div<SocialIconWrapperProps>`
    display: flex;
    flex-direction: ${(props) => props.fDirection};
    justify-content: space-around;
    gap: ${(props) => props.gap};
    font-size: ${(props) => props.size};
    position: absolute;
    top: 50%;
    left: 10%;
    translate: 0 -50%;
    & > * {
        cursor: pointer;
        color: ${(props) => props.color};
        text-decoration: none;
        text-align: center;
        transition: color .2s;
        &:hover {
            color: whitesmoke;
        }
    }
`;
