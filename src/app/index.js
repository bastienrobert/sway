import React, { Component } from 'react'
import datas from './datas'
import 'values'

import Art from 'components/Art'

import 'reset-css'
import './styles.scss'

class App extends Component {
  render() {
    const oeuvre = datas.sabine

    return (
      <div className="App">
        <Art {...oeuvre} />
      </div>
    )
  }
}

export default App
