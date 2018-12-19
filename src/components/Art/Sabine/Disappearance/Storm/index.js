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
    this.initBoatIntroTL()
    this.initOceanTL()

    this.introTL = new TimelineMax({
      paused: true,
      onStart: () => {
        Emitter.on('resize', this.onResize)
        this.oceanTL.restart()
      },
      onComplete: () => {
        this.introIsOver()
        this.pendingTL.play()
      }
    })

    // Hide ocean component
    this.introTL.to(this.refs.ocean.component, 1, {
      autoAlpha: 0
    })

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
      2,
      { autoAlpha: 0 },
      { autoAlpha: 1 },
      0
    )

    // -> Boat animation to go to the middle of the screen
    this.introTL.add(this.boatIntroTL, 0)

    // -> Show storm ocean
    this.introTL.fromTo(
      this.refs.storm.breakbot.ocean.component,
      4,
      { autoAlpha: 0, y: 200 },
      { autoAlpha: 1, y: 0, ease: Expo.easeInOut },
      0
    )

    // Hide breakbot component
    this.introTL.to(
      this.refs.storm.breakbot.component,
      1,
      {
        autoAlpha: 0
      },
      5
    )

    // -> Hide boat component
    this.introTL.to(
      this.refs.boat.component,
      1,
      {
        autoAlpha: 0
      },
      5
    )

    // -> Set background color
    this.introTL.to(
      this.refs.background,
      1,
      {
        backgroundColor: '#545453'
      },
      5
    )

    // -> Show crash component
    this.introTL.fromTo(
      this.refs.storm.crash.component,
      1,
      { autoAlpha: 0 },
      { autoAlpha: 1 },
      5
    )
  }

  initBoatIntroTL() {
    this.boatIntroTL = new TimelineMax()
    const boatBCR = this.refs.boat.component.getBoundingClientRect()

    this.boatIntroTL.fromTo(
      this.refs.boat.component,
      2,
      { autoAlpha: 0 },
      { autoAlpha: 1 },
      1
    )

    this.boatIntroTL.fromTo(
      this.refs.boat.component,
      4,
      { x: values.viewport.width / 10 - boatBCR.width / 2 },
      {
        y: 10,
        rotation: -10,
        x: (values.viewport.width / 10) * 8 - boatBCR.width / 2,
        ease: Expo.easeInOut
      },
      1
    )

    this.boatIntroTL.to(
      this.refs.boat.component,
      1,
      {
        y: -10,
        rotation: 10,
        ease: Expo.easeInOut
      },
      2
    )

    this.boatIntroTL.to(
      this.refs.boat.component,
      1,
      {
        rotation: 0
      },
      3
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
        x: -20,
        y: 20
      },
      {
        x: 20,
        y: -20
      }
    )
  }

  initPendingTL() {
    this.initFlashesTL()
    this.initCloudTL()
    this.initLightningTL()
    this.pendingTL = new TimelineMax({
      paused: true,
      repeat: -1,
      yoyo: true,
      onStart: () => {
        RAF.add(this.oceanParallax)
        RAF.add(this.cloudParallax)
        RAF.add(this.lightningParallax)
        !this.oceanTL.isActive() && this.oceanTL.restart()
        !this.cloudTL.isActive() && this.cloudTL.restart()
        !this.lightningTL.isActive() && this.lightningTL.restart()
        !this.flashesTL.isActive() && this.flashesTL.restart()
      },
      onRepeat: () => {
        if (this.pauseOnPendingComplete !== false) {
          Emitter.off('resize', this.onResize)
          // this.disableOceanParallax()
          // this.disableCloudParallax()
          // this.disableLightningParallax()
          // this.cloudTL.pause()
          // this.oceanTL.pause()
          // this.pendingTL.pause()
          // this.lightningTL.pause()
          // this.flashesTL.pause()
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

    // this.pendingTL.to(
    //   this.refs.boat.matt,
    //   2,
    //   { rotation: -2.5 },
    //   { rotation: 2.5 },
    //   0
    // )

    // this.pendingTL.to(
    //   this.refs.boat.hull,
    //   2,
    //   { rotation: 1.5 },
    //   { rotation: -1.5 },
    //   0
    // )
  }

  oceanParallax = () => {
    TweenMax.to(this.refs.storm.breakbot.ocean.overlay, 0.5, {
      x: (values.mouse.x / values.viewport.width) * 50 - 25,
      y: (values.mouse.y / values.viewport.height) * 30 - 15
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

  onResize = () => {
    const boatBCR = this.refs.boat.component.getBoundingClientRect()
    TweenMax.set(this.refs.boat.component, {
      x: (values.viewport.width / 10) * 8 - boatBCR.width / 2
    })
  }
}
