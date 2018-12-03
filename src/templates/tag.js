import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import lifecycle from 'react-pure-lifecycle';
import { setupNavBtn } from '../tools/global'
import Layout from '../components/Layout'
import PostList from '../components/PostList'

const methods = {
  componentDidMount(props) {
    setupNavBtn();
  }
};

const Tag = props => {
  const { data, pageContext } = props
  const { edges: posts, totalCount } = data.allWordpressPost
  const { title: siteTitle } = data.site.siteMetadata
  const { name: tag } = pageContext
  const title = `${totalCount} post${
    totalCount === 1 ? '' : 's'
    } with the tag ${tag}`

  return (
    <Layout>
      <Helmet title={`${tag} | ${siteTitle}`} />
      <PostList posts={posts} title={title} />
    </Layout>
  )
}

export default lifecycle(methods)(Tag);

export const pageQuery = graphql`
  query TagPage($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(filter: { tags: { slug: { eq: $slug } } }) {
      totalCount
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`
