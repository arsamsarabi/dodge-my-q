/*
  eslint
    "react/destructuring-assignment": "off"
*/

import React from 'react'
import PropTypes from 'prop-types'
import Reflux from 'reflux'
import styled from 'styled-components'
import SwipeableViews from 'react-swipeable-views'
import Card from '@material-ui/core/Card'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Loading from 'components/loading/Loading'
import LeagueStore from 'stores/league/store'
import LeagueActions from 'stores/league/actions'
import theme from 'resources/styles/theme'
import IconsSprite from 'resources/images/pixel_sprite.png'
import { pageContainer } from '../../resources/styles/helpers'
import SummonerProfile from './components/profile/Profile'
import SummonerDetails from './components/SummonerDetails'
import LiveMatch from './components/live/LiveMatch'

function TabContainer({ children }) {
  return (
    <Typography component="div">
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const Wrapper = styled.div`
  ${pageContainer()}
  main{
    .tabsCard {
      margin-top: 24px;
    }
    .profileTabButton,
    .matchTabButton {
      & > span:first-of-type {
        display: flex;
        flex-direction: row;
      }
    }
    .profileTabButton {
      
    }
    .matchTabButton {

    }
    .profileTabIcon,
    .matchTabIcon {
      width: 35px;
      height: 35px;
      overflow: hidden;
      background-repeat: no-repeat;
      background-image: url(${IconsSprite});
    }
    .profileTabIcon {
      background-position: -204px -716px;
    }
    .matchTabIcon {
      background-position: 0 -850px;
    }
  }
`

Wrapper.propTypes = {
  theme: PropTypes.object,
}

Wrapper.defaultProps = {
  theme: {},
}

export default class Summoner extends Reflux.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
    this.stores = [LeagueStore]
    this.storeKeys = [
      'summoner',
      'ddVersion',
      'champions',
      'match',
    ]
  }

  componentDidMount() {
    if (!this.state.summoner) {
      LeagueActions.getSummonerByName(
        this.props.match.params.summoner,
        this.props.match.params.region
      )
    }
    if (
      !this.state.champions
      || !this.state.ddVersion
    ) {
      LeagueActions.init()
    }
  }

  componentWillUnmount() {
    LeagueActions.reset()
  }

  handleOnUpdateSummoner = () => {
    LeagueActions.updateSummoner(this.state.summoner.region, this.state.summoner.summonerName)
  }

  handleChange = (event, value) => {
    this.setState({ value })
  };

  handleChangeIndex = index => {
    this.setState({ value: index })
  };

  render() {
    if (
      !this.state.summoner ||
      !this.state.ddVersion ||
      !this.state.champions
    ) {
      return <Loading/>
    }

    const {
      summoner,
      ddVersion,
      value,
      champions,
      match,
    } = this.state

    // console.log('SUMMONER MATCHES', summoner.matches)
    // console.log(match)
    return (
      <Wrapper>
        <SummonerDetails
          summoner={summoner}
          ddVersion={ddVersion}
          theme={theme}
          updateSummoner={this.handleOnUpdateSummoner}
        />
        <main>
          <Card className="tabsCard">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab
                className="profileTabButton"
                label="Profile"
                icon={<span className="profileTabIcon"/>}
              />
              <Tab
                className="matchTabButton"
                label="Live Match"
                icon={<span className="matchTabIcon"/>}
                disabled={match === undefined}
              />
            </Tabs>
          </Card>
          <SwipeableViews
            axis="x"
            index={value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer dir={theme.direction}>
              <SummonerProfile
                summoner={summoner}
                version={ddVersion}
                theme={theme}
                champions={champions}
              />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <LiveMatch />
            </TabContainer>
          </SwipeableViews>
        </main>
      </Wrapper>
    )
  }
}
