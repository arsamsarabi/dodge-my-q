import React from 'react'
import Reflux from 'reflux'
import moment from 'moment'
// import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import RefreshRounded from '@material-ui/icons/RefreshRounded'
import LeagueStore from 'stores/league/store'
import LeagueActions from 'stores/league/actions'
import Loading from 'components/loading/Loading'
import { H4, Text } from 'components/Text'
import { gameModes } from 'config/staticData'
import REGIONS from 'config/regions'
import Team from './components/team'
import Wrapper from './Wrapper'

class LiveMatch extends Reflux.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.stores = [
      LeagueStore,
    ]
    this.storeKeys = [
      'match',
      'isLoading',
      'ddVersion',
      'champions',
    ]
  }

  componentDidMount() {
    const { match } = this.state
    const { summonerName, region } = this.props.match.params
    if (!match) {
      LeagueActions.lookupLiveMatchBySummonerName(summonerName, region)
    }
  }

  render() {
    const {
      match,
      isLoading,
      ddVersion,
      champions,
    } = this.state

    console.log('match', match)
    
    return (
      <Wrapper>
        {!match || isLoading
          ? <Loading/>
          : <div className="match">
            <Card className="match_info">
              <div className="details">
                <div className="row row_one">
                  <Text>{`Started at: ${moment(match.gameStartTime).format('hh:mma')}`}</Text>
                  <Text>{`${(match.gameLength/60).toFixed(0)} minutes into the game`}</Text>
                  <Text>{REGIONS.find(region => region.id === match.platformId).name}</Text>
                </div>
                <div className="row row_two">
                  {match.gameType === 'CUSTOM_GAME' || match.gameType === 'TUTORIAL_GAME'
                    ? <Text>{`Game Mode: ${match.gameType}`}</Text>
                    : ''
                  }
                  <H4>{`${gameModes(match.gameMode)}`}</H4>
                  <H4>{
                    gameModes(match.gameMode) === 'Classic Game' && '-'
                  }</H4>
                  <H4>{gameModes(match.gameMode) === 'Classic Game'
                    ? match.participants.length === 10
                      ? 'Summoner\'s Rift'
                      : 'Twisted Treeline'
                    : ''
                  }</H4>
                  <IconButton
                    variant="outlined"
                    color="primary"
                    onClick={this.handleSearch}
                  >
                    <RefreshRounded/>
                  </IconButton>
                </div>
              </div>
            </Card>
            <Card className="teams">
              <Team
                players={match.participants.filter(player => player.teamId === 100)}
                bans={match.bannedChampions.filter(champ => champ.teamId === 100)}
                color="blue"
                ddVersion={ddVersion}
                champions={champions}
              />
              <Team
                players={match.participants.filter(player => player.teamId === 200)}
                bans={match.bannedChampions.filter(champ => champ.teamId === 200)}
                color="red"
                ddVersion={ddVersion}
                champions={champions}
              />
            </Card>
          </div>
        }
      </Wrapper>
    )
  }
}

export default LiveMatch