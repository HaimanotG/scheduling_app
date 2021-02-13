import React from 'react';
import styled from 'styled-components';
import { Container } from "../_styled-components";

const StyledText = styled.h3`
    color: red
`;

const EmptyList = () => (
    <Container>
        <StyledText>The List is Empty!</StyledText>
    </Container>
)

export default EmptyList;
