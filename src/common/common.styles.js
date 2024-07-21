import styled from 'styled-components';

export const FormWrapper = styled.form`
    display: flex;
    align-items: center;
    justify-content: ${props => props.justifyContent};
    flex-wrap:wrap;
    gap: 10px;
    width:100%;
    padding:${props => props.px};
`

export const DashboardWrapper = styled.div`
    width:100%;
    text-align: center;
    padding: 10px 20px;
`