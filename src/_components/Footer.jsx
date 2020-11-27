import React from 'react';
import styled from 'styled-components';
import Container from "../_styled-components/Container";

const FooterWrapper = styled.footer`
    padding: 20px;
    background: var(--colorPrimaryDark);
`;

const FooterText = styled.p`
    color: #fff;
    text-align: center;
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <Container>
                <FooterText>&copy; All Rights Reserved, 2020</FooterText>
            </Container>
        </FooterWrapper>
    )
};

export default Footer;