import React from 'react'
import Reflux from 'reflux'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import LeagueStore from 'stores/league/store'
import LeagueActions from 'stores/league/actions'


export default class Notifications extends Reflux.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.store = LeagueStore
    this.storeKeys = [
      'notificationOpen',
      'notificationMessage',
    ]
  }
  render() {
    const {
      notificationOpen,
      notificationMessage,
    } = this.state
    return <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={notificationOpen}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      autoHideDuration={6000}
      message={<span id="message-id">{notificationMessage}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={() => LeagueActions.dismissNotification()}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  }
}