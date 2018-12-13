import { TimelineMax } from 'gsap/all'

export default class Harbor {
  constructor(refs) {
    this.refs = refs
    this.initIntroTL()
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
        y: 100,
        onComplete: () => {
          this.initPendingTL()
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
        rotation: -45
      },
      {
        rotation: 45
      }
    )

    this.pendingTL.play()
  }
}
