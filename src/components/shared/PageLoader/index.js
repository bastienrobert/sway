import React, { Component } from 'react'
import Emitter from 'utils/Emitter'
import { TweenMax, Linear } from 'gsap/all'

import css from './styles.scss'

export default class PageLoader extends Component {
  componentDidMount() {
    Emitter.on('pageLoader:start', this.start)
    Emitter.on('pageLoader:stop', this.stop)
  }

  componentWillUnmount() {
    Emitter.off('pageLoader:start', this.start)
    Emitter.off('pageLoader:stop', this.stop)
  }

  start = () => {
    this.tween = TweenMax.fromTo(
      this.bar,
      2,
      { x: '-150%' },
      { x: '-5%', ease: Linear.easeNone }
    )
  }

  stop = () => {
    this.tween.kill()
    TweenMax.to(this.bar, 0.4, { x: '150%', ease: Linear.easeOut })
  }

  render() {
    return (
      <div className={css.PageLoader}>
        <div ref={el => (this.bar = el)} className={css.progressBar} />
      </div>
    )
  }
}
