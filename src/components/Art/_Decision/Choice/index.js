import React, { Component } from 'react'
import { TimelineMax } from 'gsap/all'

import css from './styles.scss'

export default class Choice extends Component {
  componentDidMount() {
    this.initTL()
  }

  initTL() {
    this.tl = new TimelineMax({
      paused: true,
      onComplete: this.props.onComplete
    })

    this.tl.fromTo(
      this.refs.progress,
      8,
      {
        strokeDasharray: '0 305'
      },
      {
        strokeDasharray: '305 305'
      }
    )
  }

  render() {
    return (
      <div className={css.Choice}>
        <svg
          viewBox="0 0 100 100"
          className={css.control}
          fill="none"
          strokeWidth="2">
          <circle className={css.stroke} r="44" cx="50" cy="50" />
          <circle
            className={css.progress}
            ref="progress"
            transform="rotate(-90 50 50)"
            r="42"
            cx="50"
            cy="50"
          />
        </svg>
        <span className={css.text}>{this.props.current}</span>
      </div>
    )
  }
}
