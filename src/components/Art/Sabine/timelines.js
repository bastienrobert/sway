import Intro from './Intro'
import Disappearance from './Disappearance'
import Rediscovery from './Rediscovery'
import Outro from './Outro'

import locales from 'locales'
import values from 'values'

const i18n = locales[values.locale]

export default {
  intro: Intro,
  outro: Outro,
  decisions: [
    {
      title: i18n.sabine.decisions[0].title,
      timelines: Disappearance,
      negative: true,
      choices: [
        {
          label: '1'
        },
        {
          label: '2'
        },
        {
          label: '3'
        }
      ]
    },
    {
      title: i18n.sabine.decisions[1].title,
      timelines: Rediscovery,
      negative: true,
      choices: [
        {
          label: '4'
        },
        {
          label: '5'
        },
        {
          label: '6'
        }
      ]
    }
  ]
}
