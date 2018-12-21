import React, { Component } from 'react'
import classnames from 'classnames/bind'

import { TimelineMax, Expo } from 'gsap/all'

import css from './styles.scss'
const cx = classnames.bind(css)

export default class Choice extends Component {
  componentDidMount() {
    this.initTL()
  }

  initTL() {
    this.tl = new TimelineMax({ paused: true })

    this.tl.fromTo(
      this.refs.jauge,
      6,
      {
        strokeDasharray: '0 305'
      },
      {
        strokeDasharray: '305 305',
        onComplete: () => this.props.onChoiceValidate(this.props.id),
        ease: Expo.easeInOut
      }
    )
  }

  onMouseEnter = () => {
    this.tl.play()
    this.props.onMouseEnter(this.props.id)
  }

  onMouseLeave = () => {
    this.tl.reverse()
    this.props.onMouseLeave()
  }

  render() {
    const { label, negative } = this.props
    const componentStyle = cx(css.Choice, {
      negative
    })

    return (
      <div
        className={componentStyle}
        ref="component"
        onClick={this.validate}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        <svg
          viewBox="0 0 100 100"
          className={css.control}
          fill="none"
          strokeWidth="2">
          <defs>
            {/* <pattern
              id="image"
              x="0"
              y="0"
              patternUnits="userSpaceOnUse"
              height="1"
              width="1">
              <image
                x="0"
                y="0"
                href="https://placehold.it/300x300"
                preserveAspectRatio="xMinYMid slice"
              />
            </pattern> */}
          </defs>
          <circle className={css.border} r="48.5" cx="50" cy="50" />
          <circle
            ref="jauge"
            className={css.progress}
            transform="rotate(-90 50 50)"
            strokeDasharray="0 305"
            r="48.5"
            cx="50"
            cy="50"
            // fill="url(#image)"
          />
          <text
            dx="0"
            className={css.text}
            x="50"
            y="54"
            alignmentBaseline="middle"
            textAnchor="middle">
            {label}
          </text>
        </svg>
      </div>
    )
  }
}
