import React from 'react'
import Oeuvre from '../Oeuvre'

import timelines from './timelines.js'

import css from './styles.scss'

export default class Sabine extends Oeuvre {
  timelines = timelines

  render() {
    return (
      <div className={css.Sabine} ref="component">
        <div ref="cube" className={css.cube} />
      </div>
    )
  }
}
