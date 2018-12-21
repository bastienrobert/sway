/**
 * FIRST STEP
 *
 * - Harbor
 * - Forest
 * - Desert
 */
import TimelineController from 'components/Art/TimelineController'

import Drown from './Drown'
import Desert from './Desert'
import Forest from './Forest'

export default class Rediscovery extends TimelineController {
  initTLs() {
    const drown = new Drown(this.refs, this.introIsOver, this.pendingIsOver)
    const desert = new Desert(this.refs, this.introIsOver, this.pendingIsOver)
    const forest = new Forest(this.refs, this.introIsOver, this.pendingIsOver)
    this.tls = [drown, desert, forest]
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
