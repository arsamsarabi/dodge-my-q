/*
  eslint
    "filenames/match-exported": "off",
    "import/extensions": "off"
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GrabImage from 'resources/images/grab.png';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 200px;

`;

const GrabTeemo = props => (
  <Wrapper>
    <img src={GrabImage} alt="Blitzcrank Grabbing Teemo xd"/>
  </Wrapper>
);

GrabTeemo.propTypes = {

};

export default GrabTeemo;
