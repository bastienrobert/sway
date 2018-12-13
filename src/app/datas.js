import locales from 'locales'
import values from 'values'

const i18n = locales[values.locale]

export default {
  sabine: {
    title: i18n.sabine.title,
    decisions: [
      {
        title: i18n.sabine.decisions[0].title,
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
      }
    ]
  }
}
