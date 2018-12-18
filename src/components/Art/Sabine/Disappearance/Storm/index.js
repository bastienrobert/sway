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

    this.introTL = new TimelineMax({
      paused: true,
      onStart: () => {
        Emitter.on('resize', this.onResize)
      },
      onComplete: () => {
        this.introIsOver()
        this.pendingTL.play()
      }
    })

    this.introTL.fromTo(
      this.refs.background,
      4,
      { backgroundColor: '#FFF' },
      { backgroundColor: '#551300' },
      0
    )

    this.introTL.add(this.boatIntroTL, 0)

    this.introTL.to(this.refs.backgroundImage, 2, { opacity: 0 }, 0)

    const stormOcean = Object.values(this.refs.stormOcean)
    this.introTL.fromTo(
      stormOcean,
      4,
      { autoAlpha: 0, y: 200 },
      { autoAlpha: 1, y: 0, ease: Expo.easeInOut },
      0.2
    )
  }

  initBoatIntroTL() {
    this.boatIntroTL = new TimelineMax()

    this.boatIntroTL.fromTo(
      this.refs.boat.component,
      2,
      { autoAlpha: 0 },
      { autoAlpha: 1 },
      0.2
    )

    this.boatIntroTL.fromTo(
      this.refs.boat.component,
      4,
      { x: values.viewport.width / 10 },
      { x: (values.viewport.width / 10) * 6, ease: Expo.easeInOut },
      0.4
    )
  }

  initPendingTL() {
    this.pendingTL = new TimelineMax({
      paused: true,
      repeat: -1,
      yoyo: true,
      onStart: () => {
        RAF.add(this.oceanParallax)
      },
      onRepeat: () => {
        if (this.pauseOnPendingComplete !== false) {
          Emitter.off('resize', this.onResize)
          this.disableOceanParallax()
          this.pendingTL.pause()
          this.pendingIsOver()
        }
      }
    })

    this.pendingTL.fromTo(this.refs.cube, 2, { rotation: 0 }, { rotation: 45 })

    this.pendingTL.to(
      this.refs.boat.matt,
      2,
      { rotation: -2.5 },
      { rotation: 2.5 }
    )
  }

  oceanParallax = () => {
    TweenMax.to(this.refs.stormOcean.overlay, 0.5, {
      x: (values.mouse.x / values.viewport.width) * 50 - 25,
      y: (values.mouse.y / values.viewport.height) * 30 - 15
    })
  }

  disableOceanParallax = () => {
    RAF.remove(this.oceanParallax)
    TweenMax.to(this.refs.stormOcean.overlay, 0.5, {
      x: 0,
      y: 0
    })
  }

  onResize = () => {
    TweenMax.set(this.refs.boat.component, {
      x: (values.viewport.width / 10) * 6
    })
  }
}
