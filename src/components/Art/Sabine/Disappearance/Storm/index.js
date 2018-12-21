import { TimelineMax, TweenMax, Expo } from 'gsap/all'

import Emitter from 'utils/Emitter'
import values from 'values'
import RAF from 'utils/raf'

export default class Storm {
  constructor(refs, introIsOver, pendingIsOver) {
    this.refs = refs
    this.introIsOver = introIsOver
    this.pendingIsOver = pendingIsOver
    this.pauseOnPendingComplete = false
    this.initIntroTL()
    this.initPendingTL()
  }

  initIntroTL() {
    this.initWaveIntroTL()
    this.initOceanTL()
    this.initFlashesTL()
    this.initCloudTL()
    this.initLightningTL()

    this.introTL = new TimelineMax({
      paused: true,
      onStart: () => {
        Emitter.on('resize', this.onResize)
        RAF.add(this.cloudParallax)
        RAF.add(this.lightningParallax)
        RAF.add(this.oceanParallax)
        !this.oceanTL.isActive() && this.oceanTL.restart()
        !this.cloudTL.isActive() && this.cloudTL.restart()
        !this.lightningTL.isActive() && this.lightningTL.restart()
        !this.flashesTL.isActive() && this.flashesTL.restart()
      },
      onComplete: () => {
        Emitter.off('resize', this.onResize)
        this.disableOceanParallax()
        this.disableCloudParallax()
        this.disableLightningParallax()
        this.cloudTL.pause()
        this.oceanTL.pause()
        this.pendingTL.pause()
        this.lightningTL.pause()
        this.flashesTL.pause()
        this.introIsOver()

        this.pendingTL.play()
      }
    })

    // Waves are going underground
    this.introTL.to(
      this.refs.ocean.waves.component,
      1,
      {
        autoAlpha: 0
      },
      0.5
    )

    this.introTL.to(this.refs.boat.component, 1, { rotation: -4, y: -10 }, 0)

    // -> Hide ocean component
    this.introTL.to(
      this.refs.ocean.component,
      1,
      {
        autoAlpha: 0
      },
      0.5
    )

    // -> Set background color and clouds background color for mixBlendMode
    this.introTL.to(
      [this.refs.background, this.refs.storm.breakbot.clouds.component],
      4,
      { backgroundColor: '#551300' },
      0
    )

    // -> Show clouds component
    this.introTL.fromTo(
      this.refs.storm.breakbot.clouds.component,
      4,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        ease: Expo.easeInOut
      },
      0
    )
    this.introTL.fromTo(
      this.refs.storm.breakbot.lightnings.component,
      2,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1
      },
      2
    )

    // -> Boat animation to go to the middle of the screen
    const boatBCR = this.refs.boat.component.getBoundingClientRect()

    this.introTL.to(
      this.refs.boat.component,
      2,
      {
        autoAlpha: 1,
        onStart: () => this.wavesTL.play(0)
      },
      0.5
    )
    this.introTL.to(
      this.refs.boat.component,
      10,
      {
        x: (values.viewport.width / 10) * 8 - boatBCR.width / 2,
        ease: Expo.easeInOut
      },
      1
    )

    // -> Show storm ocean
    this.introTL.fromTo(
      this.refs.storm.breakbot.ocean.component,
      2,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease: Expo.easeInOut },
      0
    )

    this.introTL.to(
      this.refs.boat.component,
      5,
      {
        rotation: -60,
        y: 400
      },
      8
    )
    this.introTL.to(
      this.refs.boat.matt,
      6,
      {
        rotation: 45,
        y: 400,
        x: 100
      },
      8
    )

    // -> Hide breakbot component
    this.introTL.to(
      this.refs.storm.breakbot.component,
      1,
      {
        autoAlpha: 0
      },
      11
    )

    // -> Hide boat component
    this.introTL.to(
      this.refs.boat.component,
      1,
      {
        autoAlpha: 0,
        onComplete: () => this.wavesTL.pause()
      },
      11
    )

    // -> Set background color
    this.introTL.to(
      this.refs.background,
      1,
      {
        backgroundColor: '#545453'
      },
      11
    )

    // -> Show crash component
    this.introTL.fromTo(
      this.refs.storm.crash.component,
      1,
      { autoAlpha: 0 },
      { autoAlpha: 1 },
      11
    )
  }

  initWaveIntroTL() {
    this.wavesTL = new TimelineMax({
      paused: true,
      repeat: -1,
      yoyo: true
    })

    this.wavesTL.fromTo(
      this.refs.boat.component,
      1,
      {
        y: -10,
        rotation: -4
      },
      {
        y: 10,
        rotation: 4
      }
    )
  }

  initOceanTL() {
    this.oceanTL = new TimelineMax({ paused: true, repeat: -1, yoyo: true })

    this.oceanTL.fromTo(
      [
        this.refs.storm.breakbot.ocean.background,
        this.refs.storm.breakbot.ocean.highlight
      ],
      2,
      {
        x: -10,
        y: 5,
        z: 10
      },
      {
        x: 10,
        y: 0,
        z: 10
      }
    )
  }

  initPendingTL() {
    this.initSeaLight()

    this.pendingTL = new TimelineMax({
      paused: true,
      repeat: -1,
      yoyo: true,
      onStart: () => {
        RAF.add(this.floattingParallax)
        !this.seaLightTL.isActive() && this.seaLightTL.restart()
      },
      onRepeat: () => {
        if (this.pauseOnPendingComplete !== false) {
          this.disableFloattingParallax()
          this.seaLightTL.pause()
          this.pendingIsOver()
        }
      }
    })

    this.pendingTL.fromTo(
      this.refs.cube,
      2,
      { rotation: 0 },
      { rotation: 45 },
      0
    )
  }

  oceanParallax = () => {
    TweenMax.to(this.refs.storm.breakbot.ocean.overlay, 0.5, {
      x: (values.mouse.x / values.viewport.width) * 30 - 15,
      y: (values.mouse.y / values.viewport.height) * 20 - 10,
      z: 10
    })
  }

  cloudParallax = () => {
    TweenMax.to(this.refs.storm.breakbot.clouds.brushSmallRight, 0.5, {
      x: -(values.mouse.x / values.viewport.width) * 20,
      y: (values.mouse.y / values.viewport.height) * 10
    })
    TweenMax.to(this.refs.storm.breakbot.clouds.pointBig, 0.5, {
      x: (values.mouse.x / values.viewport.width) * 20,
      y: (values.mouse.y / values.viewport.height) * 10
    })
    TweenMax.to(this.refs.storm.breakbot.clouds.brushSmallLeft, 0.5, {
      x: (values.mouse.x / values.viewport.width) * 20,
      y: -(values.mouse.y / values.viewport.height) * 10
    })
    TweenMax.to(this.refs.storm.breakbot.clouds.black, 0.5, {
      x: (values.mouse.x / values.viewport.width) * 20,
      y: -(values.mouse.y / values.viewport.height) * 10
    })
  }

  lightningParallax = () => {
    TweenMax.to(this.refs.storm.breakbot.lightnings.left, 0.5, {
      x: -(values.mouse.x / values.viewport.width) * 20,
      y: (values.mouse.y / values.viewport.height) * 10
    })
    TweenMax.to(this.refs.storm.breakbot.lightnings.middleLeft, 0.5, {
      x: (values.mouse.x / values.viewport.width) * 20,
      y: -(values.mouse.y / values.viewport.height) * 10
    })
    TweenMax.to(this.refs.storm.breakbot.lightnings.middleRight, 0.5, {
      x: (values.mouse.x / values.viewport.width) * 20,
      y: (values.mouse.y / values.viewport.height) * 10
    })
  }

  floattingParallax = () => {
    TweenMax.to(this.refs.storm.crash.floatting.woodThree, 0.5, {
      xPercent: '+' + (values.mouse.x / values.viewport.width) * 4,
      yPercent: '-' + (values.mouse.y / values.viewport.height) * 6
    })
    TweenMax.to(
      [
        this.refs.storm.crash.floatting.woodOne,
        this.refs.storm.crash.floatting.woodTwo
      ],
      0.5,
      {
        xPercent: '-' + (values.mouse.x / values.viewport.width) * 4,
        yPercent: '+' + (values.mouse.y / values.viewport.height) * 8
      }
    )
    TweenMax.to(
      [
        this.refs.storm.crash.floatting.sailOne,
        this.refs.storm.crash.floatting.boatOne
      ],
      0.5,
      {
        xPercent: '+' + (values.mouse.x / values.viewport.width) * 2,
        yPercent: '+' + (values.mouse.y / values.viewport.height) * 4
      }
    )
    TweenMax.to(this.refs.storm.crash.floatting.sailTwo, 0.5, {
      xPercent: '+' + (values.mouse.x / values.viewport.width) * 2,
      yPercent: '-' + (values.mouse.y / values.viewport.height) * 4
    })
  }

  initCloudTL() {
    this.cloudTL = new TimelineMax({
      paused: true,
      repeat: -1,
      yoyo: true
    })
    this.cloudTL.fromTo(
      this.refs.storm.breakbot.clouds.pointSmall,
      5,
      {
        x: -40,
        y: 0
      },
      {
        x: 20,
        y: 0
      },
      0
    )
    this.cloudTL.fromTo(
      this.refs.storm.breakbot.clouds.orange,
      5,
      {
        x: 20,
        y: 0
      },
      {
        x: -30,
        y: 0
      },
      0
    )
    this.cloudTL.fromTo(
      this.refs.storm.breakbot.clouds.grey,
      5,
      {
        x: -30,
        y: 0
      },
      {
        x: -20,
        y: 0
      },
      0
    )
    this.cloudTL.fromTo(
      this.refs.storm.breakbot.clouds.brushBigRight,
      5,
      {
        x: 30,
        y: 0
      },
      {
        x: -30,
        y: 0
      },
      0
    )
    this.cloudTL.fromTo(
      this.refs.storm.breakbot.clouds.brushBigLeft,
      4,
      { x: -40, y: 0 },
      { x: 20, y: 0 },
      0
    )
  }

  initLightningTL() {
    this.lightningTL = new TimelineMax({
      paused: true,
      repeat: -1,
      yoyo: true
    })
    this.lightningTL.fromTo(
      this.refs.storm.breakbot.lightnings.right,
      5,
      { x: -40, y: 0 },
      { x: 20, y: 0 },
      0
    )
  }

  initFlashesTL() {
    this.flashesTL = new TimelineMax({
      paused: true,
      repeat: -1,
      yoyo: true
    })
    this.flashesTL.fromTo(
      this.refs.storm.breakbot.ocean.highlight,
      0.3,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1
      },
      0
    )
    this.flashesTL.fromTo(
      this.refs.storm.breakbot.lightnings.left,
      0.3,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1
      },
      0
    )
    this.flashesTL.fromTo(
      this.refs.storm.breakbot.lightnings.right,
      0.3,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1
      },
      0
    )
    this.flashesTL.fromTo(
      this.refs.storm.breakbot.lightnings.middleLeft,
      0.3,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1
      },
      0
    )
    this.flashesTL.fromTo(
      this.refs.storm.breakbot.lightnings.middleRight,
      0.3,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1
      },
      0
    )
  }

  initSeaLight() {
    this.seaLightTL = new TimelineMax({
      paused: true,
      repeat: -1,
      yoyo: true
    })
    this.seaLightTL.fromTo(
      this.refs.storm.crash.redSea.flashGrey,
      0.2,
      {
        opacity: 1
      },
      {
        opacity: 0,
        ease: Expo.InOut
      },
      0
    )
    this.seaLightTL.fromTo(
      this.refs.storm.crash.redSea.flashRedDark,
      0.2,
      {
        opacity: 0
      },
      {
        opacity: 1,
        ease: Expo.InOut
      },
      0.1
    )
    this.seaLightTL.fromTo(
      this.refs.storm.crash.redSea.flashRedLight,
      0.2,
      {
        opacity: 0
      },
      {
        opacity: 1,
        ease: Expo.InOut
      },
      0.2
    )
  }

  disableOceanParallax = () => {
    RAF.remove(this.oceanParallax)
    TweenMax.to(this.refs.storm.breakbot.ocean.overlay, 0.5, {
      x: 0,
      y: 0
    })
  }

  disableCloudParallax = () => {
    RAF.remove(this.cloudParallax)
    const { component, ...clouds } = this.refs.storm.breakbot.clouds
    TweenMax.to(
      clouds,
      0.5,
      {
        x: 0,
        y: 0
      },
      0.2
    )
  }
  disableLightningParallax = () => {
    RAF.remove(this.lightningParallax)
    const { component, ...lightnings } = this.refs.storm.breakbot.lightnings
    TweenMax.to(
      lightnings,
      0.5,
      {
        x: 0,
        y: 0
      },
      0.2
    )
  }
  disableFloattingParallax = () => {
    RAF.remove(this.floattingParallax)
    const { component, ...floatting } = this.refs.storm.crash.floatting
    TweenMax.to(
      floatting,
      0.5,
      {
        x: 0,
        y: 0
      },
      0.2
    )
  }

  onResize = () => {
    const boatBCR = this.refs.boat.component.getBoundingClientRect()
    TweenMax.set(this.refs.boat.component, {
      x: (values.viewport.width / 10) * 8 - boatBCR.width / 2
    })
  }
}
