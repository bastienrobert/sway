import css from './styles.scss'

export default {
  opts: {
    css
  },
  dom: [
    { ref: 'background' },
    { ref: 'cube' },
    {
      ref: 'ocean',
      children: [
        { ref: 'fog' },
        {
          ref: 'cloud',
          children: [{ ref: 'dark' }, { ref: 'double' }, { ref: 'single' }]
        },
        {
          ref: 'wave',
          children: [
            { ref: 'big' },
            { ref: 'leftClear' },
            { ref: 'leftDark' },
            { ref: 'leftTransparent' },
            { ref: 'rightClear' },
            { ref: 'rightTransparent' }
          ]
        }
      ]
    },
    {
      ref: 'boat',
      children: [{ ref: 'matt' }, { ref: 'hull' }]
    },
    {
      ref: 'storm',
      children: [
        {
          ref: 'lightning',
          children: [
            { ref: 'left' },
            { ref: 'middleLeft' },
            { ref: 'middleRight' },
            { ref: 'right' }
          ]
        },
        {
          ref: 'cloud',
          children: [
            { ref: 'brushSmallRight' },
            { ref: 'pointSmall' },
            { ref: 'orange' },
            { ref: 'brushSmallLeft' },
            { ref: 'pointBig' },
            { ref: 'brushBigRight' },
            { ref: 'brushBigLeft' },
            { ref: 'grey' },
            { ref: 'black' }
          ]
        },
        {
          ref: 'ocean',
          children: [
            { ref: 'background' },
            { ref: 'highlight' },
            { ref: 'overlay' }
          ]
        }
      ]
    }
  ]
}
