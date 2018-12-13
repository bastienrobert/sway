import React, { Component } from 'react'

import Sabine from './Sabine'

import css from './styles.scss'

export default class Oeuvre extends Component {
  onAnimationComplete = () => {
    this.props.decisionNeeded()
  }

  decisionSelected = choice => {
    this.refs.art.decisionSelected(choice)
  }

  decisionCancelled = () => {
    this.refs.art.decisionCancelled()
  }

  render() {
    const { step } = this.props

    return (
      <div className={css.Oeuvre}>
        <Sabine
          ref="art"
          step={step}
          animationComplete={this.onAnimationComplete}
        />
      </div>
    )
  }
}
