import React from 'react'
import Oeuvre from '../Oeuvre'

import timelines from './timelines'
import elements from './elements'

import css from './styles.scss'

export default class Sabine extends Oeuvre {
  timelines = timelines
  elements = elements

  render() {
    this.references.stormClouds = {}
    this.references.stormLightnings = {}
    this.references.stormOcean = {}
    this.references.ocean = {}
    this.references.boat = {}

    return (
      <div className={css.Sabine} ref="component">
        <div ref="background" className={css.background} />
        {/* <div ref="backgroundImage" className={css.backgroundImage} /> */}
        <div
          className={css.ocean}
          ref={el => el && (this.references.ocean.component = el)}>
          <div className={css.oceanFog} />
          <div className={css.oceanClouds}>
            <div className={css.oceanCloudDark} />
            <div className={css.oceanCloudDouble} />
            <div className={css.oceanCloudSingle} />
          </div>
          <div className={css.oceanWaves}>
            <div className={css.oceanWaveBig} />
            <div className={css.oceanWaveLeftClear} />
            <div className={css.oceanWaveLeftDark} />
            <div className={css.oceanWaveLeftTransparent} />
            <div className={css.oceanWaveRightClear} />
            <div className={css.oceanWaveRightTransparent} />
          </div>
        </div>
        <div
          className={css.stormClouds}
          ref={el => el && (this.references.stormClouds.component = el)}>
          <div
            className={css.stormLightningLeft}
            ref={el =>
              el && (this.references.stormLightnings.stormLightningLeft = el)
            }
          />
          <div
            className={css.stormLightningMiddleLeft}
            ref={el =>
              el &&
              (this.references.stormLightnings.stormLightningMiddleLeft = el)
            }
          />
          <div
            className={css.stormLightningMiddleRight}
            ref={el =>
              el &&
              (this.references.stormLightnings.stormLightningMiddleRight = el)
            }
          />
          <div
            className={css.stormLightningRight}
            ref={el =>
              el && (this.references.stormLightnings.stormLightningRight = el)
            }
          />
          <div
            className={css.stormCloudBrushSmallRight}
            ref={el =>
              el && (this.references.stormClouds.stormCloudBrushSmallRight = el)
            }
          />
          <div
            className={css.stormCloudPointSmall}
            ref={el =>
              el && (this.references.stormClouds.stormCloudPointSmall = el)
            }
          />
          <div
            className={css.stormCloudOrange}
            ref={el =>
              el && (this.references.stormClouds.stormCloudOrange = el)
            }
          />
          <div
            className={css.stormCloudBrushSmallLeft}
            ref={el =>
              el && (this.references.stormClouds.stormCloudBrushSmallLeft = el)
            }
          />
          <div
            className={css.stormCloudPointBig}
            ref={el =>
              el && (this.references.stormClouds.stormCloudPointBig = el)
            }
          />
          <div
            className={css.stormCloudBrushBigRight}
            ref={el =>
              el && (this.references.stormClouds.stormCloudBrushBigRight = el)
            }
          />
          <div
            className={css.stormCloudBrushBigLeft}
            ref={el =>
              el && (this.references.stormClouds.stormCloudBrushBigLeft = el)
            }
          />
          <div
            className={css.stormCloudGrey}
            ref={el => el && (this.references.stormClouds.stormCloudGrey = el)}
          />
          <div
            className={css.stormCloudBlack}
            ref={el => el && (this.references.stormClouds.stormCloudBlack = el)}
          />
        </div>
        <div ref="cube" className={css.cube} />
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
