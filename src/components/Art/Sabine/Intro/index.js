import { TimelineMax, TweenMax, Expo, Power1 } from 'gsap/all'
import TimelineController from 'components/Art/TimelineController'

import values from 'values'
import RAF from 'utils/raf'
import Emitter from 'utils/Emitter'

export default class Intro extends TimelineController {
  initTLs() {
    this.initBCRs()
    this.initIntroTL()
    this.initPendingTL()
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
    this.initCalleTL()
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
        autoAlpha: 1,
        onStart: () => {
          this.calleTL.play(0)
        }
      },
      0.2
    )

    this.introTL.to(
      this.refs.calle.component,
      2,
      {
        scale: 1.5,
        ease: Expo.easeIn
      },
      7
    )

    // Hide calle component
    this.introTL.to(
      this.refs.calle.component,
      1,
      {
        autoAlpha: 0,
        onComplete: () => this.calleTL.pause()
      },
      8
    )

    // -> Show statue component
    this.introTL.fromTo(
      this.refs.statue.component,
      1,
      {
        autoAlpha: 0,
        scale: 1
      },
      {
        autoAlpha: 1,
        scale: 1.15,
        onStart: () => {
          RAF.add(this.cottonsParallax)
        }
      },
      8
    )

    // Hide statue component
    this.introTL.to(
      this.refs.statue.component,
      1,
      {
        autoAlpha: 0,
        scale: 1,
        onComplete: () => {
          this.disableCottonsParallax()
        }
      },
      15
    )

    // -> Show ocean component
    this.introTL.to(
      this.refs.ocean.component,
      1,
      {
        autoAlpha: 1
      },
      15
    )

    // Animate boat to middle of the screen
    this.introTL.fromTo(
      this.refs.boat.component,
      4,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1,
        x: (values.viewport.width / 3) * 2 - this.BCRs.boat.width / 2,
        onStart: () => {
          this.oceanTL.play()
          this.oceanParallaxEnabled = true
          RAF.add(this.oceanParallax)
        }
      },
      12.2
    )
  }

  initCalleTL() {
    this.calleTL = new TimelineMax({ paused: true, repeat: -1, yoyo: true })

    this.calleTL.fromTo(
      this.refs.calle.ocean,
      2,
      {
        x: 40,
        z: 15,
        rotation: 1
      },
      {
        x: -40,
        z: 15,
        rotation: -1,
        repeat:3,
        yoyo:true,
        ease: Power1.easeInOut
      },
      0.5
    )

    this.calleTL.fromTo(
      this.refs.calle.ocean,
      2,
      {
        y: 15
      },
      {
        y: -15,
        ease: Power1.easeInOut
      },
      0
    )

    this.calleTL.fromTo(
      this.refs.calle.metalBox,
      3,
      {
        z: 10,
        x: -20,
        y: 0,
        rotation: -0.75
      },
      {
        z: 10,
        x: 20,
        y: -10,
        rotation: 0.75,
        repeat:2,
        yoyo:true,
        ease: Power1.easeInOut
      },
      0
    )

    const { component, ...clouds } = this.refs.calle.clouds
    this.calleTL.staggerFromTo(
      Object.values(clouds),
      4,
      { x: -50 },
      { x: 50, ease: Power1.easeInOut, repeat:2, yoyo: true },
      0.5,
      0
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

  initBoatTL() {
    this.wavesTL = new TimelineMax({
      paused: true,
      repeat: -1,
      yoyo: true
    })
    this.boatTL = new TimelineMax({
      paused: true,
      onStart: () => this.wavesTL.play(0)
    })

    this.wavesTL.fromTo(
      this.refs.boat.component,
      1,
      {
        y: -40,
        rotation: -2
      },
      {
        y: -25,
        rotation: 2
      }
    )

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
      onStart: () => {
        if (!this.oceanParallaxEnabled) {
          RAF.add(this.oceanParallax)
        }
      },
      onRepeat: () => {
        if (this.pauseOnPendingComplete !== false) {
          this.disableOceanParallax()
          this.wavesTL.restart()
          this.wavesTL.pause()
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
  }

  initOutTL() {
    this.initOceanTL()
    this.initBoatTL()

    this.outTL = new TimelineMax({
      repeat: -1,
      yoyo: true,
      onStart: () => {
        RAF.add(this.oceanParallax)
        this.oceanParallaxEnabled = true
        Emitter.on('resize', this.onOceanResize)
        this.wavesTL.play()
      },
      onPause: () => {
        this.wavesTL.restart()
        this.wavesTL.pause()
      }
    })

    this.outTL.fromTo(
      this.refs.cube,
      1,
      {
        rotation: 0
      },
      {
        rotation: 10
      }
    )

    TweenMax.set(this.refs.background, { backgroundColor: '#7392e0' })

    TweenMax.fromTo(
      this.refs.boat.component,
      2,
      {
        autoAlpha: 0,
        x: (values.viewport.width / 5) * 2 - this.BCRs.boat.width / 2
      },
      {
        autoAlpha: 1
      },
      0
    )

    TweenMax.to(
      this.refs.boat.component,
      5, {
        x: (values.viewport.width / 3) * 2 - this.BCRs.boat.width / 2
      },
      3
    )
  }

  cottonsParallax = () => {
    TweenMax.to(
      [this.refs.statue.cottons.one, this.refs.statue.cottons.three],
      1,
      {
        x: (values.mouse.x / values.viewport.width) * 80 - 60,
        y: (values.mouse.y / values.viewport.height) * 80 - 60
      }
    )
    TweenMax.to(
      [this.refs.statue.cottons.four, this.refs.statue.cottons.five],
      1,
      {
        x: '+' + (values.mouse.x / values.viewport.width) * 80 - 20
      }
    )
    TweenMax.to(
      [this.refs.statue.cottons.six, this.refs.statue.cottons.seven],
      1,
      {
        x: -(values.mouse.x / values.viewport.width) * 80 + 60,
        y: -(values.mouse.y / values.viewport.height) * 80 + 60
      }
    )
  }

  disableCottonsParallax = () => {
    RAF.remove(this.cottonsParallax)
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
    this.oceanParallaxEnabled = false
    RAF.remove(this.oceanParallax)
  }

  onOceanResize = () => {
    this.BCRs.boat = this.refs.boat.component.getBoundingClientRect()
    const { component, ...waves } = this.refs.ocean.waves
    TweenMax.to(Object.values(waves), 1, { x: 0, y: 0 })
    TweenMax.set(this.refs.boat.component, {
      x: (values.viewport.width / 3) * 2 - this.BCRs.boat.width / 2
    })
    this.initOceanTL()
  }
}
