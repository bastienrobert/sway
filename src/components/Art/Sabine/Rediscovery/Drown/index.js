import { TimelineMax, TweenMax, Expo } from 'gsap/all'
import values from 'values'
import RAF from 'utils/raf'

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
      onStart: () => {
        RAF.add(this.drowningParallax)
      },
      onComplete: () => {
        this.introIsOver()
        this.disableDrowningParallax()
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

    this.introTL.fromTo(
      [
        this.refs.drown.blueSea.secondPointBlue,
        this.refs.drown.blueSea.secondDarkBlue,
        this.refs.drown.blueSea.secondDarkerBlue,
        this.refs.drown.blueSea.secondBlue
      ],
      1,
      {
        autoAlpha: 1
      },
      {
        repeat: 4,
        yoyo: true,
        autoAlpha: 0,
        ease: Expo.InOut
      },
      2
    )

    // Hide blueSea component
    this.introTL.to(
      this.refs.drown.blueSea.component,
      3,
      {
        autoAlpha: 0
      },
      6
    )

    // Show drowning component
    this.introTL.fromTo(
      this.refs.drown.drowning.component,
      5,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1,
        onComplete: () => {}
      },
      8
    )

    // Transition to scene 2
    this.introTL.to(
      this.refs.drown.drowning.component,
      4,
      {
        z: 50,
        x: -380,
        y: 220,
        ease: Expo.easeInOut
      },
      14
    )

    this.introTL.to(
      [this.refs.drown.drowning.voileOne, this.refs.drown.drowning.voileTwo],
      2,
      {
        y: -600
      },
      14
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

  drowningParallax = () => {
    TweenMax.to(
      [
        this.refs.drown.drowning.boisAP,
        this.refs.drown.drowning.boisGauchePPOne,
        this.refs.drown.drowning.boisRouge
      ],
      0.5,
      {
        xPercent: '-' + (values.mouse.x / values.viewport.width) * 8,
        yPercent: '+' + (values.mouse.y / values.viewport.height) * 8
      }
    )
    TweenMax.to(this.refs.drown.drowning.mask, 0.5, {
      xPercent: '+' + (values.mouse.x / values.viewport.width) * 10,
      yPercent: '-' + (values.mouse.y / values.viewport.height) * 5
    })
    TweenMax.to(
      [this.refs.drown.drowning.voileOne, this.refs.drown.drowning.voileTwo],
      0.5,
      {
        xPercent: '+' + (values.mouse.x / values.viewport.width) * 5,
        yPercent: '+' + (values.mouse.y / values.viewport.height) * 8
      }
    )
    TweenMax.to(
      [
        this.refs.drown.drowning.boisGauchePPTwo,
        this.refs.drown.drowning.boisGaucheAP
      ],
      0.5,
      {
        xPercent: '-' + (values.mouse.x / values.viewport.width) * 8,
        yPercent: '+' + (values.mouse.y / values.viewport.height) * 4
      }
    )
  }

  disableDrowningParallax = () => {
    RAF.remove(this.drowningParallax)
  }
}
