// @flow
import React from 'react';
import { START_GAME } from '../actions/home.actions';
import { connect } from 'react-redux';
import { WithFileInput } from '../components/WithFileInput';
import { changeQuestions } from '../thunks/questions.thunks';
import './Home.scss';

const ChangeQuestionsButton = WithFileInput(props => <button {...props} />);

const mapDispatchToProps = {
  startGame() {
    return function(dispatch) {
      dispatch({
        type: START_GAME
      });
    };
  },
  changeQuestions
};

interface HomeProps {
  startGame: () => void;
  changeQuestions: (files: File[]) => void;
}

function Home(props: HomeProps) {
  return (
    <div className="home">
      <section className="home__section">
        <h1>Gotowi do startu?</h1>
        <button className="home__button" type="button" onClick={props.startGame}>
          Zaczynamy
        </button>
        <br />
        <br />
        <ChangeQuestionsButton
          className="home__button"
          accept=".json,application/json"
          multiple={false}
          onSelected={props.changeQuestions}
        >
          Zmień pytania
        </ChangeQuestionsButton>
      </section>
    </div>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Home);
