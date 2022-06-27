import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ProfilePage from './components/pages/ProfilePage'
import HistoryPage from './components/pages/HistoryPage'
import QuotePage from './components/pages/QuotePage'
import Navbar from './components/Navbar'

import './App.css'

export default function App() {
  return (
    <Router>
      <Navbar/>
      <div>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/history" component={HistoryPage} />
          <Route path="/quote" component={QuotePage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    </Router>
  )
}