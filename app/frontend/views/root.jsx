import React, { Fragment, Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import Home from './home'
import About from './about'
import Contact from './contact'

class Root extends Component {
  state = {}

  render() {
    return (
      <Fragment>
        <h1>{this.state.title}</h1>
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
        </Switch>
      </Fragment>
    )
  }
}

export default Root
