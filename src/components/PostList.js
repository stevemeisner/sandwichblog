import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { setupNavBtn } from '../tools/global'
import SanitizedHTML from 'react-sanitized-html';

export default class IndexPage extends React.Component {
  componentDidMount() {
    setupNavBtn();
  }

  render() {
    const { posts } = this.props

    return (
      <section className="section">
        <div className="container">
          {posts.map(({ node: post }) => (
            <div
              className="content"
              style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
              key={post.id}
            >
              <p>
                <Link className="has-text-primary" to={post.slug}>
                  <SanitizedHTML html={post.title} />
                </Link>
                <span> &bull; </span>
                <small>
                  {post.date} - posted by{' '}
                  <Link to={`/author/${post.author.slug}`}>
                    {post.author.name}
                  </Link>
                </small>
              </p>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.replace(/<p class="link-more.*/, ''),
                  }}
                />
                <Link className="button is-small" to={post.slug}>
                  Keep Reading →
                </Link>
              </div>
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
