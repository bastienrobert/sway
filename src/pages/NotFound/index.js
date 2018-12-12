import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Link from 'components/shared/Link'

import css from './styles.scss'

export default class NotFound extends Component {
  render() {
    return (
      <div className={css.NotFound}>
        <Helmet>
          <title>Not found - Sway</title>
        </Helmet>
        <div className={css.pageContent}>
          <h1>Oooops, you're lost</h1>
          <Link href="/" className={css.link}>
            Back to home
          </Link>
        </div>
      </div>
    )
  }
}
