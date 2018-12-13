import { guid } from '../shared/utils';

export function parseQuestions(data) {
  const categories = ((data && data.categories) || []).map(category => {
    const questions = (category.questions || []).map(question => {
      question.id = question.id || guid();

      return question;
    });

    return {
      ...category,
      questions
    };
  });

  const bonusQuestion =
    data && data.bonusQuestion
      ? {
          ...data.bonusQuestion,
          id: data.bonusQuestion.id || guid()
        }
      : null;

  return {
    categories,
    bonusQuestion
  };
}
