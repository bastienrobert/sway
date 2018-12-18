import { TimelineMax } from 'gsap/all'
import TimelineController from 'components/Art/TimelineController'

export default class Intro extends TimelineController {
  initTLs() {
    this.initIntroTL()
    this.initPendingTL()
    this.initOutTL()

    this.tls.push({
      outTL: this.outTL,
      introTL: this.introTL,
      pendingTL: this.pendingTL
    })
  }

  initIntroTL() {
    this.introTL = new TimelineMax({
      paused: true,
      onComplete: () => {
        this.pendingTL.play()
        this.introIsOver()
      }
    })

    this.introTL.fromTo(
      this.refs.cube,
      2,
      {
        x: 0
      },
      {
        scale: 1,
        x: 100
      }
    )
  }

  initPendingTL() {
    this.pendingTL = new TimelineMax({
      paused: true,
      repeat: -1,
      yoyo: true,
      onRepeat: () => {
        if (this.pauseOnPendingComplete !== false) {
          this.pendingTL.pause()
          this.pendingIsOver()
        }
      }
    })

    this.pendingTL.fromTo(
      this.refs.cube,
      2,
      {
        rotation: 0
      },
      {
        rotation: 90
      }
    )
  }

  initOutTL() {
    this.outTL = new TimelineMax({ paused: true, repeat: -1, yoyo: true })

    this.outTL.fromTo(
      this.refs.cube,
      1,
      { scale: 0.9 },
      { scale: 1.1, rotation: 0 }
    )
  }
}
