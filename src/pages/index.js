import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/sections/hero"
import Articles from "../components/sections/articles"
import About from "../components/sections/about"
import Projects from "../components/sections/projects"
import Contact from "../components/sections/contact"
import { splashScreen } from "../config"

const IndexPage = ({ data }) => (
  <Layout splashScreen={splashScreen}>
    <SEO title="Jason Vu | Software Developer" />
    <Hero content={data.hero.edges} />
    <About content={data.about.edges} />
    <Projects content={data.projects.edges} />
    {/* Articles is populated via Medium RSS Feed fetch */}
    <Articles />
    <Contact content={data.contact.edges} />
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  {
    hero: allMdx(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
      edges {
        node {
          body
          frontmatter {
            greetings
            title
            subtitlePrefix
            subtitle
            icon {
              childImageSharp {
                fluid(maxWidth: 60, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    about: allMdx(filter: { fileAbsolutePath: { regex: "/about/" } }) {
      edges {
        node {
          body
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 400, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    projects: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/projects/" }
        frontmatter: { visible: { eq: "true" } }
      }
      sort: { fields: [frontmatter___position], order: ASC }
    ) {
      edges {
        node {
          body
          frontmatter {
            title
            category
            external
            github
            screenshot {
              childImageSharp {
                fluid(maxWidth: 400, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            tags
            position
            buttonVisible
            buttonUrl
            buttonText
          }
        }
      }
    }
    contact: allMdx(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
      edges {
        node {
          body
          frontmatter {
            title
            name
            email
          }
        }
      }
    }
  }
`
