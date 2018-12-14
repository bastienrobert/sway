import { TimelineMax } from 'gsap/all'

export default class Decapitation {
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

    this.introTL.fromTo(
      this.refs.cube,
      2,
      {
        y: 0
      },
      {
        y: -100,
        onComplete: () => {
          this.introIsOver()
          this.pendingTL.play()
        }
      }
    )
  }

  initPendingTL() {
    this.pendingTL = new TimelineMax({ paused: true, repeat: -1, yoyo: true })

    this.pendingTL.fromTo(
      this.refs.cube,
      2,
      {
        rotation: 0
      },
      {
        rotation: 45,
        onComplete: () => {
          if (this.pauseOnPendingComplete !== false) {
            this.pendingTL.pause()
            this.pendingIsOver()
          }
        },
        onReverseComplete: () => {
          if (this.pauseOnPendingComplete !== false) {
            this.pendingTL.pause()
            this.pendingIsOver()
          }
        }
      }
    )
  }
}
