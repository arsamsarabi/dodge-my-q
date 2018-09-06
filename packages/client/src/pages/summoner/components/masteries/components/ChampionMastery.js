import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { Text, H6 } from 'components/Text'
import theme from 'resources/styles/theme'
import {
  getChampionSquareImage,
} from 'config/staticData'


const Wrapper = styled.div`
  display: flex;
  .col-1 {
    margin-right: 12px;
    img {
      width: 50px;
    }
  }
  .col-2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 14px;
  }
`

const ChampionsMastery = props => {
  const {
    champion,
    mastery,
    version
  } = props
  
  return (
    <Wrapper>
      <div className="col-1">
        <img src={getChampionSquareImage(version, champion.id)} alt={champion.name}/>
      </div>
      <div className="col-2">
        <div>
          <Text>{`Level ${mastery.championLevel} ${champion.name}`}</Text>
        </div>
        <div>
          <Text>{`Points ${mastery.championPoints}`}</Text>
          <Text>{`Last played ${moment(mastery.lastPlayTime).format('Do MMM YYYY')}`}</Text>  
        </div>
      </div>
    </Wrapper>
  )
}

ChampionsMastery.propTypes = {
  champion: PropTypes.object.isRequired,
  mastery: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
}

ChampionsMastery.defaultProps = {}

export default ChampionsMastery
