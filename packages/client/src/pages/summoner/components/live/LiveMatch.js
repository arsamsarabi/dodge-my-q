import React from 'react'
import Reflux from 'reflux'
import moment from 'moment'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import RefreshRounded from '@material-ui/icons/RefreshRounded'
import LeagueStore from 'stores/league/store'
import LeagueActions from 'stores/league/actions'
import Loading from 'components/loading/Loading'
import { H1, H4, Text } from 'components/Text'
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
      'errorMessages',
      'runes',
    ]
  }

  componentDidMount() {
    const { summoner } = this.props
    if (!this.state.match) {
      LeagueActions.lookupLiveMatch(summoner.summonerId, summoner.region)
    }
  }

  render() {
    const {
      match,
      isLoading,
      errorMessages,
      runes,
    } = this.state
    const {
      version,
      champions,
    } = this.props

    const matchIsLoading = !match && isLoading
    const matchNotFound = !match && !isLoading

    if (matchIsLoading) return <Loading/>

    if (matchNotFound) return null
    
    // console.log('match', match)
    return (
      <Wrapper>
        <div className="match">
          <div>
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
                ddVersion={version}
                champions={champions}
                runes={runes}
              />
              <Team
                players={match.participants.filter(player => player.teamId === 200)}
                bans={match.bannedChampions.filter(champ => champ.teamId === 200)}
                color="red"
                ddVersion={version}
                champions={champions}
                runes={runes}
              />
            </Card>
          </div>
        </div>
      </Wrapper>
    )
  }
}

LiveMatch.propTypes = {
  champions: PropTypes.arrayOf(PropTypes.object).isRequired,
  summoner: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
}

export default LiveMatch