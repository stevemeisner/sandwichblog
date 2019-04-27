import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import logo from '../img/logo.svg'

const Navbar = () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(sort: { fields: wordpress_id }, limit: 5) {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `}
    render={data => (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <figure className="image">
                <img src={logo} alt="Kaldi" style={{ width: '200px' }} />
              </figure>
            </Link>

            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="mobileMenu"
              href="#toggleNav"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div className="navbar-menu" id="mobileMenu">
            <div className="navbar-end">
              {data.allWordpressPage.edges.map(edge => (
                <Link
                  className="navbar-item"
                  to={edge.node.slug}
                  key={edge.node.slug}
                >
                  {edge.node.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    )}
  />
)

export default Navbar
