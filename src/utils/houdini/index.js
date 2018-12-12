import { rules } from './config'

class Houdini {
  constructor() {
    this.isTransitioning = false
    this.activeTransition = null
    this.activeTransitionPath = ''
  }

  getOpposite(transitionPath) {
    if (transitionPath.indexOf('<->') !== -1) {
      return transitionPath
    } else if (transitionPath.indexOf('<-') !== -1) {
      return transitionPath.split('<-').join('->')
    } else if (transitionPath.indexOf('->') !== -1) {
      return transitionPath.split('->').join('<-')
    }
  }

  getTransitionController(context) {
    const { fromContext, toContext } = context

    if (fromContext && toContext) {
      const matchingRule = Object.keys(rules).filter(rule => {
        if (rule.indexOf('<->') !== -1) {
          const contexts = rule.split('<->')
          return (
            (contexts[0] === fromContext.page.route.name &&
              contexts[1] === toContext.page.route.name) ||
            (contexts[1] === fromContext.page.route.name &&
              contexts[0] === toContext.page.route.name)
          )
        } else if (rule.indexOf('<-') !== -1) {
          const contexts = rule.split('<-')

          return (
            contexts[1] === fromContext.page.route.name &&
            contexts[0] === toContext.page.route.name
          )
        } else if (rule.indexOf('->') !== -1) {
          const contexts = rule.split('->')

          return (
            contexts[0] === fromContext.page.route.name &&
            contexts[1] === toContext.page.route.name
          )
        } else {
          return 'default'
        }
      })[0]

      if (
        this.getOpposite(this.activeTransitionPath) === matchingRule &&
        this.activeTransition.isActive()
      ) {
        return this.activeTransition
      } else {
        this.activeTransition = new rules[matchingRule](context)
        this.activeTransitionPath = matchingRule

        return this.activeTransition
      }
    } else {
      console.log('ANIMATE IN ONLY')
    }
  }
}

export default new Houdini()
