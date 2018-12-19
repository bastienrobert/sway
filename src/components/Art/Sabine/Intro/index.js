import { TimelineMax, TweenMax, Expo } from 'gsap/all'
import TimelineController from 'components/Art/TimelineController'

import values from 'values'
import RAF from 'utils/raf'
import Emitter from 'utils/Emitter'

export default class Intro extends TimelineController {
  initTLs() {
    this.initBCRs()
    this.initIntroTL()
    this.initPendingTL()
    this.initBoatTL()
    this.initOutTL()

    this.tls.push({
      outTL: this.outTL,
      introTL: this.introTL,
      pendingTL: this.pendingTL
    })
  }

  initBCRs() {
    this.BCRs = {}
    this.BCRs.boat = this.refs.boat.component.getBoundingClientRect()
  }

  initIntroTL() {
    this.initOceanTL()

    this.introTL = new TimelineMax({
      paused: true,
      onStart: () => {
        this.disableOceanParallax()
      },
      onComplete: () => {
        this.pendingTL.play()
        this.introIsOver()
      }
    })

    // Hide ocean and boat on game start
    this.introTL.to([this.refs.ocean.component, this.refs.boat.component], 1, {
      autoAlpha: 0
    })

    // -> Show calle component
    this.introTL.fromTo(
      this.refs.calle.component,
      1,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1
      },
      0
    )

    // Hide calle component
    this.introTL.to(
      this.refs.calle.component,
      1,
      {
        autoAlpha: 0
      },
      2
    )

    // -> Show statue component
    this.introTL.fromTo(
      this.refs.statue.component,
      1,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1
      },
      2
    )

    // Hide statue component
    this.introTL.to(
      this.refs.statue.component,
      1,
      {
        autoAlpha: 0
      },
      4
    )

    // -> Show ocean component
    this.introTL.to(
      this.refs.ocean.component,
      1,
      {
        autoAlpha: 1
      },
      4
    )

    // Animate boat to middle of the screen
    this.introTL.fromTo(
      this.refs.boat.component,
      4,
      {
        autoAlpha: 0,
        x: -100
      },
      {
        autoAlpha: 1,
        x: (values.viewport.width / 3) * 2 - this.BCRs.boat.width / 2,
        onStart: () => {
          this.oceanTL.play()
          RAF.add(this.oceanParallax)
        }
      }
    )

    // CUBE - NEED TO BE DELETE
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
  }

  initOceanTL() {
    this.oceanTL = new TimelineMax({ repeat: -1 })

    this.oceanTL.fromTo(
      this.refs.ocean.clouds.dark,
      60,
      {
        x: values.viewport.width + 100
      },
      {
        x: -800
      },
      0
    )
    this.oceanTL.fromTo(
      this.refs.ocean.clouds.double,
      50,
      {
        x: values.viewport.width
      },
      {
        x: -800
      },
      0
    )
    this.oceanTL.fromTo(
      this.refs.ocean.clouds.single,
      55,
      {
        x: values.viewport.width + 200
      },
      {
        x: -800
      },
      0
    )
  }

  onOceanResize = () => {
    this.BCRs.boat = this.refs.boat.component.getBoundingClientRect()
    TweenMax.set(this.refs.boat.component, {
      x: (values.viewport.width / 3) * 2 - this.BCRs.boat.width / 2
    })
    this.initOceanTL()
  }

  initBoatTL() {
    this.boatTL = new TimelineMax({ paused: true })

    this.boatTL.fromTo(
      this.refs.boat.component,
      2,
      { autoAlpha: 0, x: -100 },
      { autoAlpha: 1 }
    )

    this.boatTL.to(
      this.refs.boat.component,
      10,
      {
        x: (values.viewport.width / 3) * 2 - this.BCRs.boat.width / 2,
        ease: Expo.easeOut
      },
      1
    )
  }

  initPendingTL() {
    this.pendingTL = new TimelineMax({
      paused: true,
      repeat: -1,
      yoyo: true,
      onRepeat: () => {
        if (this.pauseOnPendingComplete !== false) {
          this.disableOceanParallax()
          Emitter.off('resize', this.onOceanResize)
          this.pendingTL.pause()
          this.pendingIsOver()
        }
      }
    })

    this.pendingTL.to(this.refs.boat.component, 1, {
      autoAlpha: 1,
      x: (values.viewport.width / 3) * 2 - this.BCRs.boat.width / 2
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

    this.outTL = new TimelineMax({
      paused: true,
      repeat: -1,
      yoyo: true,
      onStart: () => {
        this.oceanTL.play()
        this.boatTL.play()
        RAF.add(this.oceanParallax)
        Emitter.on('resize', this.onOceanResize)
      },
      onPause: () => {
        this.oceanTL.restart()
        this.oceanTL.pause()
      }
    })

    TweenMax.set(this.refs.background, { backgroundColor: '#7392e0' })

    this.outTL.fromTo(
      this.refs.cube,
      1,
      { scale: 0.9 },
      { scale: 1.1, rotation: 0 }
    )
  }

  oceanParallax = () => {
    TweenMax.to(this.refs.ocean.waves.big, 1, {
      x: (values.mouse.x / values.viewport.width) * 60 - 30,
      y: (values.mouse.y / values.viewport.height) * 60 - 30
    })
    TweenMax.to(this.refs.ocean.waves.leftDark, 1, {
      x: (values.mouse.x / values.viewport.width) * 60 - 30,
      y: (values.mouse.y / values.viewport.height) * 60 - 30
    })
    TweenMax.to(this.refs.ocean.waves.leftLight, 1, {
      x: (values.mouse.x / values.viewport.width) * 20 - 10,
      y: (values.mouse.y / values.viewport.height) * 20 - 10
    })
    TweenMax.to(this.refs.ocean.waves.rightLight, 1, {
      x: (values.mouse.x / values.viewport.width) * 20 - 10,
      y: (values.mouse.y / values.viewport.height) * 20 - 10
    })
  }

  disableOceanParallax = () => {
    RAF.remove(this.oceanParallax)
  }
}
