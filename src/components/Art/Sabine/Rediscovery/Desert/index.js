import { TimelineMax } from 'gsap/all'

export default class Desert {
  constructor(refs, introIsOver, pendingIsOver) {
    this.refs = refs
    this.introIsOver = introIsOver
    this.pendingIsOver = pendingIsOver
    this.pauseOnPendingComplete = false
    this.initIntroTL()
    this.initPendingTL()
  }

  initIntroTL() {
    this.introTL = new TimelineMax({
      paused: true,
      onStart: () => {
        this.refs.poc.desert.play()
      }
    })

    this.introTL.fromTo(
      this.refs.poc.desert,
      1,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1
      }
    )
  }

  initPendingTL() {
    this.pendingTL = new TimelineMax({ paused: true })
  }
}
