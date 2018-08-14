import React from 'react'
import Reflux from 'reflux'
import NotificationSystem from 'react-notification-system'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Card from '@material-ui/core/Card'
import { H1 } from 'components/Text'
import Loading from 'components/loading/Loading'
import REGIONS from 'config/regions'
import { urlFriendly } from 'config/helpers'
import LeagueStore from 'stores/league/store'
import LeagueActions from 'stores/league/actions'
import Wrapper from './Wrapper'

export default class Home extends Reflux.Component {
  constructor(props) {
    super(props)
    this.state = {
      summonerName: '',
      region: 'EUW1',
    }
    this.stores = [
      LeagueStore,
    ]
    this.storeKeys = [
      'isLoading',
    ]
  }

  handleChange = field => event => this.setState({ [field]: event.target.value });

  handleSearch = () => {
    const {
      summonerName,
      region,
    } = this.state
    LeagueActions.getSummonerByName(summonerName, region, this.handleRedirect)
  }

  handleRedirect = () => {
    const { history } = this.props
    const { summonerName, region } = this.state
    history.push(`summoner/${region}/${urlFriendly(summonerName)}`)
  }

  render() {
    const {
      isLoading,
    } = this.state
    return (
      <Wrapper>
        <Card>
          <div className="logo">
            <H1>
              Dodge My Q
            </H1>
          </div>
          <div className="searchbox">
            <div className="searchbox_summoner">
              <TextField
                id="summoner"
                label="Summoner Name"
                value={this.state.summonerName}
                onChange={this.handleChange('summonerName')}
                margin="normal"
                autoFocus
                fullWidth
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.handleSearch()
                  }
                }}
              />
            </div>
            <div className="searchbox_region">
              <FormControl>
                <InputLabel htmlFor="region">
                  Region
                </InputLabel>
                <Select
                  value={this.state.region}
                  onChange={this.handleChange('region')}
                  input={<Input name="region" id="region"/>}
                  autoWidth
                >
                  {REGIONS.map(region => <MenuItem key={region.id} value={region.id}>
                    {region.name}
                  </MenuItem>)}
                </Select>
              </FormControl>
            </div>
            <div className="searchbox_button">
              {isLoading
                ? <Loading width={50} height={50}/>
                : <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleSearch}
                  disabled={!this.state.summonerName || this.state.summonerName.length <= 1 || isLoading}
                >
                  Search
                </Button>
              }
            </div>
          </div>
        </Card>
      </Wrapper>
    )
  }
}
