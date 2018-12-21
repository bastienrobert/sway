import { TimelineMax } from 'gsap/all'
import TimelineController from 'components/Art/TimelineController'

export default class Outro extends TimelineController {
  initTLs() {
    this.initIntroTL()

    this.tls.push({
      introTL: this.introTL
    })
  }

  initIntroTL() {
    this.introTL = new TimelineMax({
      paused: true
    })

    this.introTL.to(
      this.refs.drown.drowning.component,
      1,
      {
        autoAlpha: 0
      },
      0
    )

    this.introTL.fromTo(
      this.refs.outro,
      1,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1,
        onStart: () => {
          this.refs.outro.play()
        }
      },
      0
    )
  }
}
