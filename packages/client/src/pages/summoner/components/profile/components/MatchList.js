/*
  eslint
    "react/prefer-stateless-function": "off"
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
// import Button from '@material-ui/core/Button';
import { Text, H5 } from 'components/Text'
import Match from './Match'

const Wrapper = styled.div`
  & > div {
    padding: 24px;
  }
`

class MatchList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      matchesToShow: [],
    }
  }

  // componentWillMount() {
  //   const { matchesToShow } = this.state;
  //   this.setState({
  //     matchesToShow: matchesToShow.concat(this.fetchSomeMoreMatches(10, 0)),
  //   });
  // }

  // fetchSomeMoreMatches = (number, from) => {
  //   const { matches } = this.props;
  //   const result = [];
  //   for (let i = 0; i < number || i; i++) {
  //     if (from + i <= matches.length) {
  //       result.push(matches[from + i]);
  //     }
  //   }
  //   return result;
  // }

  // fetchMoreData = () => {
  //   const { matchesToShow } = this.state;
  //   this.setState({
  //     matchesToShow: matchesToShow.concat(this.fetchSomeMoreMatches(10, matchesToShow.length)),
  //   });
  // }

  render() {
    const {
      champions,
      version,
      theme,
      matches,
    } = this.props
    // const { matchesToShow } = this.state;
    return (
      <Wrapper>
        <Card>
          <H5 color={theme.primary} underline underlineStyle="dotted">
            Recent Matches
          </H5>
          {matches.length > 0
            ? matches.map(match => {
              const _champ = champions.find(champion => champion.championId === match.champion)
              return <Match key={match.gameId} version={version} champion={_champ} match={match}/>
            })
            : <Text>
              No Recent Match to display!
            </Text>
          }
          {/* <Button
            onClick={() => this.fetchMoreData()}
            color="primary"
            disabled={matchesToShow.length >= matches.length}
            variant="outlined"
          >
            Load more ...
          </Button> */}
        </Card>
      </Wrapper>
    )
  }
}

MatchList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
  champions: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
  theme: PropTypes.object,
}

MatchList.defaultProps = {
  theme: {},
}

export default MatchList
