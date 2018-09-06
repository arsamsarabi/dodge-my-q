import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import Loading from 'components/loading/Loading'
import { H1, H4, Text } from 'components/Text'
import ChampionMastery from './components/ChampionMastery'
import Wrapper from './Wrapper'

const ChampionMasteries = props => {
  const {
    masteries,
    champions,
    version,
  } = props

  console.log('CHAMPIONS', champions)
  console.log('MASTERIES', masteries)

  return (
    <Wrapper>
      <Card className="championMastery_container">
        {masteries.map(mastery => {
          const _champ = champions.find(champ => parseInt(champ.key) === mastery.championId)
          return(
            <div
              key={mastery.championId}
            >
              <ChampionMastery
                champion={_champ}
                mastery={mastery}
                version={version}
              />
            </div>
          )
        })}
      </Card>
    </Wrapper>
  )
}

ChampionMasteries.propTypes = {
  masteries: PropTypes.arrayOf(PropTypes.object).isRequired,
  champions: PropTypes.arrayOf(PropTypes.object).isRequired,
  version: PropTypes.string.isRequired,
}

export default ChampionMasteries