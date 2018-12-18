export default [
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
        ref: 'lightning',
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
      }
    ]
  }
]
