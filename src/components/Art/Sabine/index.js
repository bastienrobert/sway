import React from 'react'
import Oeuvre from '../Oeuvre'

import timelines from './timelines.js'

import css from './styles.scss'

export default class Sabine extends Oeuvre {
  timelines = timelines

  render() {
    this.references.stormClouds = {}

    return (
      <div className={css.Sabine} ref="component">
        <div ref="cube" className={css.cube} />
        <div className={css.stormClouds}>
          <div className={css.stormCloudBrushSmallRight} ref={el => el && (this.references.stormClouds.stormCloudBrushSmallRight = el)}></div>
          <div className={css.stormCloudPointSmall} ref={el => el && (this.references.stormClouds.stormCloudPointSmall = el)}></div>
          <div className={css.stormCloudOrange} ref={el => el && (this.references.stormClouds.stormCloudOrange = el)}></div>
          <div className={css.stormCloudBrushSmallLeft} ref={el => el && (this.references.stormClouds.stormCloudBrushSmallLeft = el)}></div>
          <div className={css.stormCloudPointBig} ref={el => el && (this.references.stormClouds.stormCloudPointBig = el)}></div>
          <div className={css.stormCloudBrushBigRight} ref={el => el && (this.references.stormClouds.stormCloudBrushBigRight = el)}></div>
          <div className={css.stormCloudBrushBigLeft} ref={el => el && (this.references.stormClouds.stormCloudBrushBigLeft = el)}></div>
          <div className={css.stormCloudGrey} ref={el => el && (this.references.stormClouds.stormCloudGrey = el)}></div>
          <div className={css.stormCloudBlack} ref={el => el && (this.references.stormClouds.stormCloudBlack = el)}></div>
        </div>
      </div>
    )
  }
}
