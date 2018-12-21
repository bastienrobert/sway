import React from 'react'
import Oeuvre from '../Oeuvre'
import { createElements } from 'utils/helpers'
// import GsapTools from 'gsap-tools'

import fire from 'assets/sabine/disappearance/fire.mp4'
import attack from 'assets/sabine/disappearance/attack.mp4'
import desert from 'assets/sabine/rediscovery/desert.mp4'
import forest from 'assets/sabine/rediscovery/forest.mp4'

import timelines from './timelines'
import elements from './elements'

import css from './styles.scss'

export default class Sabine extends Oeuvre {
  timelines = timelines

  render() {
    this.references = {}
    this.references.poc = {}

    return (
      <div className={css.Sabine}>
        {/* <GsapTools /> */}
        {createElements(elements.dom, elements.opts.css, this.references)}
        <video
          className={css.video}
          ref={el => el && (this.references.poc.fire = el)}
          src={fire}
        />
        <video
          className={css.video}
          ref={el => el && (this.references.poc.attack = el)}
          src={attack}
        />
        <video
          className={css.video}
          ref={el => el && (this.references.poc.desert = el)}
          src={desert}
        />
        <video
          className={css.video}
          ref={el => el && (this.references.poc.forest = el)}
          src={forest}
        />
      </div>
    )
  }
}
