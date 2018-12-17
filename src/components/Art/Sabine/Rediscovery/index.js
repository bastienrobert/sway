/**
 * FIRST STEP
 *
 * - Harbor
 * - Forest
 * - Desert
 */
import TimelineController from 'components/Art/TimelineController'

import Drown from './Drown'

export default class Rediscovery extends TimelineController {
  initTLs() {
    const drown = new Drown(this.refs, this.introIsOver, this.pendingIsOver)
    this.tls = [drown, drown, drown]
  }

  set pauseOnPendingComplete(id) {
    if (!this.tls) return
    if (id === false) {
      this.tls.forEach(tl => (tl.pauseOnPendingComplete = false))
    } else {
      this.tls[id] && (this.tls[id].pauseOnPendingComplete = true)
    }
  }
}
