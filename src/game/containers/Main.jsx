// @flow
import React from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import Home from './Home';

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

  if (started) {
    return <Game />;
  }

  return <Home />;
}

export default connect(mapStateToProps)(Main);
