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
    this.introTL = new TimelineMax({ paused: true })

    this.introTL.to(this.refs.cube, 2, {
      x: -50,
      onComplete: () => {
        this.introIsOver()
        this.pendingTL.play()
      }
    })
  }

  initPendingTL() {
    this.pendingTL = new TimelineMax({ paused: true, repeat: -1, yoyo: true })

    this.pendingTL.fromTo(
      this.refs.cube,
      2,
      {
        scale: 1
      },
      {
        scale: 0.7,
        onComplete: () => {
          if (this.pauseOnPendingComplete) {
            this.pendingTL.pause()
            this.pendingIsOver()
          }
        },
        onReverseComplete: () => {
          if (this.pauseOnPendingComplete) {
            this.pendingTL.pause()
            this.pendingIsOver()
          }
        }
      }
    )
  }
}
