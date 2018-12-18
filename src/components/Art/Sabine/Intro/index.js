import { TimelineMax, TweenMax } from 'gsap/all'
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
    this.initOceanTL()

    this.introTL = new TimelineMax({
      paused: true,
      onComplete: () => {
        this.pendingTL.play()
        this.introIsOver()
      }
    })

    this.introTL.to(this.refs.ocean.component, 1, {
      autoAlpha: 0
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

    this.introTL.add(this.oceanTL)
  }

  initOceanTL() {
    this.oceanTL = new TimelineMax()

    // ALL THE OCEAN TIMELINE
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
    this.initOceanTL()

    this.outTL = new TimelineMax({ repeat: -1, yoyo: true })

    TweenMax.set(this.refs.background, { backgroundColor: '#7392e0' })

    this.outTL.add(this.oceanTL, 0)

    this.outTL.fromTo(
      this.refs.cube,
      1,
      { scale: 0.9 },
      { scale: 1.1, rotation: 0 }
    )
  }
}
