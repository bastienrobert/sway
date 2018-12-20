import React from 'react'
import Oeuvre from '../Oeuvre'
import { createElements } from 'utils/helpers'
import GsapTools from 'gsap-tools'

import timelines from './timelines'
import elements from './elements'

import css from './styles.scss'

export default class Sabine extends Oeuvre {
  timelines = timelines

  render() {
    this.references = {}

    return (
      <div className={css.Sabine}>
        {/* <GsapTools /> */}
        {createElements(elements.dom, elements.opts.css, this.references)}
      </div>
    )
  }
}
