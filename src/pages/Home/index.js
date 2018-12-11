/**
 * TODO
 *
 * - Splittext
 * - Text translation on load
 */

import React, { Component } from 'react'

import css from './styles.scss'

export default class Home extends Component {
  render() {
    return (
      <div className={css.Home}>
        <h1>Home</h1>
        <a href="/experience">Experience</a>
      </div>
    )
  }
}
