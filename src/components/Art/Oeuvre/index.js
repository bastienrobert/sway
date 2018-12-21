import { Component } from 'react'
import timelines from '../Sabine/timelines'

// import { add } from 'gsap-tools'

export default class Oeuvre extends Component {
  intro = null
  decisions = []
  outro = null
  tls = []
  currentTLs = null
  previousTLs = null
  previousDecision = null
  selected = null
  references = {}

  componentDidMount() {
    this.initTLs()
    this.currentTLs = this.intro
    this.currentTLs.current = 0
    console.log(this.references)
  }

  initTLs() {
    const refs = { ...this.refs, ...this.references }

    // Create INTRO
    this.intro = new timelines.intro(refs, this.introIsOver, this.pendingIsOver)

    // Create DECISIONS
    timelines.decisions.forEach(decision => {
      this.decisions.push(
        new decision.timelines(refs, this.introIsOver, this.pendingIsOver)
      )
    })

    // Create OUTRO
    this.outro = new timelines.outro(
      refs,
      this.props.gameOver,
      this.pendingIsOver
    )

    // All TLs
    this.tls = [this.intro, ...this.decisions, this.outro]

    // NEED TO BE REMOVED
    // add(this.intro.outTL, 'INTRO - Start')
    // add(this.intro.introTL, 'INTRO - Intro')
    // add(this.intro.pendingTL, 'INTRO - Pending')
    // this.decisions.forEach((decision, i) => {
    //   add(decision.tls[0].introTL, `DECISION ${i} - Intro`)
    //   add(decision.tls[0].pendingTL, `DECISION ${i} - Pending`)
    // })
    // add(this.outro.introTL, 'OUTRO - Intro')
    // add(this.outro.pendingTL, 'OUTRO - Pending')
  }

  shouldComponentUpdate(prevProps) {
    return prevProps.step !== this.props.step
  }

  componentDidUpdate() {
    this.previousDecision =
      (this.props.decisions[this.props.decisions.length - 1] &&
        this.props.decisions[this.props.decisions.length - 1].choice) ||
      0

    this.previousTLs = this.currentTLs
    this.currentTLs = this.tls[this.props.step]
    this.tls.forEach(tl => tl.updateRefs({ ...this.refs, ...this.references }))

    if (this.props.step === 0) {
      this.outro.tls[0].pendingTL.pause()
      this.outro.tls[0].pendingTL.restart()
    }
  }

  get decision() {
    const { title, choices, negative } = timelines.decisions[this.props.step]
    return { title, choices, negative }
  }

  decisionSelected = choice => {
    if (!this.currentTLs.tls[choice]) return
    this.previousTLs.pauseOnPendingComplete = this.previousDecision
    this.selected = choice
  }

  decisionCancelled = () => {
    if (this.selected === null) return
    this.previousTLs.pauseOnPendingComplete = false
    if (this.previousTLs.tls[this.previousDecision].pendingTL.isActive()) return
    this.currentTLs.tls[this.selected].introTL.pause()
    this.currentTLs.tls[this.selected].introTL.time(0)
    this.previousTLs.tls[this.previousDecision].pendingTL.restart()
    this.selected = null
  }

  introIsOver = () => {
    if (this.props.step < timelines.decisions.length) {
      this.props.nextStep(true)
    } else {
      this.props.nextStep()
      this.gameOver()
    }
  }

  gameOver = () => {
    const lastDecision = this.props.decisions[this.props.decisions.length - 1]
    if (!lastDecision) return
    const choice = lastDecision.choice
    this.previousTLs.pauseOnPendingComplete = choice
    this.selected = 0
  }

  pendingIsOver = () => {
    this.previousTLs.tls[this.previousDecision].pendingTL.pause()
    this.currentTLs.tls[this.selected].introTL.play(0)
  }
}
