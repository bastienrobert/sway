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

  componentDidMount() {
    this.initTLs()
    this.currentTLs = this.intro
    this.currentTLs.current = 0
  }

  initTLs() {
    // Create INTRO
    this.intro = new timelines.intro(
      this.refs,
      this.introIsOver,
      this.pendingIsOver
    )

    // Create DECISIONS
    timelines.decisions.forEach(decision => {
      this.decisions.push(
        new decision.timelines(this.refs, this.introIsOver, this.pendingIsOver)
      )
    })

    // Create OUTRO
    this.outro = new timelines.outro(
      this.refs,
      this.introIsOver,
      this.pendingIsOver
    )

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
    if (!this.currentTLs.tls[this.selected]) return
    this.previousTLs.pauseOnPendingComplete = choice
    this.selected = choice
  }

  decisionCancelled = () => {
    if (!this.selected) return
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
      console.log('END - NEED TO STOP CURRENT TL AND PLAY OUTRO')
      this.props.nextStep()
      // this.outro.introTL.play()
    }
  }

  pendingIsOver = () => {
    this.previousTLs.tls[this.previousDecision].pendingTL.pause()
    this.currentTLs.tls[this.selected].introTL.play(0)
  }
}
