import { TimelineMax, TweenMax } from 'gsap/all'

export default class Storm {
  constructor(refs, introIsOver, pendingIsOver) {
    this.refs = refs
    this.introIsOver = introIsOver
    this.pendingIsOver = pendingIsOver
    this.pauseOnPendingComplete = false
    this.initIntroTL()
    this.initPendingTL()
  }
  setOriginalPosition() {
    TweenMax.set(this.refs.stormClouds.stromCloudBrushSmallRight, {
      top:180,
      left:'1%',
      width: 525,
      zIndex: 1
    })
    TweenMax.set(this.refs.stormClouds.stromCloudPointSmall, {
      top:30,
      left:'1%',
      width: 425,
      zIndex: 2
    })
    TweenMax.set(this.refs.stormClouds.stromCloudOrange, {
      top:70,
      left:'8%',
      width: 665,
      zIndex: 0,
      opacity:0.7
    })
    TweenMax.set(this.refs.stormClouds.stromCloudBrushSmallLeft, {
      top:40,
      left:'22%',
      width: 495,
      zIndex: 1
    })
    TweenMax.set(this.refs.stormClouds.stromCloudPointBig, {
      top:10,
      left:'30%',
      width: 700,
      zIndex: 4
    })
    TweenMax.set(this.refs.stormClouds.stromCloudBrushBigRight, {
      top:120,
      left:'40%',
      width: 545,
      zIndex: 3
    })
    TweenMax.set(this.refs.stormClouds.stromCloudBrushBigLeft, {
      top:30,
      left:'53%',
      width: 830,
      zIndex: 1
    })
    TweenMax.set(this.refs.stormClouds.stromCloudGrey, {
      top:140,
      left:'63%',
      width: 315,
      zIndex: 2
    })
    TweenMax.set(this.refs.stormClouds.stromCloudBlack, {
      top:10,
      left:'65%',
      width: 525,
      zIndex: 4
    })
  }
  initIntroTL() {
    this.setOriginalPosition()
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
          if (this.pauseOnPendingComplete) {
            this.pendingTL.pause()
            this.pendingIsOver()
          }
        },
        onReverseComplete: () => {
          if (this.pauseOnPendingComplete) {
            this.pendingTL.pause()
            this.pendingIsOver()
          }
        }
      }
    )
  }
}
