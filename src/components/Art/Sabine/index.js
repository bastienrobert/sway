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
        <div className={css.stormClouds}>
          <div className={css.stromCloudBrushSmallRight} ref="stromCloudBrushSmallRight"></div>
          <div className={css.stromCloudPointSmall} ref="stromCloudPointSmall"></div>
          <div className={css.stromCloudOrange} ref="stromCloudOrange"></div>
          <div className={css.stromCloudBrushSmallLeft} ref="stromCloudBrushSmallLeft"></div>
          <div className={css.stromCloudPointBig} ref="stromCloudPointBig"></div>
          <div className={css.stromCloudBrushBigRight} ref="stromCloudBrushBigRight"></div>
          <div className={css.stromCloudBrushBigLeft} ref="stromCloudBrushBigLeft"></div>
          <div className={css.stromCloudGrey} ref="stromCloudGrey"></div>
          <div className={css.stromCloudBlack} ref="stromCloudBlack"></div>
        </div>
      </div>
    )
  }
}
