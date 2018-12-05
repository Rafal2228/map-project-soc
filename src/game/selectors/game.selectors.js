// @flow
import { createSelector } from 'reselect';

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

const getAnsweredQuestions = createSelector(
  getGameState,
  function(gameState) {
    return gameState.answeredQuestions;
  }
);

export const getLeftQuestions = createSelector(
  getFlatQuestionsWithCategories,
  getSkippedQuestions,
  getAnsweredQuestions,
  function(flatQuestions, skippedQuestions, answeredQuestions) {
    const used = [...(skippedQuestions || []), ...(answeredQuestions || [])];

    return flatQuestions.filter(q => used.indexOf(q.id) === -1);
  }
);
