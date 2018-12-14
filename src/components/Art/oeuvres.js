import Sabine from './Sabine'

import locales from 'locales'
import values from 'values'

const i18n = locales[values.locale]

export default {
  sabine: {
    title: i18n.sabine.title,
    component: Sabine
  }
}
