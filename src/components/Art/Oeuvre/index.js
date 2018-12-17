import { Component } from 'react'
import timelines from '../Sabine/timelines'

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
    this.outro = new timelines.outro(refs, this.introIsOver, this.pendingIsOver)

    // All TLs
    this.tls = [this.intro, ...this.decisions, this.outro]
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
  }

  get decision() {
    const { title, choices } = timelines.decisions[this.props.step]
    return {
      title,
      choices
    }
  }

  decisionSelected = choice => {
    if (!this.currentTLs.tls[choice]) return
    this.previousTLs.pauseOnPendingComplete = choice
    this.selected = choice
  }

  decisionCancelled = () => {
    if (this.selected === null) return
    this.previousTLs.pauseOnPendingComplete = false
    if (this.previousTLs.tls[this.previousDecision].pendingTL.isActive()) return
    this.currentTLs.tls[this.selected].introTL.pause()
    this.currentTLs.tls[this.selected].introTL.time(0)
    this.previousTLs.tls[this.previousDecision].pendingTL.play()
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

  gameOver() {
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
