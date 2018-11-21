// @flow
import React from 'react';
import './Game.scss';
import { Map } from '../components/Map';
import { connect } from 'react-redux';
import { getCurrentMap } from '../../shared/selectors/atlas.selectors';
import { Wheel } from '../components/Wheel';

function mapStateToProps(state) {
  return {
    map: getCurrentMap(state),
  };
}

interface GameProps {
  map: {
    key: string,
    tiles: string,
    viewBoxstring: string,
    background: string,
  };
}

function Game(props: GameProps) {
  return (
    <div className="game__wrapper">
      <Map tiles={props.map.tiles} viewBox={props.map.viewBox} />

      <div className="game__wheel">
        <Wheel />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Game);
