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
          <div className={css.stromCloudBrushSmallRight} ref={el => el && (this.references.stormClouds.stromCloudBrushSmallRight = el)}></div>
          <div className={css.stromCloudPointSmall} ref={el => el && (this.references.stormClouds.stromCloudPointSmall = el)}></div>
          <div className={css.stromCloudOrange} ref={el => el && (this.references.stormClouds.stromCloudOrange = el)}></div>
          <div className={css.stromCloudBrushSmallLeft} ref={el => el && (this.references.stormClouds.stromCloudBrushSmallLeft = el)}></div>
          <div className={css.stromCloudPointBig} ref={el => el && (this.references.stormClouds.stromCloudPointBig = el)}></div>
          <div className={css.stromCloudBrushBigRight} ref={el => el && (this.references.stormClouds.stromCloudBrushBigRight = el)}></div>
          <div className={css.stromCloudBrushBigLeft} ref={el => el && (this.references.stormClouds.stromCloudBrushBigLeft = el)}></div>
          <div className={css.stromCloudGrey} ref={el => el && (this.references.stormClouds.stromCloudGrey = el)}></div>
          <div className={css.stromCloudBlack} ref={el => el && (this.references.stormClouds.stromCloudBlack = el)}></div>
        </div>
      </div>
    )
  }
}
