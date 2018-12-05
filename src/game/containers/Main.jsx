// @flow
import React from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import Home from './Home';
import { MapBackground } from '../components/MapBackground';
import { MAP_VIEWBOX, MAP_BACKGROUND_ISLANDS, MAP_BACKGROUND_COORDINATES } from '../constants';

function mapStateToProps(state) {
  const { started } = state && state.game;

  return {
    started,
  };
}

interface MainProps {
  started: boolean;
}

function Main(props: MainProps) {
  const { started } = props;
  let content = null;

  if (started) {
    content = <Game />;
  } else {
    content = <Home />;
  }

  return (
    <MapBackground viewBox={MAP_VIEWBOX} islands={MAP_BACKGROUND_ISLANDS} coordinates={MAP_BACKGROUND_COORDINATES}>
      {content}
    </MapBackground>
  );
}

export default connect(mapStateToProps)(Main);
