import styled from 'styled-components';

export const FormWrapper = styled.form`
    display: flex;
    align-items: center;
    justify-content: ${props=>props.justifyContent};
    flex-wrap:wrap;
    gap: 10px;
    width:100%;
    padding:${props=>props.px};
`

export const HelperText = styled.span`
    font-size:12px;
    color:red;
`