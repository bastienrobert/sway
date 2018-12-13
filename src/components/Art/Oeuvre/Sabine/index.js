import React, { Component } from 'react'

import Intro from './Intro'
import Disappearance from './Disappearance'

import css from './styles.scss'

export default class Sabine extends Component {
  componentDidMount() {
    this.setTimeline()
  }

  shouldComponentUpdate(prevProps) {
    return prevProps.step !== this.props.step
  }

  componentDidUpdate() {
    this.setTimeline()
  }

  decisionSelected = choice => {
    this.selected = choice
    this.previousChapter.pauseOnPendingComplete = true
  }

  decisionCancelled = () => {
    this.previousChapter.pauseOnPendingComplete = false
    if (this.previousChapter.pendingTL.isActive()) return
    this.chapter.stop(this.selected)
    this.previousChapter.pendingTL.play(0)
  }

  pendingIsOver = () => {
    this.chapter.play(this.selected)
  }

  setTimeline() {
    if (this.chapter) this.previousChapter = this.chapter

    switch (this.props.step) {
      case 0:
        this.chapter = new Intro(
          this.refs,
          this.props.animationComplete,
          this.pendingIsOver
        )
        this.chapter.play()
        break
      case 1:
        this.chapter = new Disappearance(
          this.refs,
          this.props.animationComplete,
          this.pendingIsOver
        )
        break
      default:
        return null
    }
  }

  render() {
    return (
      <div className={css.Sabine} ref="component">
        <div ref="cube" className={css.cube} />
      </div>
    )
  }
}
