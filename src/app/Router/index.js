import React, { Component, Fragment } from 'react'
import page from 'page.js'

import Houdini from 'utils/houdini'
import routes from 'app/routes'
import { generateGuid } from 'utils/helpers'

import PageLoader from 'components/shared/PageLoader'

export default class Router extends Component {
  static defaultProps = { routes: [], opts: {}, base: undefined }

  state = {
    firstPage: true,
    locale: 'en',
    previousRouteName: null,
    previousRoute: null,
    currentRouteName: null,
    currentRoute: null,
    ctx: null,
    pages: []
  }

  static getPath(route) {
    const paths = routes.routes.find(r => r.name === route).paths
    return paths[this.state.locale] || paths['all']
  }

  static getRouteWithParams(path, params) {
    const route = Object.keys(params).reduce(
      (acc, key) =>
        acc.replace(
          new RegExp(':' + key + '(\\?|\\*)?', 'i'),
          params[key] || ''
        ),
      path
    )
    return route
  }

  static linkResolver = doc => {
    const matchingRoute = routes.routes.find(r => {
      return r.doc && r.doc.type
    })
    if (matchingRoute) {
      const locale = this.state.locale
      const localizedPath =
        matchingRoute.paths[locale] || matchingRoute.paths['all']

      const slug = (doc.data && doc.data.slug) || ''

      return Router.getRouteWithParams(localizedPath, { slug })
    }

    return '/'
  }

  static goto = path => {
    if (path === page.current) return

    if (path.indexOf('://') === -1) {
      page((path.indexOf('/') === 0 ? '' : '/') + path)
    } else {
      window.location.href = path
    }
  }

  componentWillMount() {
    const { routes, opts, base } = this.props

    if (base) page.base(base)

    routes.forEach(route => {
      const { paths } = route
      const path = paths.all || paths[this.state.locale]

      page(path, ctx => {
        return this.setState(state => {
          return this.getPageData(route, state, ctx)
        }, this.startTransition)
      })
    })

    page.start(opts)
  }

  getPageData(route, state, ctx, replace) {
    const newPage = this.createPage(route.name, ctx.path)
    ctx.name = newPage.route && newPage.route.name
    ctx.pageUid = generateGuid()

    if (state.ctx && state.ctx.name === ctx.name && ctx.name === 'experience') {
      return {
        noContent: false,
        ctx,
        previousRouteName: state.currentRouteName,
        previousRoute: state.currentRoute,
        currentRouteName: ctx.name,
        currentRoute: ctx.path
      }
    }

    return {
      noContent: false,
      ctx,
      previousRouteName: state.currentRouteName,
      previousRoute: state.currentRoute,
      currentRouteName: ctx.name,
      currentRoute: ctx.path,
      pages: replace ? [newPage] : state.pages.concat(newPage)
    }
  }

  getRouteIndex(path) {
    return this.state.pages.findIndex(page => page.path === path)
  }

  startTransition() {
    const length = this.state.pages.length

    if (this.state.currentRouteName === this.state.previousRouteName) {
      const currentIndex = this.state.pages.length - 1
      const component = this.pages[currentIndex]
      return component.updateStep()
    }

    if (length > 1) {
      const previousIndex = this.state.pages.length - 2
      const currentIndex = this.state.pages.length - 1
      if (previousIndex === currentIndex) return

      const currentComponent = this.pages[currentIndex]
      const previousGuid = this.state.pages[previousIndex].guid

      this.pageLoader.start()
      this.pageLoader.stop()

      this.controller = Houdini.getTransitionController({
        fromContext: {
          page: this.state.pages[previousIndex],
          component: this.pages[previousIndex]
        },
        toContext: {
          page: this.state.pages[currentIndex],
          component: this.pages[currentIndex]
        }
      })

      currentComponent.componentWillAppear &&
        currentComponent.componentWillAppear()

      this.controller.transition().then(() => {
        currentComponent.componentDidAppear &&
          currentComponent.componentDidAppear()

        this.destroyPage(previousGuid)
      })
    } else {
      const currentIndex = this.getRouteIndex(this.state.currentRoute)

      const component = this.pages[currentIndex]

      this.controller = Houdini.getTransitionController({
        mono: true,
        fromContext: {
          page: this.state.pages[currentIndex],
          component: this.pages[currentIndex]
        },
        toContext: {
          page: this.state.pages[currentIndex],
          component: this.pages[currentIndex]
        }
      })

      component.componentWillAppear && component.componentWillAppear()

      this.controller.transition().then(() => {
        component.componentDidAppear && component.componentDidAppear()
      })
    }
  }

  renderNotFound = () => {
    this.setState(
      state => {
        return this.getPageData(
          { name: 'notfound' },
          state,
          { path: '*' },
          true
        )
      },
      () => {
        const currentIndex = this.getRouteIndex(this.state.currentRoute)

        this.loader.loaded().then(() => {
          this.controller = Houdini.getTransitionController({
            mono: true,
            fromContext: {
              page: this.state.pages[currentIndex],
              component: this.pages[currentIndex]
            },
            toContext: {
              page: this.state.pages[currentIndex],
              component: this.pages[currentIndex]
            }
          })

          this.controller.transition()
        })
      }
    )
  }

  destroyPage(guid) {
    this.setState(state => ({
      pages: state.pages.filter(page => page.guid !== guid)
    }))
  }

  createPage(name, path) {
    return {
      guid: generateGuid(),
      path,
      route: this.getRouteObject(name)
    }
  }

  getRouteObject(name) {
    return this.props.routes.find(route => route.name === name) || null
  }

  savePageRef = (page, guid) => {
    page && this.pages.push({ ref: page, guid })
  }

  render() {
    const { ctx, locale } = this.state

    this.pages = []

    return (
      <Fragment>
        <PageLoader ref={el => (this.pageLoader = el)} />
        {this.state.pages.map(page => {
          return (
            <page.route.component
              key={page.guid}
              ref={el => el && this.savePageRef(el, page.guid)}
              {...{ ctx, locale }}
            />
          )
        })}
      </Fragment>
    )
  }
}
