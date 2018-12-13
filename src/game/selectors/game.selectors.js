// @flow
import { createSelector } from 'reselect';

function getQuestionsState(state) {
  return state.questions;
}

function getCategories(state) {
  return state.questions && state.questions.categories;
}

export const getCategoriesNames = createSelector(
  getCategories,
  function(categories) {
    return (categories || []).reduce((acc, cat) => {
      acc.push(cat.name);
      return acc;
    }, []);
  }
);

const getFlatQuestionsWithCategories = createSelector(
  getCategories,
  function(categories) {
    if (!categories) {
      return [];
    }

    return categories.reduce((acc, cat) => {
      const questionsWithCategories = (cat.questions || []).map(q => ({ ...q, categoryName: cat.name }));
      acc.push(...questionsWithCategories);

      return acc;
    }, []);
  }
);

export function getGameState(state: any) {
  return state.game;
}

export const getCurrentQuestion = createSelector(
  getFlatQuestionsWithCategories,
  getGameState,
  function(flatQuestions, gameState) {
    if (!gameState.currentQuestion) {
      return null;
    }

    return flatQuestions.find(q => q.id === gameState.currentQuestion);
  }
);

const getSkippedQuestions = createSelector(
  getGameState,
  function(gameState) {
    return gameState.skippedQuestions;
  }
);

const getAnsweredQuestionIds = createSelector(
  getGameState,
  function(gameState) {
    return gameState.answeredQuestions;
  }
);

export const getAnsweredQuestions = createSelector(
  getFlatQuestionsWithCategories,
  getAnsweredQuestionIds,
  function(flatQuestions, answeredQuestions) {
    const answered = [...(answeredQuestions || [])];

    return answered.map(id => flatQuestions.find(q => q.id === id));
  }
);

export const getLeftQuestions = createSelector(
  getFlatQuestionsWithCategories,
  getSkippedQuestions,
  getAnsweredQuestionIds,
  function(flatQuestions, skippedQuestions, answeredQuestions) {
    const used = [...(skippedQuestions || []), ...(answeredQuestions || [])];

    return flatQuestions.filter(q => used.indexOf(q.id) === -1);
  }
);

export const getBonusQuestion = createSelector(
  getQuestionsState,
  function(questions) {
    return questions.bonusQuestion;
  }
);

export const getBonusQuestionAnswered = createSelector(
  getGameState,
  function(state) {
    return state.bonusQuestionAnswered;
  }
);
