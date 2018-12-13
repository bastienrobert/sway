import Emitter from 'utils/Emitter'
import FontFaceObserver from 'fontfaceobserver'

class Values {
  constructor() {
    this.body = document.body
    this.init()
  }

  init() {
    const devicePixelRatio = window.devicePixelRatio
    this.ratio = devicePixelRatio >= 2 ? 2 : devicePixelRatio

    this.locale = 'fr'

    this.viewport = {
      width: 0,
      height: 0
    }

    this.mouse = {
      x: 0,
      y: 0
    }

    // this.fontLoaded = false

    // const font = new FontFaceObserver()
    // font.load().then(
    //   () => {
    //     this.onFontLoad(true)
    //   },
    //   () => {
    //     this.onFontLoad(false)
    //   }
    // )

    window.addEventListener('resize', this.onResize)
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('touchmove', this.onMouseMove)
    this.onResize()
  }

  onMouseMove = e => {
    if (e.touches) {
      if (e.touches.length > 1) {
        return
      } else {
        e = e.touches[0]
      }
    }

    this.mouse = {
      x: e.clientX,
      y: e.clientY
    }
  }

  onFontLoad = success => {
    Emitter.emit('font-loaded', success)
    if (!success) console.error('Ailerons font is not available')
    this.fontLoaded = true
  }

  onResize = () => {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    Emitter.emit('resize')
  }
}

export default new Values()
