import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Landing from './Landing'
import NotFound from './NotFound'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/restaurant/:restaurantId' component={App} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default Routes