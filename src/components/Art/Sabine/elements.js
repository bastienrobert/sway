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
            { ref: 'leftLight' },
            { ref: 'leftDark' },
            { ref: 'leftTransparent' },
            { ref: 'rightLight' },
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
      ref: 'calle',
      children: [
        { ref: 'ocean' },
        { ref: 'background' },
        { ref: 'metalBox' },
        {
          ref: 'clouds',
          children: [{ ref: 'one' }, { ref: 'two' }, { ref: 'three' }]
        }
      ]
    },
    {
      ref: 'statue',
      children: [
        { ref: 'statue' },
        {
          ref: 'cottons',
          children: [
            { ref: 'one' },
            { ref: 'two' },
            { ref: 'three' },
            { ref: 'four' },
            { ref: 'five' },
            { ref: 'six' },
            { ref: 'seven' }
          ]
        }
      ]
    },
    {
      ref: 'storm',
      children: [
        {
          ref: 'breakbot',
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
          ref: 'crash',
          children: [
            {
              ref: 'redSea',
              children: [
                { ref: 'lighter' },
                { ref: 'grey' },
                { ref: 'black' },
                { ref: 'flashGrey' },
                { ref: 'flashRedDark' },
                { ref: 'flashRedLight' }
              ]
            },
            {
              ref: 'floatting',
              children: [
                { ref: 'woodOne' },
                { ref: 'woodTwo' },
                { ref: 'woodThree' },
                { ref: 'boatOne' },
                { ref: 'sailOne' },
                { ref: 'sailTwo'}
              ]
            }
            
          ]
        }
      ]
    },
    {
      ref: 'drown',
      children: [
        {
          ref: 'blueSea',
          children: [
            { ref: 'firstPointBlue' },
            { ref: 'secondPointBlue' },
            { ref: 'firstDarkBlue' },
            { ref: 'secondDarkBlue' },
            { ref: 'firstDarkerBlue' },
            { ref: 'secondDarkerBlue' },
            { ref: 'firstBlue' },
            { ref: 'secondBlue' }
          ]
        },
        {
          ref: 'drowning',
          children: [
            { ref: 'background' },
            { ref: 'basAP' },
            { ref: 'boisAP' },
            { ref: 'boisGaucheAP' },
            { ref: 'boisGauchePPOne' },
            { ref: 'boisGauchePPTwo' },
            { ref: 'boisPP' },
            { ref: 'boisRouge' },
            { ref: 'droiteAP1' },
            { ref: 'droitePP1' },
            { ref: 'gauchePP1' },
            { ref: 'hautAP1' },
            { ref: 'droiteAP' },
            { ref: 'droitePP' },
            { ref: 'gauchePP' },
            { ref: 'hautAP' },
            { ref: 'mask' },
            { ref: 'voileOne' },
            { ref: 'voileTwo' },
            { ref: 'voileThree' }
          ]
        }
      ]
    }
  ]
}
