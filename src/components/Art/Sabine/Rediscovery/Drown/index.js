import { TimelineMax } from 'gsap/all'

export default class Drown {
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
      onComplete: () => {
        this.introIsOver()
        this.pendingTL.play()
      }
    })

    this.introTL.to(this.refs.storm.component, 1, {
      autoAlpha: 0
    })

    this.introTL.to(this.refs.boat.component, 1, {
      autoAlpha: 0
    })

    this.introTL.to(this.refs.cube, 2, {
      x: -50
    })
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
        scale: 1
      },
      {
        scale: 0.7
      }
    )
  }
}
