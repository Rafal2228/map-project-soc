// @flow
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { questionsReducer } from './shared/reducers/questions.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  questions: questionsReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
