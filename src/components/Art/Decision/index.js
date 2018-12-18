import React, { Component } from 'react'
import { TimelineMax } from 'gsap/all'
import classnames from 'classnames/bind'

import Typography from 'components/Typography'

import Choice from './Choice'

import css from './styles.scss'
const cx = classnames.bind(css)

export default class Decision extends Component {
  componentDidMount() {
    this.initTL()
    this.userAction = true
    this.tl.play()
  }

  componentShouldBeVisible() {
    this.userAction = true
    this.tl.play(0)
  }

  initTL() {
    this.tl = new TimelineMax({ paused: true })

    this.tl.fromTo(
      this.refs.component,
      0.7,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1,
        onReverseComplete: this.resetChoices.bind(this)
      }
    )
  }

  onMouseEnter = choice => {
    this.props.onSelect(choice)
  }

  onMouseLeave = () => {
    if (!this.userAction) return
    this.props.onCancel()
  }

  onChoiceValidate = choice => {
    this.userAction = false
    this.props.onValidate(this.props.step, choice)
    this.tl.reverse()
  }

  resetChoices() {
    this.choices.forEach(choice => {
      choice.tl.restart()
      choice.tl.pause()
    })
  }

  render() {
    this.choices = []
    const { title, choices, negative } = this.props
    const componentStyle = cx(css.Decision, {
      negative
    })

    return (
      <div className={componentStyle} ref="component">
        <Typography type="subtitle" className={css.title}>
          <h2>{title}</h2>
        </Typography>
        <div className={css.choices}>
          {choices.map((choice, i) => (
            <Choice
              key={`choice-${i}`}
              id={i}
              ref={el => el && this.choices.push(el)}
              negative={negative}
              onChoiceValidate={this.onChoiceValidate}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              {...choice}
            />
          ))}
        </div>
      </div>
    )
  }
}
