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
          ref: 'clouds',
          children: [{ ref: 'dark' }, { ref: 'double' }, { ref: 'single' }]
        },
        {
          ref: 'waves',
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
          ref: 'lightnings',
          children: [
            { ref: 'left' },
            { ref: 'middleLeft' },
            { ref: 'middleRight' },
            { ref: 'right' }
          ]
        },
        {
          ref: 'clouds',
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
    },
    {
      ref: 'drown',
      children: [
        {
          ref: 'redSea',
          children: [
            {ref: 'lighter'},
            {ref: 'grey'},
            {ref: 'black'},
            {ref: 'flashGrey'},
            {ref: 'flashRedDark'},
            {ref: 'flashRedLight'}
          ]
        },
        {
          ref: 'blueSea',
          children: [
            {ref: 'firstPointBlue'},
            {ref: 'secondPointBlue'},
            {ref: 'firstDarkBlue'},
            {ref: 'secondDarkBlue'},
            {ref: 'firstDarkerBlue'},
            {ref: 'secondDarkerBlue'},
            {ref: 'firstBlue'},
            {ref: 'secondBlue'}
          ]
        },
        {
          ref: 'floatting',
          children: [
            {ref: 'woodOne'},
            {ref: 'woodTwo'},
            {ref: 'woodThree'},
            {ref: 'boatOne'},
            {ref: 'sailOne'},
            {ref: 'sailTwo'}
          ]
        },
        {
          ref: 'drowning',
          children: [
            {ref: 'background'},
            {ref: 'basAP'},
            {ref: 'boisAP'},
            {ref: 'boisGaucheAP'},
            {ref: 'boisGauchePPOne'},
            {ref: 'boisGauchePPTwo'},
            {ref: 'boisPP'},
            {ref: 'boisRouge'},
            {ref: 'droiteAP'},
            {ref: 'droitePP'},
            {ref: 'gauchePP'},
            {ref: 'hautAP'},
            {ref: 'droiteAP'},
            {ref: 'droitePP'},
            {ref: 'gauchePP'},
            {ref: 'hautAP'},
            {ref: 'mask'},
            {ref: 'voileOne'},
            {ref: 'voileTwo'},
            {ref: 'voileThree'}
          ]
        }
      ]
    }
  ]
}
