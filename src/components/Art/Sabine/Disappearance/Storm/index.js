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

    this.introTL.to(
      [this.refs.background, this.refs.storm.cloud.component],
      4,
      { backgroundColor: '#551300' },
      0
    )

    this.introTL.fromTo(
      this.refs.storm.cloud.component,
      2,
      { autoAlpha: 0 },
      { autoAlpha: 1 },
      0.5
    )

    this.introTL.add(this.boatIntroTL, 0)

    // this.introTL.to(this.refs.backgroundImage, 2, { opacity: 0 }, 0)

    this.introTL.fromTo(
      [
        this.refs.storm.ocean.background,
        this.refs.storm.ocean.highlight,
        this.refs.storm.ocean.overlay
      ],
      4,
      { autoAlpha: 0, y: 200 },
      { autoAlpha: 1, y: 0, ease: Expo.easeInOut },
      0.2
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
      [this.refs.storm.ocean.background, this.refs.storm.ocean.highlight],
      2,
      {
        x: -5,
        y: 5
      },
      {
        x: 5,
        y: -5
      }
    )
  }

  initPendingTL() {
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
      },
      onRepeat: () => {
        if (this.pauseOnPendingComplete !== false) {
          Emitter.off('resize', this.onResize)
          this.disableOceanParallax()
          this.disableCloudParallax()
          this.disableLightningParallax()
          this.cloudTL.pause()
          this.oceanTL.pause()
          this.pendingTL.pause()
          this.lightningTL.pause()
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

    this.pendingTL.to(
      this.refs.boat.matt,
      2,
      { rotation: -2.5 },
      { rotation: 2.5 },
      0
    )

    this.pendingTL.to(
      this.refs.boat.hull,
      2,
      { rotation: 1.5 },
      { rotation: -1.5 },
      0
    )
  }

  oceanParallax = () => {
    TweenMax.to(this.refs.storm.ocean.overlay, 0.5, {
      x: (values.mouse.x / values.viewport.width) * 50 - 25,
      y: (values.mouse.y / values.viewport.height) * 30 - 15
    })
  }

  cloudParallax = () => {
    TweenMax.to(this.refs.storm.cloud.brushSmallRight, 0.5, {
      x: -(values.mouse.x / values.viewport.width) * 20,
      y: (values.mouse.y / values.viewport.height) * 10
    })
    TweenMax.to(this.refs.storm.cloud.pointBig, 0.5, {
      x: (values.mouse.x / values.viewport.width) * 20,
      y: (values.mouse.y / values.viewport.height) * 10
    })
    TweenMax.to(this.refs.storm.cloud.brushSmallLeft, 0.5, {
      x: (values.mouse.x / values.viewport.width) * 20,
      y: -(values.mouse.y / values.viewport.height) * 10
    })
    TweenMax.to(this.refs.storm.cloud.black, 0.5, {
      x: (values.mouse.x / values.viewport.width) * 20,
      y: -(values.mouse.y / values.viewport.height) * 10
    })
  }

  lightningParallax = () => {
    TweenMax.to(this.refs.storm.lightning.left, 0.5, {
      x: -(values.mouse.x / values.viewport.width) * 20,
      y: (values.mouse.y / values.viewport.height) * 10
    })
    TweenMax.to(this.refs.storm.lightning.middleLeft, 0.5, {
      x: (values.mouse.x / values.viewport.width) * 20,
      y: -(values.mouse.y / values.viewport.height) * 10
    })
    TweenMax.to(this.refs.storm.lightning.middleRight, 0.5, {
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
      this.refs.storm.cloud.pointSmall,
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
      this.refs.storm.cloud.orange,
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
      this.refs.storm.cloud.grey,
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
      this.refs.storm.cloud.brushBigRight,
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
      this.refs.storm.cloud.brushBigLeft,
      4,
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
  }

  initLightningTL() {
    this.lightningTL = new TimelineMax({
      paused: true,
      repeat: -1,
      yoyo: true
    })
    this.lightningTL.fromTo(
      this.refs.storm.lightning.right,
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
  }

  disableOceanParallax = () => {
    RAF.remove(this.oceanParallax)
    TweenMax.to(this.refs.storm.ocean.overlay, 0.5, {
      x: 0,
      y: 0
    })
  }

  disableCloudParallax = () => {
    RAF.remove(this.cloudParallax)
    const { component, ...clouds } = this.refs.storm.cloud
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
    const { component, ...lightnings } = this.refs.storm.lightning
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
