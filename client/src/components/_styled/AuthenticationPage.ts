import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  InputContainerProps,
  InputFieldProps,
} from "../../types/StyledComponentProps/InputProps";

export const InputField = styled.input<InputFieldProps>`
  background-color: transparent;
  color: white;
  outline: none;
  border: none;
  font-size: 1.2rem;
  padding: 5px 0;
  width: 100%;
  border-bottom: ${({ bottomLine }) =>
    bottomLine ? "1px solid #2b19fd" : "none"};
`;

export const InputTextField = styled.textarea<InputFieldProps>`
  background-color: transparent;
  color: white;
  outline: none;
  border: none;
  font-size: 1.2rem;
  padding: 5px 0;
  width: 100%;
  resize: none;
  border-bottom: ${({ bottomLine }) =>
    bottomLine ? "1px solid #2b19fd" : "none"};
  scrollbar-color: rgb(0 0 0 / 0.8) rgb(0 0 0 / 0.3) !important;
  scrollbar-width: thin !important;
  scrollbar-gutter: stable both-side !important;
`;

export const InputLabel = styled.label`
  letter-spacing: 2px;
  font-size: .5rem;
  opacity: .6;
  text-transform: uppercase;
`;

export const SignInLink = styled(Link)`
  color: white;
`;

export const Button = styled.button`
  color: white;
  background-color: #2b19fd;
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1.2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: background-color 0.15s ease;
  cursor: pointer;
  box-shadow: 2px 2px 10px 1px rgb(0 0 0 / 0.3);
  &:hover {
    background-color: #1c0bd0;
  }
  &:active {
    background-color: #3c2ced;
  }
`;

export const InputContainer = styled.div<InputContainerProps>`
  background-color: ${({ backGroundcolor }) =>
    backGroundcolor ? backGroundcolor : "#090909"};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 5px 1px rgb(0 0 0 / 0.3);
`;
