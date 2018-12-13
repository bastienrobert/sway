import React, { Component } from 'react'
import { TimelineMax } from 'gsap/all'

import Typography from 'components/Typography'

import Choice from './Choice'

import css from './styles.scss'

export default class Decision extends Component {
  componentDidMount() {
    this.initTL()
    this.userAction = true
    this.tl.play()
  }

  initTL() {
    this.tl = new TimelineMax({ paused: true })

    this.tl.fromTo(
      this.refs.component,
      0.7,
      {
        opacity: 0
      },
      {
        opacity: 1
      }
    )
  }

  onMouseEnter = choice => {
    if (!this.userAction) return
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

  render() {
    const { title, choices } = this.props

    return (
      <div className={css.Decision} ref="component">
        <Typography type="subtitle" className={css.title}>
          <h2>{title}</h2>
        </Typography>
        <div className={css.choices}>
          {choices.map((choice, i) => (
            <Choice
              key={`choice-${i}`}
              id={i}
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
