// @flow
import React, { Component } from 'react';
import './Game.scss';
import { Map } from '../components/Map';
import { connect } from 'react-redux';
import { Wheel } from '../components/Wheel';
import { WHEEL_SPIN_DURATION } from '../constants';
import { easeQuadOut } from 'd3-ease';

function mapStateToProps(state) {
  return {
    map: getCurrentMap(state),
  };
}

function mapDispatchToProps(dispatch) {
  return 
}

interface GameProps {
  map: {
    key: string,
    tiles: string,
    viewBoxstring: string,
    background: string,
  };
}

class Game extends Component<GameProps> {
  audioRef = React.createRef();
  state = {
    selectedColorIndex: 0,
    colors: ['#FCFFFC', '#2BA84A'],
    spinDuration: WHEEL_SPIN_DURATION,
  };

  handleSpin = () => {
    const { current: audio } = this.audioRef;

    if (!audio) {
      return;
    }

    this.setState(state => {
      audio.play();

      return {
        selectedColorIndex: Math.floor(Math.random() * state.colors.length),
      };
    });
  };

  render() {
    const { props, state } = this;

    return (
      <div className="game__wrapper">
        <audio src="/assets/lucky-spin-sound.mp3" hidden ref={this.audioRef} />

        <Map tiles={props.map.tiles} viewBox={props.map.viewBox} />

        <div className="game__wheel">
          <Wheel
            onSpin={this.handleSpin}
            angle={20}
            numberOfSpins={this.audioRef.current ? 3 : 0}
            selectedColorIndex={state.selectedColorIndex}
            colors={state.colors}
            config={{
              duration: state.spinDuration,
              easing: easeQuadOut,
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Game);
