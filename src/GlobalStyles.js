import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --colorPrimary: ${({ theme }) => theme.colorPrimary};
        --colorPrimaryDark: ${({ theme }) => theme.colorPrimaryDark};
        --accent: ${({ theme }) => theme.accent};
        --warning: ${({ theme }) => theme.warning};
        --info: ${({ theme }) => theme.info};
        
        --component-background: ${({ theme }) => theme.componentBackground};
        --body: ${({ theme }) => theme.body};
        --text-color: ${({ theme }) => theme.text};
        --default-box-shadow: ${({ theme }) => theme.componentBoxShadow};
        --default-radi: ${({ theme }) => theme.defaultRadi};
        --font-stack: 'Roboto Regular', Helvetica, Arial, sans-serif;
    }
    
    @font-face {
        font-family: 'Roboto Regular';
        src: url('../public/fonts/Roboto-Regular.woff') format('woff'),
            url('../public/fonts/Roboto-Regular.woff2') format('woff2'),
            url('../public/fonts/Roboto-Regular.ttf') format('truetype');
    }
    
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    body {
        font-family: var(--font-stack);
        background: var(--body);
        color: var(--text-color);
        transition: background .25s ease;
    }
    
    li {
        list-style-type: none;
    }
`;

export default GlobalStyles;
