// @flow
import React from 'react';
import { START_GAME } from '../actions/home.actions';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
    startGame() {
      dispatch({
        type: START_GAME,
      });
    },
  };
}

interface HomeProps {
  startGame: () => void;
}

function Home(props: HomeProps) {
  return (
    <div className="home">
      <section className="home__section">
        <button className="home__button" type="button" onClick={props.startGame}>
          Start game
        </button>
      </section>
    </div>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Home);
