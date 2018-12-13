/**
 * INTRODUCTION
 */

import { TimelineMax } from 'gsap/all'

export default class Intro {
  constructor(refs, introIsOver, pendingIsOver) {
    this.refs = refs
    this.introIsOver = introIsOver
    this.pendingIsOver = pendingIsOver
    this.pauseOnPendingComplete = false
    this.initIntroTL()
  }

  play() {
    this.introTL.play()
  }

  initIntroTL() {
    this.introTL = new TimelineMax({ paused: true })

    this.introTL.fromTo(
      this.refs.cube,
      2,
      {
        x: 0
      },
      {
        x: 100,
        onComplete: () => {
          this.initPendingTL()
          this.introIsOver()
        }
      }
    )
  }

  initPendingTL() {
    this.pendingTL = new TimelineMax({ repeat: -1, yoyo: true })

    this.pendingTL.fromTo(
      this.refs.cube,
      2,
      {
        rotation: 0
      },
      {
        rotation: 90,
        onReverseComplete: () => {
          if (this.pauseOnPendingComplete) {
            this.pendingTL.pause()
            this.pendingIsOver()
          }
        },
        onComplete: () => {
          if (this.pauseOnPendingComplete) {
            this.pendingTL.pause()
            this.pendingIsOver()
          }
        }
      }
    )

    this.pendingTL.play()
  }
}
