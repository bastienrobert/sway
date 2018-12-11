import React, { Component, Fragment } from 'react'
import page from 'page.js'

export default class Router extends Component {
  constructor(props) {
    super(props)
    this.state = { page: null }
  }

  componentWillMount() {
    const { routes, opts } = this.props

    routes.forEach(route => {
      const { paths } = route
      const path = paths.all || paths[this.state.locale]

      page(path, ctx => {
        return this.setState({ page: <route.component ctx={ctx} /> })
      })
    })

    page.start(opts)
  }

  static goto = path => {
    if (path === page.current) return

    if (path.indexOf('://') === -1) {
      page((path.indexOf('/') === 0 ? '' : '/') + path)
    } else {
      window.location.href = path
    }
  }

  render() {
    return <Fragment>{this.state.page}</Fragment>
  }
}
