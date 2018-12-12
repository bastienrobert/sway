/**
 * TODO
 *
 * - Splittext
 * - Text translation on load
 */

import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Link from 'components/shared/Link'

import css from './styles.scss'

export default class Home extends Component {
  render() {
    return (
      <div className={css.Home}>
        <Helmet>
          <title>Accueil - Sway</title>
        </Helmet>
        <div className={css.pageContent}>
          <h1>Home</h1>
          <Link href="/experience" className={css.link} button>
            Experience
          </Link>
        </div>
      </div>
    )
  }
}
