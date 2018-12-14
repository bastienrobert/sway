export default class TimelineController {
  constructor(refs, introIsOver, pendingIsOver) {
    this.refs = refs
    this.introIsOver = introIsOver
    this.pendingIsOver = pendingIsOver
    this.pauseOnPendingComplete = false
    this.tls = []
    this.initTLs()
  }

  initTLs() {
    console.warn(
      'Override initTLs() method in your timeline controller to add new TLs to this.tls'
    )
  }
}
