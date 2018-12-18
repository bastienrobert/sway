import React from 'react'
import Oeuvre from '../Oeuvre'

import timelines from './timelines.js'

import css from './styles.scss'

export default class Sabine extends Oeuvre {
  timelines = timelines

  render() {
    this.references.stormOcean = {}
    this.references.boat = {}

    return (
      <div className={css.Sabine} ref="component">
        <div ref="background" className={css.background} />
        <div ref="backgroundImage" className={css.backgroundImage} />
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
        <div
          className={css.boat}
          ref={el => el && (this.references.boat.component = el)}>
          <div
            className={css.boatMatt}
            ref={el => el && (this.references.boat.matt = el)}
          />
          <div
            className={css.boatHull}
            ref={el => el && (this.references.boat.hull = el)}
          />
        </div>
      </div>
    )
  }
}
