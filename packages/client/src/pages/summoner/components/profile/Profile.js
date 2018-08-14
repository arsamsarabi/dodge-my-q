import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SummonerLeagues from './components/SummonerLeagues'
import FavouriteChampions from './components/FavouriteChampions'
import MatchList from './components/MatchList'

const Wrapper = styled.div`
  margin-top: 24px;
  display: flex;
  & > div.summoner_leftcol {
    width: 25%;
    margin-right: 24px;
  }
  & > div.summoner_rightcol {
    width: calc(75% - 24px);
  }
`

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      summoner,
      version,
      theme,
      champions,
    } = this.props
    return (
      <Wrapper>
        <div className="summoner_leftcol">
          <SummonerLeagues
            leagues={summoner.leaguePositions}
            theme={theme}
          />
          <FavouriteChampions
            masteries={summoner.championMasteries}
            display={3}
            version={version}
            theme={theme}
            champions={champions}
          />
        </div>
        <div className="summoner_rightcol">
          <MatchList
            matches={summoner.matches}
            theme={theme}
            version={version}
            champions={champions}
          />
        </div>
      </Wrapper>
    )
  }
}

Profile.propTypes = {}
Profile.defaultProps = {}

export default Profile
