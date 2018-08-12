import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { AppContainer } from 'react-hot-loader'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from 'resources/styles/theme'
import Router from './Router'

const apollo = new ApolloClient({
  uri: 'http://localhost:4123/gql'
}) 

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      light: theme.primary,
      main: theme.primary,
      dark: theme.primary,
    },
    secondary: {
      light: theme.secondary,
      main: theme.secondary,
      dark: theme.secondary,
    },
  },
});

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={apollo}>
        <ThemeProvider theme={theme}>
          <MuiThemeProvider theme={muiTheme}>
            <Component/>
          </MuiThemeProvider>
        </ThemeProvider>
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(Router);

if (module.hot) {
  module.hot.accept('./Router.js', () => {
    render(Router);
    render(require('./Router'));
  });
}
