import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import lifecycle from 'react-pure-lifecycle'
import { setupNavBtn } from '../tools/global'
import Layout from '../components/Layout'
import PostList from '../components/PostList'

const methods = {
  componentDidMount(props) {
    setupNavBtn()
  },
}

const Category = props => {
  const { data, pageContext } = props
  const { edges: posts, totalCount } = data.allWordpressPost
  const { title: siteTitle } = data.site.siteMetadata
  const { name: category } = pageContext
  const title = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } in the “${category}” category`

  return (
    <Layout>
      <Helmet title={`${category} | ${siteTitle}`} />
      <PostList posts={posts} title={title} />
    </Layout>
  )
}

export default lifecycle(methods)(Category)

export const pageQuery = graphql`
  query CategoryPage($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(
      filter: { categories: { elemMatch: { name: { eq: $slug } } } }
    ) {
      totalCount
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`
