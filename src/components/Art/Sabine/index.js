import React from 'react'
import Oeuvre from '../Oeuvre'

import timelines from './timelines.js'

import css from './styles.scss'

export default class Sabine extends Oeuvre {
  timelines = timelines

  render() {
    this.references.stormOcean = {}

    return (
      <div className={css.Sabine} ref="component">
        <div ref="background" className={css.background} />
        <div ref="cube" className={css.cube} />
        <div className={css.stormOcean}>
          <div
            className={css.stormOceanBackground}
            ref={el => el && (this.references.stormOcean.background = el)}
          />
          <div
            className={css.stormOceanHighlight}
            ref={el => el && (this.references.stormOcean.highlight = el)}
          />
          <div
            className={css.stormOceanOverlay}
            ref={el => el && (this.references.stormOcean.overlay = el)}
          />
        </div>
      </div>
    )
  }
}
