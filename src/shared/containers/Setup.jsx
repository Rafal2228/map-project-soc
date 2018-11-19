// @flow
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { loadQuestions } from '../thunks/questions.thunks';

function mapDispatchToProps(dispatch) {
  return {
    loadQuestions(url: string) {
      loadQuestions(url)(dispatch);
    },
  };
}

interface SetupProps {
  loadQuestions: (url: string) => void;
}

class Setup extends Component<SetupProps> {
  componentDidMount() {
    this.props.loadQuestions('/assets/questions.json');
  }

  render() {
    return this.props.children;
  }
}

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(Setup);
