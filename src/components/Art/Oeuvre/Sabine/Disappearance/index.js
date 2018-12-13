/**
 * FIRST STEP
 *
 * - Harbor
 * - Forest
 * - Desert
 */
import Harbor from './Harbor'

export default class FirstDecision {
  constructor(refs, resolve) {
    this.refs = refs
    // this.resolve = resolve
    this.pauseOnPendingComplete = false
    this.initTLs()
  }

  initTLs() {
    this.harbor = new Harbor(this.refs)

    // this.tl = choice.tl
  }

  play(id) {
    switch (id) {
      case 0:
        this.tl = this.harbor.introTL
        break
      default:
        return null
    }
    this.tl && this.tl.play()
  }

  stop() {
    this.tl && this.tl.pause()
    this.tl && this.tl.time(0)
  }
}
