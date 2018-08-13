/*
  eslint
    "filenames/match-regex": "off",
*/

import React from 'react'
import Reflux from 'reflux'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import LeagueStore from 'stores/league/store'
import LeagueActions from 'stores/league/actions'
import Navbar from 'components/navbar/Navbar'
import GrabTeemo from 'components/grabTeemo'
import Loading from 'components/loading/Loading'
import Home from 'pages/home/Home'
import LiveMatch from 'pages/livematch/LiveMatch'
import Wrapper from './Wrapper'
import './resources/styles/reset.css'
import './resources/styles/styles.css'

class Router extends Reflux.Component {
  constructor(props) {
    super(props)
    this.stores = [LeagueStore]
    this.storeKeys = [
      'ddVersion',
      'champions',
    ]
  }

  componentDidMount() {
    if (!this.state.champions) {
      LeagueActions.getChampions()
    }
  }

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

export default hot(module)(Router)
