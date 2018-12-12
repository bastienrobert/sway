import { TimelineMax } from 'gsap/all'

class TransitionController {
  constructor(props) {
    this.mono = props.mono

    this.fromContext = props.fromContext
    this.toContext = props.toContext

    this.tl = new TimelineMax({ paused: true })

    const dom = this.getDomNodes(
      this.fromContext.component.ref,
      this.toContext.component.ref
    )

    try {
      if (this.mono) {
        this.defineShow(dom.from)
      } else {
        this.defineHide(dom.from)
        this.defineShow(dom.to)
      }
    } catch (e) {
      console.error(e)
    }
  }

  getDomNodes(fromView, toView) {
    console.warn(
      'Override getDomNodes() method in your transition controller to access dom nodes.'
    )

    return { from: {}, to: {} }
  }

  defineShow() {
    console.warn(
      'Override defineShow() method in your transition controller if you need a custom animation.'
    )
  }

  defineHide() {
    console.warn(
      'Override defineHide() method in your transition controller if you need a custom animation.'
    )
  }

  isActive() {
    return this.tl.isActive()
  }

  getTl() {
    return this.tl
  }

  show() {
    return new Promise(resolve => {
      this.showTl.eventCallback('onComplete', resolve)
      this.showTl.play(0)
      resolve()
    })
  }

  hide() {
    return new Promise(resolve => {
      this.hideTl.eventCallback('onComplete', resolve)
      this.hideTl.play()
      resolve()
    })
  }

  transition() {
    return new Promise(resolve => {
      if (this.isActive()) {
        this.tl.eventCallback('onReverseComplete', resolve)
        // resolve()
        this.tl.reversed() ? this.tl.play() : this.tl.reverse()
      } else {
        this.tl.eventCallback('onComplete', resolve)
        this.tl.play()
        // resolve()
      }
    })
  }
}

export default TransitionController
