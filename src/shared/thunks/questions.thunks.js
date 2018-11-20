// @flow
import axios from 'axios';
import { LOAD_QUESTIONS, LOAD_QUESTIONS_FAILURE, LOAD_QUESTIONS_SUCCESS } from '../actions/questions.actions';
import { guid } from '../utils';

export function loadQuestions(url: string) {
  return async function(dispatch) {
    dispatch({
      type: LOAD_QUESTIONS,
    });

    try {
      const res = await axios.get(url);
      const payload = ((res.data && res.data.categories) || []).map(category => {
        const questions = (category.questions || []).map(question => {
          question.id = question.id || guid();

          return question;
        });

        return {
          ...category,
          questions,
        };
      });

      dispatch({
        type: LOAD_QUESTIONS_SUCCESS,
        payload,
      });
    } catch (e) {
      dispatch({
        type: LOAD_QUESTIONS_FAILURE,
      });
    }
  };
}
