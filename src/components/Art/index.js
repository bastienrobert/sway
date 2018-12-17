import React, { Component } from 'react'

import oeuvres from './oeuvres.js'

import Typography from 'components/Typography'
import Decision from './Decision'

import css from './styles.scss'
import { TweenMax } from 'gsap/all'

export default class Art extends Component {
  state = {
    step: 0,
    decisions: [],
    decision: null
  }

  componentDidMount() {
    this.refs.oeuvre.intro.outTL.play()
  }

  onNextStep = nextDecisionNeeded => {
    const step = this.state.step + 1
    this.setState(
      {
        decision: nextDecisionNeeded && this.refs.oeuvre.decision,
        step
      },
      () => nextDecisionNeeded && this.refs.decision.componentShouldBeVisible()
    )
  }

  onDecisionSelected = choice => {
    this.refs.oeuvre.decisionSelected(choice)
  }

  onDecisionCancelled = () => {
    this.refs.oeuvre.decisionCancelled()
  }

  onDecisionValidate = (decision, choice) => {
    if (decision !== this.state.step) return
    this.setState({
      decisions: [
        ...this.state.decisions,
        {
          decision,
          choice
        }
      ]
    })
  }

  onGetStarted = () => {
    TweenMax.to(this.refs.getStarted, 1, {
      autoAlpha: 0
    })
    this.refs.oeuvre.intro.outTL.pause()
    this.refs.oeuvre.intro.introTL.play()
  }

  render() {
    const { title } = oeuvres[this.props.oeuvre]
    const Component = oeuvres[this.props.oeuvre].component
    const { step, decisions, decision } = this.state

    return (
      <div className={css.Art}>
        <Typography type="title" className={css.title}>
          <h1>{title}</h1>
        </Typography>
        <button
          ref="getStarted"
          className={css.getStarted}
          onClick={this.onGetStarted}>
          Get started
        </button>
        <Component
          ref="oeuvre"
          decisions={decisions}
          step={step}
          nextStep={this.onNextStep}
        />
        {decision && (
          <Decision
            ref="decision"
            step={step}
            title={decision.title}
            choices={decision.choices}
            onSelect={this.onDecisionSelected}
            onCancel={this.onDecisionCancelled}
            onValidate={this.onDecisionValidate}
          />
        )}
      </div>
    )
  }
}
