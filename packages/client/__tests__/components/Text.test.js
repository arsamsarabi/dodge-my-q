import 'jest-styled-components'
import React from 'react'
import { H1, H2, H3, H4, H5, H6, Text } from '../../src/components/Text'
import { renderWithTheme } from '../helpers'
import { theme } from '../../src/resources/styles/theme'

describe('Heading element', () => {
  it('Should render a Text element', () => {
    const component = renderWithTheme(<Text>
      Text Paragraph
    </Text>).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('Should render a Text element with theme', () => {
    const component = renderWithTheme(<Text underline theme={theme}>
      Themed Text Paragraph
    </Text>).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('Should render a Text element without theme', () => {
    const component = renderWithTheme(<Text underline theme={{}}>
      Not themed Text Paragraph
    </Text>).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('Should render a H1 element', () => {
    const component = renderWithTheme(<H1>
      H1 Heading
    </H1>).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('Should render a H2 element', () => {
    const component = renderWithTheme(<H2>
      H2 Heading
    </H2>).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('Should render a H3 element', () => {
    const component = renderWithTheme(<H3>
      H3 Heading
    </H3>).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('Should render a H4 element', () => {
    const component = renderWithTheme(<H4>
      H4 Heading
    </H4>).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('Should render a H5 element', () => {
    const component = renderWithTheme(<H5>
      H5 Heading
    </H5>).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('Should render a H6 element', () => {
    const component = renderWithTheme(<H6>
      H6 Heading
    </H6>).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('Should render an underlined heading element', () => {
    const component = renderWithTheme(<H1 underline>
      Underlined H1 Heading
    </H1>).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('Should render an underlined dotted heading element', () => {
    const component = renderWithTheme(<H1 underline underlineStyle="dotted">
      Underlined Dotted H1 Heading
    </H1>).toJSON()
    expect(component).toMatchSnapshot()
  })
  it('Should render an underlined dashed heading element', () => {
    const component = renderWithTheme(<H1 underline underlineStyle="dashed">
      Underlined Dashed H1 Heading
    </H1>).toJSON()
    expect(component).toMatchSnapshot()
  })
})
