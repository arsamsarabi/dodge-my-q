/*
  eslint
    "import/no-unresolved": "off",
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { H4 } from 'components/Text'
import Wrapper from './Wrapper'
import routes from './routes'

class Navbar extends Component {

  handleOnClick = path => {
    const {
      history: {
        location: {
          pathname,
        },
      },
    } = this.props

    if (pathname.indexOf(path) === -1) {
      this.props.history.push(path)
    }
  }

  render() {
    return (
      <Wrapper>
        <div className="container">
          <H4>
            DmQ
          </H4>
          <div className="navigation">
            {routes.map(route => <Button
              key={route.id}
              onClick={() => this.handleOnClick(route.path)}
            >
              {route.icon}
              {route.name}
            </Button>)}
          </div>
        </div>
      </Wrapper>
    )
  }
}

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Navbar
