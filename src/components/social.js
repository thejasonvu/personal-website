import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import config from "../config/"
import Icon from "./icons"

const { socialMedia } = config

const StyledSocialWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  a {
    margin-right: 0.5rem;
    margin-bottom: 0.75rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-right: 1rem;
    }
  }
`

const StyledSocialProfile = styled.a`
  width: ${({ width }) => (width ? width : "auto")};
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary} 50%,
    ${({ theme }) => theme.colors.background} 50%
  );
  background-size: 205% 100%;
  background-position: right bottom;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0.125rem solid ${({ theme }) => theme.colors.primary};
  padding: ${({ padding }) => (padding ? padding : ".3rem 1.25rem")};
  transition: all 0.1s ease-out;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1rem")};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  &:hover {
    background-position: left bottom;
    color: #ffffff;
  }
  &:hover svg {
    /* Change svg color to white */
    filter: brightness(0) invert(1);
  }
  svg {
    height: 1rem;
    width: 1rem;
    margin-right: 0.5rem;
    margin-bottom: -0.05rem;
  }
`

const Social = ({ width, padding, fontSize, fontWeight, withIcon }) => (
  <StyledSocialWrapper itemCount={socialMedia.length} width={width}>
    {socialMedia.map(({ name, url }, key) => {
      return (
        <StyledSocialProfile
          key={key}
          href={url}
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label={name}
          width={width}
          padding={padding}
          fontSize={fontSize}
          fontWeight={fontWeight}
        >
          {withIcon ? <Icon name={name} /> : null} {name}
        </StyledSocialProfile>
      )
    })}
  </StyledSocialWrapper>
)

Social.propTypes = {
  width: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  withIcon: PropTypes.bool,
}

export default Social
