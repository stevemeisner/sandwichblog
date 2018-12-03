import React from 'react'
import Helmet from 'react-helmet'

import Navbar from './Navbar'
import '../tools/global'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Asheville Sandwich Blog" />
    <Navbar />
    <div>{children}</div>
  </div>
)

export default TemplateWrapper
