/**
 * FIRST STEP
 *
 * - Harbor
 * - Forest
 * - Desert
 */
import TimelineController from 'components/Art/TimelineController'

import Storm from './Storm'
import Fire from './Fire'
import Attack from './Attack'

export default class Disappearance extends TimelineController {
  initTLs() {
    const storm = new Storm(this.refs, this.introIsOver, this.pendingIsOver)
    const fire = new Fire(this.refs, this.introIsOver, this.pendingIsOver)
    const attack = new Attack(this.refs, this.introIsOver, this.pendingIsOver)
    this.tls = [storm, fire, attack]
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
