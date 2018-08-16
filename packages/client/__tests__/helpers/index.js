/*
  eslint
  "filenames/match-exported": "off"
*/
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../src/resources/styles/theme';

const renderWithTheme = component => renderer.create(<ThemeProvider theme={theme}>
  {component}
</ThemeProvider>);

export default renderWithTheme;
export { renderWithTheme };
