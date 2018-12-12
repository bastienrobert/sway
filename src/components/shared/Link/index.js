import React, { Component } from 'react'
import classnames from 'classnames/bind'

import css from './styles.scss'
const cx = classnames.bind(css)

export default class Link extends Component {
  static defaultProps = {
    action: () => console.log('Button has been triggered')
  }

  render() {
    const { children, className, href, action, button } = this.props
    const componentStyle = cx(className, css.Link, { button })

    if (action) {
      return (
        <a href={href} className={componentStyle}>
          {children}
        </a>
      )
    } else {
      return (
        <button onClick={action} className={componentStyle}>
          {children}
        </button>
      )
    }
  }
}
