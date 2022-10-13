import styled from "styled-components";



export const Label = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    width: 200px
`;



export const Button = styled.button`
    background-color: rgb(241, 139, 245);
    border: none;
    box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14),
        0px 1px 3px rgba(0, 0, 0, 0.12);
        border-radius: 10px;
    width: 100px;
    padding: 5px;
    &:hover, &:focus {
        background-color: lightblue;
    }
`;
