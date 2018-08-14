import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pixelSprite from 'resources/images/pixel_sprite.png';
import { Text } from 'components/Text';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  span {
    display: inline-block;
    width: 35px;
    height: 35px;
    overflow: hidden;
    background-image: url(${pixelSprite});
    background-repeat: no-repeat;
    background-position: ${props => props.pos[0]}px ${props => props.pos[1]}px;
    margin-right: 6px;
  }
`;

const LeagueIconsHelper = ({ text, pos }) => (
  <Wrapper pos={pos}>
    <span/>
    <Text>
      {text}
    </Text>
  </Wrapper>
);

LeagueIconsHelper.propTypes = {
  text: PropTypes.string.isRequired,
  pos: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default LeagueIconsHelper;
