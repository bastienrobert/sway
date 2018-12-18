import React from 'react'
import Oeuvre from '../Oeuvre'

import timelines from './timelines.js'

import css from './styles.scss'

export default class Sabine extends Oeuvre {
  timelines = timelines

  render() {
    this.references.stormClouds = {}
    this.references.stormLightnings = {}
    this.references.stormOcean = {}
    this.references.boat = {}

    return (
      <div className={css.Sabine} ref="component">
        <div ref="background" className={css.background} />
        <div ref="backgroundImage" className={css.backgroundImage} />
        <div ref="cube" className={css.cube} />
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
              el && (this.references.stormLightnings.stormLightningMiddleLeft = el)
            }
          />
          <div 
            className={css.stormLightningMiddleRight} 
            ref={el =>
              el && (this.references.stormLightnings.stormLightningMiddleRight = el)
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
