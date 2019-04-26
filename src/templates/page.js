import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import lifecycle from 'react-pure-lifecycle'
import { setupNavBtn } from '../tools/global'
import Layout from '../components/Layout'

const methods = {
  componentDidMount(props) {
    setupNavBtn()
  },
}

export const PageTemplate = ({ title, content, featured_media }) => {
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              {featured_media && (
                <div className="featured-media">
                  <Img fluid={featured_media.localFile.childImageSharp.fluid} />
                </div>
              )}
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  featured_media: PropTypes.object,
}

const Page = ({ data }) => {
  const { wordpressPage: page } = data

  return (
    <Layout>
      <Helmet title={`${page.title} | Asheville Sandwich Blog`} />
      <PageTemplate
        title={page.title}
        content={page.content}
        featured_media={page.featured_media}
      />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default lifecycle(methods)(Page)

export const pageQuery = graphql`
  query PageById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
