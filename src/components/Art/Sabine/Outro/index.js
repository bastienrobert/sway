import { TimelineMax } from 'gsap/all'
import TimelineController from 'components/Art/TimelineController'

export default class Outro extends TimelineController {
  initTLs() {
    this.initIntroTL()
    this.initPendingTL()

    this.tls.push({
      introTL: this.introTL,
      pendingTL: this.pendingTL
    })
  }

  initIntroTL() {
    this.introTL = new TimelineMax({ paused: true })

    this.introTL.to(this.refs.cube, 2, {
      x: 100,
      onComplete: () => {
        this.pendingTL.play()
      }
    })
  }

  initPendingTL() {
    this.pendingTL = new TimelineMax({ paused: true, repeat: -1, yoyo: true })

    this.pendingTL.to(this.refs.cube, 2, {
      rotation: 90
    })
  }
}
