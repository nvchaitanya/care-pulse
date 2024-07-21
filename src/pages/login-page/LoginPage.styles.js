import styled from "styled-components";

export const LoginWrapper = styled.div`
    display:flex;
    // flex-direction: column;
    min-height:100vh;
    justify-content:center;
    // background:rgba(61,171,240,0.1);
    align-items:center;
    background-image:url(/healthcare-bg-image.jpg);
    background-repeat:no-repeat;
    background-size:cover;
    `
export const LoginForm = styled.form`
    display: flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    row-gap:10px;
    border:1px solid rgba(255,255,255,0.3);
    padding:50px 0;
    border-radius:10px;
`

export const LoginImageWrapper = styled.div`
    border: 1px solid red;
`
// export const InputWrapper = styled.div`
//     display:flex;
//     align-items:center;
//     width:calc(100% / 2);
//     justify-content:space-between;
//     column-gap:10px;
// `