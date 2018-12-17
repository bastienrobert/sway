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
        onReverseComplete: () => {
          this.choices.forEach(choice => {
            choice.tl.pause()
            choice.tl.time(0)
          })
        }
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

  render() {
    this.choices = []
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
              ref={el => el && this.choices.push(el)}
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
