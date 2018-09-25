/*
  eslint
    "react/prefer-stateless-function": "off"
*/
import React from 'react'
import Reflux from 'reflux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import Pagination from 'react-js-pagination'
import LeagueStore from 'stores/league/store'
import LeagueActions from 'stores/league/actions'
import { Text, H5 } from 'components/Text'
import Match from './Match'

const Wrapper = styled.div`
  & > div {
    padding: 24px;
  }
  .paginationContainer {
    margin: 24px 0;
    font-size: 14px;
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      /* border: 1px dotted ${props => props.theme.grey}; */
      li {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px dotted ${props => props.theme.grey};
        margin: 4px 8px;
        &.active {
          background-color: ${props => props.theme.primary};
          border: none;
          a {
            color: ${props => props.theme.snowWhite};
          }
        }
        &.disabled {
          background-color: ${props => props.theme.lightGrey};
          border: none;
          a {
            color: ${props => props.theme.text};
            cursor: default;
          }
        }
        &:first-of-type:not(.disabled),
        &:last-of-type:not(.disabled) {
          /* background-color: ${props => props.theme.darkGrey}; */
          border: 1px solid ${props => props.theme.grey};
          a {
            /* color: ${props => props.theme.snowWhite}; */
          }
        }
        &:nth-of-type(2):not(.disabled),
        &:nth-of-type(8):not(.disabled) {
          border: 1px dashed ${props => props.theme.grey};
          /* background-color: ${props => props.theme.grey}; */
        }
        a {
          text-decoration: none;
          color: ${props => props.theme.text};
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 1.75;
        }
      }
    }
  }
`

class MatchList extends Reflux.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      matchesToShow: [],
    }
    this.store = LeagueStore
    this.storeKeys = [
      'detailedMatches'
    ]
  }

  componentDidMount() {
    this.makeMatchListArray()
  }
  

  makeMatchListArray = (pageNumber = null) => {
    const page = pageNumber || this.state.activePage
    const {
      champions,
      version,
      matches,
    } = this.props
    const matchesToShow = []
    const index = (page - 1) * 10
    for (let i = index; i < index + 10; i++) {
      if (i <= matches.length) {
        const _champ = champions.find(champion => parseInt(champion.key) === matches[i].champion)
        matchesToShow.push(<Match key={matches[i].gameId} version={version} champion={_champ} match={matches[i]}/>)
      }
    }
    LeagueActions.getDetailsForMatches(matchesToShow)
    this.setState({ matchesToShow })
  }

  handlePageChange = pageNumber => {
    this.setState({activePage: pageNumber})
    this.makeMatchListArray(pageNumber)
  }


  render() {
    const {
      theme,
      matches,
    } = this.props
    const {
      activePage,
      matchesToShow,
    } = this.state
    // const matchesToShow = this.makeMatchListArray(activePage)
    return (
      <Wrapper>
        <Card>
          <H5 color={theme.primary} underline underlineStyle="dotted">
            Recent Matches
          </H5>
          {matchesToShow.length > 0
            ? matchesToShow.map(match => match)
            : <Text>
              No Recent Match to display!
            </Text>
          }
          <div className="paginationContainer">
            <Pagination
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={matches.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div> 
        </Card>
      </Wrapper>
    )
  }
}

MatchList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
  champions: PropTypes.arrayOf(PropTypes.object).isRequired,
  version: PropTypes.string.isRequired,
  theme: PropTypes.object,
}

MatchList.defaultProps = {
  theme: {},
}

export default MatchList
