/**
 * FIRST STEP
 *
 * - Harbor
 * - Forest
 * - Desert
 */
import TimelineController from 'components/Art/TimelineController'

import Storm from './Storm'

export default class Disappearance extends TimelineController {
  initTLs() {
    const storm = new Storm(this.refs, this.introIsOver, this.pendingIsOver)
    this.tls = [storm, storm, storm]
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
