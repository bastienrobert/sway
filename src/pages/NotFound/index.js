import React, { Component } from 'react'

import css from './styles.scss'

export default class NotFound extends Component {
  render() {
    return (
      <div className={css.NotFound}>
        <h1>Error</h1>
      </div>
    )
  }
}
