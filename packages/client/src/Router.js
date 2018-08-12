/*
  eslint
    "filenames/match-regex": "off",
*/

import React from 'react'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Navbar from 'components/navbar/Navbar'
import GrabTeemo from 'components/grabTeemo'
import Loading from 'components/loading/Loading'
import Home from 'pages/home/Home'
import LiveMatch from 'pages/livematch/LiveMatch'
import Wrapper from './Wrapper'
import './resources/styles/reset.css'
import './resources/styles/styles.css'

class Router extends React.Component {

  render() {
    return (
      <HashRouter>
        <div>
          <Wrapper>
            <Route exact path="/" render={() => <Redirect to="/home"/>}/>
            <Route path="*" component={Navbar}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/livematch/:region/:summonerName" component={LiveMatch}/>
          </Wrapper>
          <Route exact path="/home" component={GrabTeemo}/>
          <Route exact path="/loading" component={Loading}/>
        </div>
      </HashRouter>
    )
  }
}

export default hot(module)(Router);
