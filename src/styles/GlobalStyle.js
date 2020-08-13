import { createGlobalStyle } from "styled-components"
import modernNormalize from "styled-modern-normalize"

const GlobalStyle = createGlobalStyle`
    
    // Import normalize.css
    ${modernNormalize}

    * {
        box-sizing: border-box;
    }

    html {
        width: 100%;
        height: 100%;
    }

    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        color: ${({ theme }) => theme.colors.text};
        font-size: 1rem;
        font-family: ${({ theme }) => theme.fonts.primary};
        line-height: 1.5rem;
        font-weight: 400;
        text-rendering: optimizeLegibility;
        &.blur {
            overflow: hidden;
            #___gatsby #main-content > * {
              filter: blur(5px) ;
              transition: all .3s ease-out;
              pointer-events: none;
              user-select: none;
            }
          }
        }
        &.splashScreen {
              position: fixed;
              overflow: hidden;
        }
    

    a {
        display: inline-block;
        text-decoration: none;
        text-decoration-skip-ink: auto;
        color: inherit;
        cursor: pointer;
        &:hover,
        &:focus {
          outline: 0;
        }
    }

    h1 {
        font-weight: 800;
        font-size: 2rem;
        font-style: italic;
        line-height: 2.375rem;
        color: ${({ theme }) => theme.colors.primary};
        @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
            font-size: 6rem;
            line-height: 7rem;
        }
    }

    h2 {
        font-family: ${({ theme }) => theme.fonts.secondary};
        font-weight: 300;
        font-size: 1.25rem;
        line-height: 1.5rem;
        color: ${({ theme }) => theme.colors.primary};
        @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
            font-size: 3.75rem;
            line-height: 3.125rem;
        }
    }

    h3 {
        font-weight: 800;
        font-size: 2.625rem;
        font-style: italic;
        line-height: 3.5rem;
        color: ${({ theme }) => theme.colors.primary};
        margin-bottom: 3rem;
    }

    h4 {
        font-size: 2.125rem;
        line-height: 2.625rem;
        font-weight: 400;
        font-family: ${({ theme }) => theme.fonts.secondary};
    }

    h5 {
        font-size: 1.5rem;
        line-height: 1.75rem;
        font-weight: 400;
        font-family: ${({ theme }) => theme.fonts.secondary};
    }

    h6 {
        font-size: 1.5rem;
        line-height: 1.75rem;
        font-weight: 700;
        font-style: italic;
        color: black;
    }

    hr {
        margin: 3rem auto;
        border-width: .05rem;
        color: ${({ theme }) => theme.colors.tertiary};
        opacity: 0.1;
    }
    
    .subtitle-1 {
        font-family: ${({ theme }) => theme.fonts.secondary};
        font-weight: 500;
        font-size: 1rem;
    }

    .subtitle-2 {
        font-size: 0.875rem;
        font-weight: 400;
    }

    .body-1 {
        font-size: 1rem;
        font-weight: 400;
    }

    .body-2 {
        font-family: ${({ theme }) => theme.fonts.secondary};
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.25rem;
    } 

    .caption {
        font-size: 0.75rem;
        font-style: italic;
        line-height: 1.125rem;
    }

    .overline {
        font-size: 0.75rem;
        text-transform: uppercase;
        font-family: ${({ theme }) => theme.fonts.secondary};
        line-height: 0.875rem;
        font-weight: 700;
        color: black;
    }

    .button {
        font-size: 0.875rem;
        font-family: ${({ theme }) => theme.fonts.secondary};
        font-weight: 700;
        color: black;
    }
`

export default GlobalStyle
