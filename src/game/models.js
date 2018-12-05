// @flow

export interface Question {
  id: string;
  content: string;
}

export interface Category {
  questions: Question[];
  name: string;
}

export interface QuestionWithCategory extends Question {
  categoryName: string;
}
