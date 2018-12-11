import React, { Component } from 'react'

import Router from './Router'
import routes from './routes'
import 'values'

import 'reset-css'
import './styles.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router {...routes} />
      </div>
    )
  }
}

export default App
