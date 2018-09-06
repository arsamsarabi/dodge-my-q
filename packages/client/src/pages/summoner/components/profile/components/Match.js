/*
  eslint
    "react/prefer-stateless-function": "off"
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { darken } from 'polished'
import moment from 'moment'
import { Text } from 'components/Text'
import {
  getChampionSquareImage,
} from 'config/staticData'

const Wrapper = styled.div`
  border: 1px dotted ${props => darken(0.2, `${props.theme.lightGrey}`)};
  border-radius: 5px;
  padding: 12px;
  margin-top: 12px;
  display: flex;
  & > div.champImage {
    width: 75px;
    margin-right: 12px;
    & > img {
      height: auto;
      border-radius: 5px;
      box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.3);
    }
  }
  & > div.matchDetails {
    
  }
`

class Match extends React.Component {
  render() {
    const {
      match,
      champion,
      version,
    } = this.props

    console.log('MATCH', match)
    console.log('CHAMPION', champion)
    
    return (
      <Wrapper>
        <div className="champImage">
          <img
            src={getChampionSquareImage(version,champion.id)}
            alt={champion.name}
          />
        </div>
        <div className="matchDetails">
          <Text>
            {moment(match.timestamp).format('Do MMM hh:mm a')}
          </Text>
          <Text>
            {`Lane: ${match.lane}`}
          </Text>
        </div>
      </Wrapper>
    )
  }
}

Match.propTypes = {
  match: PropTypes.object.isRequired,
  champion: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
}

Match.defaultProps = {}

export default Match
