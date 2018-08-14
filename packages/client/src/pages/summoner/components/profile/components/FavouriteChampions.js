import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import styled from 'styled-components'
import moment from 'moment'
import { Text, H5 } from 'components/Text'

const Wrapper = styled.div`
  margin-top: 24px;
  & > div {
    padding: 24px;
    width: 100%;
    h6 {
      font-size: 0.8rem;
      margin-bottom: 24px;
    }
  }
  .champions {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    & > div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      & > img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-right: 12px;
        box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.3);
      }
      & > .favchamp_details {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        & > p {
          font-size: 0.8rem;
          & > span {
            margin-right: 4px;
          }
        }
      }
      &:not(:first-of-type) {
        margin-top: 24px;
      }
    }
  }
`

class FavouriteChampions extends Component {
  getDisplayArray = (champions, display) => {
    const result = []
    for (let i = 0; i < display; i++) {
      result.push(champions[i])
    }
    return result
  }

  getChampionNameById = id => {
    const { champions } = this.state
    return champions.find(champion => champion.championId === id).name
  }

  render() {
    const {
      masteries,
      champions,
      display,
      version,
      theme,
    } = this.props

    const displayArray = this.getDisplayArray(masteries, display)

    displayArray.forEach(_champ => {
      _champ.friendlyDate = moment(_champ.lastPlayTime).format('Do/MMM/YY')
    })

    return (
      <Wrapper>
        <Card>
          <H5 color={theme.primary} underline underlineStyle="dotted">
          Top Champions:
          </H5>
          <div className="champions">
            {displayArray.map(championMastery => {
              const _champ = champions.find(champion => champion.championId === championMastery.championId)
              return (
                <div key={_champ.championId}>
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${_champ.key}.png`}
                    alt={_champ.name}
                  />
                  <div className="favchamp_details">
                    <Text>
                      {_champ.name}
                    </Text>
                    {/* <Text>
                    <span></span>
                    {championMastery.championLevel}
                  </Text> */}
                    <Text>
                      {/* <span>
                      MP:
                      </span> */}
                      {championMastery.championPoints}
                    </Text>
                    {/* <Text>
                    <span></span>
                    {championMastery.chestGranted}
                  </Text> */}
                    <Text>
                      {/* <span>
                      Played:
                      </span> */}
                      {championMastery.friendlyDate}
                    </Text>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </Wrapper>
    )
  }
}

FavouriteChampions.propTypes = {
  masteries: PropTypes.arrayOf(PropTypes.object).isRequired,
  champions: PropTypes.object.isRequired,
  display: PropTypes.number,
  version: PropTypes.string.isRequired,
  theme: PropTypes.object,
}

FavouriteChampions.defaultProps = {
  display: 3,
  theme: {},
}

export default FavouriteChampions
