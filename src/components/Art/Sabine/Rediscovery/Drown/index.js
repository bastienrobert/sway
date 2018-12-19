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

    // Set background color
    this.introTL.to(this.refs.background, 1, { backgroundColor: '#021b66' }, 0)

    // -> Hide storm crash component
    this.introTL.to(
      this.refs.storm.crash.component,
      1,
      {
        autoAlpha: 0
      },
      0
    )

    // -> Show blueSea component
    this.introTL.fromTo(
      this.refs.drown.blueSea.component,
      1,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1
      },
      0
    )

    // Hide blueSea component
    this.introTL.to(
      this.refs.drown.blueSea.component,
      1,
      {
        autoAlpha: 0
      },
      5
    )

    // -> Show drowning component
    this.introTL.fromTo(
      this.refs.drown.drowning.component,
      1,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1
      },
      5
    )

    // this.introTL.fromTo(
    //   this.refs.storm.crash,
    //   1,
    //   {
    //     autoAlpha: 0
    //   },
    //   {
    //     autoAlpha: 1
    //   }
    // )

    // CUBE - NEED TO BE DELETED
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
