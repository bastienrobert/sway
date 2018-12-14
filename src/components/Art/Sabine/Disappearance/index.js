/**
 * FIRST STEP
 *
 * - Harbor
 * - Forest
 * - Desert
 */
import TimelineController from 'components/Art/TimelineController'

import Storm from './Storm'
import Decapitation from './Decapitation'

export default class Disappearance extends TimelineController {
  initTLs() {
    this.tls.push(new Storm(this.refs, this.introIsOver, this.pendingIsOver))
    this.tls.push(
      new Decapitation(this.refs, this.introIsOver, this.pendingIsOver)
    )
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
