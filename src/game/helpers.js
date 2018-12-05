import { guid } from '../shared/utils';

export function parseQuestions(data) {
  return ((data && data.categories) || []).map(category => {
    const questions = (category.questions || []).map(question => {
      question.id = question.id || guid();

      return question;
    });

    return {
      ...category,
      questions,
    };
  });
}
