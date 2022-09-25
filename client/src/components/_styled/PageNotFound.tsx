import styled from "styled-components";
import { Link } from "react-router-dom";

export const QuickLink = styled(Link)`
    color: #eca7ec;
    background-color: transparent;
    border: 2px solid #eca7ec;
    padding: 1rem 2rem;
    text-decoration: none;
    width: 30%;
    text-align: center;
    position: relative;
    z-index: 5;
    overflow: hidden;
    &::after {
        content: "";
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: #eca7ec;
        z-index: -5;
        top: 0;
        left: 0;
        translate: -100% 0;
        transition: all .2s;
    }
    &:hover {
        color: #101010;
        &::after {
            translate: 0 0;
        }
    }
`;
