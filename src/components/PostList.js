import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { setupNavBtn } from '../tools/global'
import SanitizedHTML from 'react-sanitized-html'

export default class IndexPage extends React.Component {
  componentDidMount() {
    setupNavBtn()
  }

  render() {
    const { posts } = this.props

    return (
      <section className="section">
        <div className="container">
          {posts.map(({ node: post }) => (
            <div className="content" key={post.id}>
              <p className="post-list-headline">
                <Link className="has-text-primary" to={post.slug}>
                  <SanitizedHTML html={post.title} />
                </Link>
                <span> &mdash; </span>
                <small>
                  {post.date} by{' '}
                  <Link to={`/author/${post.author.slug}`}>
                    {post.author.name}
                  </Link>
                </small>
              </p>
              <div
                className="post-excerpt"
                dangerouslySetInnerHTML={{
                  __html: post.excerpt,
                }}
              />
              <Link className="read-more button is-small" to={post.slug}>
                Keep Reading →
              </Link>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    id
    title
    excerpt
    author {
      name
      slug
      avatar_urls {
        wordpress_48
      }
    }
    date(formatString: "MMMM DD, YYYY")
    slug
  }
`
