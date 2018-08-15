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
    return (
      <Wrapper>
        <div className="champImage">
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`}
            alt={champion.name}
          />
        </div>
        <div className="matchDetails">
          <Text>
            {moment(match.timestamp).format('Do/MMM/YYYY hh:mm a')}
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
