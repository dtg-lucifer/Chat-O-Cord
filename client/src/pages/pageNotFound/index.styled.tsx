import { Link } from "react-router-dom";
import styled from "styled-components";

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
    transition: all 0.2s;
  }
  &:hover {
    color: #101010;
    &::after {
      translate: 0 0;
    }
  }
`;

export const SocialWrapper = styled.div<{
  fDirection?: string;
  gap?: string;
  size?: string;
  color?: string;
}>`
  display: flex;
  flex-direction: ${({ fDirection }) => fDirection};
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
    transition: color 0.2s;
    &:hover {
      color: whitesmoke;
    }
  }
`;