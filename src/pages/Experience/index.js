import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Link from 'components/shared/Link'

import css from './styles.scss'

export default class Experience extends Component {
  render() {
    return (
      <div className={css.Experience}>
        <Helmet>
          <title>Experience - Sway</title>
        </Helmet>
        <div className={css.pageContent}>
          <h1>Experience</h1>
          <Link href="/" className={css.link}>
            Home
          </Link>
        </div>
      </div>
    )
  }
}
