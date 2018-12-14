import React, { Component } from 'react'
import 'values'

import Art from 'components/Art'

import 'reset-css'
import './styles.scss'

class App extends Component {
  render() {
    const oeuvre = 'sabine'

    return (
      <div className="App">
        <Art oeuvre={oeuvre} />
      </div>
    )
  }
}

export default App
