import React, { Component } from 'react'
import { TimelineMax, TweenMax } from 'gsap/all'

import Choice from './Choice'

import css from './styles.scss'

export default class Decision extends Component {
  state = {
    current: 0
  }

  componentDidMount() {
    this.initTL()
    window.addEventListener('wheel', this.onMouseWheel)
    this.userAction = true
    this.componentDidUpdate()
    this.tl.play(0)
    this.refs.choice.tl.play(0)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps || this.props.step !== prevProps.step) {
      const bcr = this.refs.dots.getBoundingClientRect()
      this.dotWidth = bcr && bcr.width / this.props.choices.length
    }
    this.setCurrentItem()
  }

  componentShouldBeVisible() {
    this.refs.choice.tl.play(0)
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
        onReverseComplete: this.resetChoices
      }
    )
  }

  resetChoices = () => {
    this.setState({ current: 0 })
    this.refs.choice.tl.restart()
    this.refs.choice.tl.pause()
  }

  setCurrentItem() {
    const x = -(this.state.current * this.dotWidth) - 5
    TweenMax.to(this.refs.dots, 0.4, {
      x,
      onComplete: () => (this.isAnimating = false)
    })
    this.dots.forEach((dot, i) => {
      const isCurrentItem = i === this.state.current
      TweenMax.to(dot, 0.2, {
        autoAlpha: isCurrentItem ? 0 : 1
      })
    })
  }

  onChoiceValidate = () => {
    this.userAction = false
    this.props.onValidate(this.props.step, this.state.current)
    this.tl.reverse()
  }

  onMouseWheel = e => {
    if (!this.userAction || this.isAnimating) return null
    const current =
      e.deltaY < 0 ? this.state.current - 1 : this.state.current + 1
    if (current < 0 || current >= this.props.choices.length) return
    this.isAnimating = true
    this.setState({ current })
  }

  onClick = current => {
    this.setState({ current })
  }

  render() {
    this.dots = []
    const { choices } = this.props

    return (
      <div className={css.Decision} ref="component">
        <Choice
          ref="choice"
          current={this.state.current}
          onComplete={this.onChoiceValidate}
        />
        <div className={css.dots} ref="dots">
          {choices.map((_, i) => {
            return (
              <div
                className={css.dot}
                ref={el => el && this.dots.push(el)}
                key={`decision-${i}`}
                onClick={this.onClick.bind(this, i)}
              />
            )
          })}
        </div>
      </div>
    )
  }
}
