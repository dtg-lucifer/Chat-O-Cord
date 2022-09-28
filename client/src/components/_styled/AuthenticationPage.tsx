import styled from "styled-components";
import { Link } from "react-router-dom";

export const InputField = styled.input`
    background-color: transparent;
    color: white;
    outline: none;
    border: none;
    font-size: 2rem;
    padding: 5px 0;
    width: 100%;
    border-bottom: 1px solid #2b19fd;
`;

export const InputLabel = styled.label`
    letter-spacing: 2px;
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
    border-radius: 1rem;
    padding: 2rem 4rem;
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: background-color .15s ease;
    &:hover {
        background-color: #1c0bd0;
    }
    &:focus {
        background-color: #3c2ced;
        font-size: 2rem;
    }
`;

export const InputContainer = styled.div`
    background-color: #090909;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1rem 2rem;
    border-radius: 1rem;
`;