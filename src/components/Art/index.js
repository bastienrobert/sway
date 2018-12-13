import React, { Component } from 'react'

import Typography from 'components/Typography'

import Decision from './Decision'
import Oeuvre from './Oeuvre'

import css from './styles.scss'

export default class Art extends Component {
  state = {
    step: 0,
    decisions: [],
    decision: null
  }

  onDecisionNeeded = () => {
    const step = this.state.step + 1
    this.setState({
      decision: (
        <Decision
          step={step}
          title={this.props.decisions[this.state.step].title}
          choices={this.props.decisions[this.state.step].choices}
          onSelect={this.onDecisionSelected}
          onCancel={this.onDecisionCancelled}
          onValidate={this.onDecisionValidate}
        />
      ),
      step
    })
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

  render() {
    const { title } = this.props
    const { step, decision } = this.state

    return (
      <div className={css.Art}>
        <Typography type="title" className={css.title}>
          <h1>{title}</h1>
        </Typography>
        <Oeuvre
          ref="oeuvre"
          step={step}
          decisionNeeded={this.onDecisionNeeded}
        />
        {decision}
      </div>
    )
  }
}
