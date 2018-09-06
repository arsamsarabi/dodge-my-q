/*
  eslint
    "react/destructuring-assignment": "off"
*/

import React from 'react'
import PropTypes from 'prop-types'
import Reflux from 'reflux'
import styled from 'styled-components'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Loading from 'components/loading/Loading'
import {Text, H1, H2, H3} from 'components/Text'
import LeagueStore from 'stores/league/store'
import LeagueActions from 'stores/league/actions'
import theme from 'resources/styles/theme'
import IconsSprite from 'resources/images/pixel_sprite.png'
import { pageContainer } from '../../resources/styles/helpers'
import SummonerProfile from './components/profile/Profile'
import SummonerDetails from './components/SummonerDetails'
import ChampionMasteries from './components/masteries'
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
  padding-bottom: 48px;
  main{
    .tablist-container {
      margin-top: 24px;
      ul.react-tabs__tab-list {
        height: 75px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      .profile-tab,
      .masteries-tab,
      .match-tab {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        flex: 1;
        height: 100%;
        background-color: ${props => props.theme.snowWhite};
        transition: 0.3s all ease-in-out;
        &:hover {
          background-color: ${props => props.theme.white};
          transition: 0.3s all ease-in-out;
        }
        &:not(:last-of-type) {
          border-right: 1px dotted ${props => props.theme.grey}
        }
        span {
          display: block;
          width: 35px;
          height: 35px;
          overflow: hidden;
          background-repeat: no-repeat;
          background-image: url(${IconsSprite});
          margin-right: 6px;
        }
      }
      .profile-tab {
        span{
          background-position: -204px -716px;
        }
      }
      .masteries-tab {
        span{
          background-position: -201px -884px;
        }
      }
      .match-tab {
        &.offline {
          cursor: initial;
          pointer-events: none;
          P {
            color: ${props => props.theme.grey}
          }          
          span{
            opacity: 0.3;
          }
        }
        span{
          background-position: 0 -850px;
        }
      }
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
    LeagueActions.updateSummoner(this.state.summoner.summonerName, this.state.summoner.region)
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

    // console.log('SUMMONER', summoner.championMasteries)
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
          <Tabs>
            <Card className="tablist-container">
              <TabList>
                <Tab className="profile-tab">
                  <span/>
                  <Text>Profile</Text>
                </Tab>
                <Tab className="masteries-tab">
                  <span/>                  
                  <Text>Champion Masteries</Text>
                </Tab>
                <Tab className={['match-tab', match === undefined ? 'offline' : '' ].join(' ')}>
                  <span/>
                  <Text>{`Live Match ${match === undefined && '(Offline)'}`}</Text>
                </Tab>
              </TabList>
            </Card>

            <TabPanel>
              <SummonerProfile
                summoner={summoner}
                version={ddVersion}
                theme={theme}
                champions={champions}
              />
            </TabPanel>
            <TabPanel>
              <ChampionMasteries
                masteries={summoner.championMasteries}
                champions={champions}
                version={ddVersion}
              />
            </TabPanel>
            <TabPanel>
              <LiveMatch />
            </TabPanel>

          </Tabs>
        </main>
      </Wrapper>
    )
  }
}
