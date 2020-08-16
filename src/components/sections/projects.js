import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import VisibilitySensor from "react-visibility-sensor"
import { motion } from "framer-motion"

import { useOnScreen } from "../../hooks"
import ContentWrapper from "../../styles/ContentWrapper"
import Underlining from "../../styles/Underlining"
import Button from "../../styles/Button"
import Icon from "../../components/icons"

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 6rem;
  .cta-btn {
    display: block;
    text-align: center;
    margin: 2rem auto;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin: 0 auto;
    }
  }
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 0;
    padding-left: 0;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
    }
    .section-title {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        padding-right: 0;
        padding-left: 0;
      }
    }
    .projects {
      display: flex;
      flex-direction: column;
      margin-top: -2.5rem;
      padding: 0 2rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-top: 0;
        padding: 0;
      }
    }
  }
`

const StyledProject = styled(motion.div)`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0;
  margin-bottom: 2rem;
  flex-shrink: 0;
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    max-width: 25rem;
    margin-top: 2rem;
    padding-right: 5rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    justify-content: space-between;
    flex-shrink: 1;
    max-width: 62.5rem;
    margin-bottom: 10rem;
    padding-right: 0;
    /* Positioning of image and details should vary */
    flex-direction: ${({ position }) =>
      position % 2 !== 0 ? "row" : "row-reverse"};
  }
  .details {
    text-align: ${({ position }) => (position % 2 !== 0 ? "left" : "right")};
    width: 100%;
    padding-left: 0.5rem;
    max-width: 25rem;
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
      margin-top: 0;
      max-height: 22.5rem;
    }
    .category {
      letter-spacing: +0.5px;
    }
    .title {
      margin-top: 0.625rem;
      margin-bottom: 0.625rem;
    }
    .description {
      overflow: auto;
    }
    .tags {
      display: flex;
      justify-content: ${({ position }) =>
        position % 2 !== 0 ? "flex-start" : "flex-end"};
      flex-wrap: wrap;
      margin-top: 1.5rem;
      line-height: 1.2rem;
      span {
        margin-${({ position }) =>
          position % 2 !== 0 ? "right" : "left"}: 1rem;
        margin-bottom: 1rem;
      }
    }
    .links {
      display: flex;
      justify-content: ${({ position }) =>
        position % 2 !== 0 ? "flex-start" : "flex-end"};
      align-items: center;
      width: 100%;
      margin-top: 1rem;
      a {
        display: inline-block;
        margin-${({ position }) =>
          position % 2 !== 0 ? "right" : "left"}: 2rem;
      }
      svg {
        width: 1.3rem;
        height: 1.3rem;
        transition: all 0.3s ease-out;
      }
      svg:hover {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
  .screenshot {
    width: 100%;
    max-width: 37.5rem;
    height: 15rem;
    border-radius: calc(${({ theme }) => theme.borderRadius} * 6);
    transition: all 0.3s ease-in-out;
    &:hover {
      filter: none;
      transform: translate3d(0px, -0.125rem, 0px);
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
      height: 22.5rem;
      filter: grayscale(70%) contrast(1) brightness(90%);
    }
  }
`

const Projects = ({ content }) => {
  const sectionDetails = content[0].node
  const projects = content.slice(1, content.length)

  // visibleProject is needed to show which project is currently
  // being viewed in the horizontal slider on mobile and tablet
  const [visibleProject, setVisibleProject] = useState(1)

  // projects don't track the visibility by using the onScreen hook
  // instead they use react-visibility-sensor, therefore their visibility
  // is also stored differently
  const [onScreen, setOnScreen] = useState({})
  const handleOnScreen = el => {
    if (!onScreen[el]) {
      const updatedOnScreen = { ...onScreen }
      updatedOnScreen[el] = true
      setOnScreen(updatedOnScreen)
    }
  }
  const pVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    // mobile and tablet only: set first project as visible in the
    // horizontal slider
    setVisibleProject(1)
    // required for animations: set visibility for all projects to
    // "false" initially
    let initial = {}
    projects.forEach(project => {
      initial[project.node.frontmatter.position] = false
    })
    setOnScreen(initial)
  }, [])

  // Required for animating the title
  const tRef = useRef()
  const tOnScreen = useOnScreen(tRef)
  const tVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  // Required for animating the button
  const bRef = useRef()
  const bOnScreen = useOnScreen(bRef)
  const bVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <StyledSection id="projects">
      <StyledContentWrapper>
        <motion.div
          ref={tRef}
          variants={tVariants}
          animate={tOnScreen ? "visible" : "hidden"}
        >
          <h3 className="section-title">{sectionDetails.frontmatter.title}</h3>
        </motion.div>
        <div className="projects">
          {projects.map(project => {
            const { body, frontmatter } = project.node
            return (
              <VisibilitySensor
                key={frontmatter.position}
                onChange={() => handleOnScreen(frontmatter.position)}
                partialVisibility={true}
                minTopValue={100}
              >
                <StyledProject
                  position={frontmatter.position}
                  variants={pVariants}
                  animate={
                    onScreen[frontmatter.position] ? "visible" : "hidden"
                  }
                >
                  <div className="details">
                    <div className="category overline">
                      {frontmatter.emoji} {frontmatter.category}
                    </div>
                    <h6 className="title">{frontmatter.title}</h6>
                    <div className="body-1 description">
                      <MDXRenderer>{body}</MDXRenderer>
                    </div>
                    <div className="tags body-2">
                      {frontmatter.tags.map(tag => (
                        <Underlining
                          key={tag}
                          color="secondary"
                          hoverColor="secondary"
                        >
                          {tag}
                        </Underlining>
                      ))}
                    </div>
                    <div className="links">
                      {frontmatter.github && (
                        <a
                          href={frontmatter.github}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          aria-label="External Link"
                        >
                          <Icon name="github" color="#888888" />
                        </a>
                      )}
                      {frontmatter.external && (
                        <a
                          href={frontmatter.external}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          aria-label="External Link"
                        >
                          <Icon name="external" color="#888888" />
                        </a>
                      )}
                    </div>
                  </div>
                  {/* If image in viewport changes, update state accordingly */}
                  <VisibilitySensor
                    onChange={() => setVisibleProject(frontmatter.position)}
                  >
                    <Img
                      className="screenshot"
                      fluid={frontmatter.screenshot.childImageSharp.fluid}
                    />
                  </VisibilitySensor>
                </StyledProject>
              </VisibilitySensor>
            )
          })}
        </div>
      </StyledContentWrapper>
      {sectionDetails.frontmatter.buttonVisible === "true" && (
        <motion.a
          ref={bRef}
          variants={bVariants}
          animate={bOnScreen ? "visible" : "hidden"}
          className="cta-btn"
          href={sectionDetails.frontmatter.buttonUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="External Link"
        >
          <Button type="button" textAlign="center" color="primary" center>
            {sectionDetails.frontmatter.buttonText}
          </Button>
        </motion.a>
      )}
    </StyledSection>
  )
}

Projects.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Projects
