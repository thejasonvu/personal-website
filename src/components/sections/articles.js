import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import SkeletonLoader from "tiny-skeleton-loader-react"
import { motion, useAnimation } from "framer-motion"

import Context from "../../context"
import config from "../../config"
import { parseDate } from "../../utils"
import ContentWrapper from "../../styles/ContentWrapper"
import Underlining from "../../styles/Underlining"

const { mediumRssFeed, shownArticles } = config

const StyledSection = motion.custom(styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
`)

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    padding-right: 0;
    padding-left: 0;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
    }
    .section-title {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        padding-right: 0;
        padding-left: 0;
      }
    }
    .articles {
      display: flex;
      align-items: stretch;
      flex-direction: column;
      margin: -2rem 0 0 0;
      padding: 0 2rem;
    }
    .card {
      max-width: calc(${({ theme }) => theme.pageWidth} * 0.8);
      display: flex;
      flex-direction: column;
      padding: 1rem;
      margin: 1rem auto;
      box-shadow: ${({ theme }) => theme.elevations[1]};
      border-radius: calc(${({ theme }) => theme.borderRadius} * 6);
      transition: box-shadow 0.3s ease-out;
      &:hover {
        box-shadow: ${({ theme }) => theme.elevations[8]};
      }
      &:hover ${Underlining} {
        box-shadow: inset 0 -1rem 0 ${({ theme }) => theme.colors.secondary};
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        box-shadow: ${({ theme }) => theme.elevations[0]};
        margin: 2rem auto;
      }
      .category {
        color: ${({ theme }) => theme.colors.primary};
        text-transform: uppercase;
        letter-spacing: +1px;
        font-weight: 700;
      }
      .title {
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
        font-weight: 700;
      }
      .date {
        color: #555555;
        letter-spacing: +0.5px;
      }
      .tags {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .tag {
        margin-right: 0.5rem;
      }
      .description {
        font-weight: 300;
      }
    }
  }
`

const Articles = () => {
  // shownArticles is set in config.js, due to the rss feed loader
  // it is currently limited to max 3
  const MAX_ARTICLES = shownArticles

  const { isIntroDone } = useContext(Context).state
  const [articles, setArticles] = useState()
  const articlesControls = useAnimation()

  // Load and display articles after the splashScreen sequence is done
  useEffect(() => {
    const loadArticles = async () => {
      if (isIntroDone) {
        await articlesControls.start({
          opacity: 1,
          y: 0,
          transition: { delay: 1 },
        })
        // MediumRssFeed is set in config.js
        fetch(mediumRssFeed, { headers: { Accept: "application/json" } })
          .then(res => res.json())
          .then(articles => setArticles(articles))
          .catch(error => console.log(error))
      }
    }
    loadArticles()
  }, [isIntroDone, articlesControls, MAX_ARTICLES])

  return (
    <StyledSection
      id="articles"
      initial={{ opacity: 0, y: 20 }}
      animate={articlesControls}
    >
      <StyledContentWrapper elevation={2}>
        <h3 className="section-title">Latest Articles on Dev.to</h3>
        <div className="articles">
          {articles
            ? articles.map(item => (
                <a
                  href={item.url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  title={item.title}
                  aria-label={item.url}
                  key={item.url}
                >
                  <div className="card">
                    <span className="date body-2">
                      {parseDate(item.published_timestamp)}
                    </span>
                    <h5 className="title">{item.title}</h5>
                    <p className="body-1 description">{item.description}</p>
                    <div className="tags">
                      {item.tag_list.map(tag => (
                        <span className="tag caption" key={item.link + tag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))
            : [...Array(MAX_ARTICLES)].map((i, key) => (
                <div className="card" key={key}>
                  <SkeletonLoader
                    background="#f2f2f2"
                    height="1.5rem"
                    style={{ marginBottom: ".5rem" }}
                  />
                  <SkeletonLoader background="#f2f2f2" height="4rem" />
                  <SkeletonLoader
                    background="#f2f2f2"
                    height=".75rem"
                    width="50%"
                    style={{ marginTop: ".5rem" }}
                  />
                </div>
              ))}
        </div>
      </StyledContentWrapper>
    </StyledSection>
  )
}

export default Articles
