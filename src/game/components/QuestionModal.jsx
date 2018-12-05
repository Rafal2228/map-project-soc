// @flow
import React from 'react';
import { Modal } from './Modal';
import { QuestionWithCategory } from '../models';
import './QuestionModal.scss';

export interface QuestionModalProps {
  open: boolean;
  question: QuestionWithCategory;

  onAnswer: () => void;
  onSkip: () => void;
}

export function QuestionModal(props: QuestionModalProps) {
  return (
    <Modal open={props.open}>
      {props.question && (
        <>
          <div className="question-modal__wrapper">
            <div className="question-modal__category">Category: {props.question.categoryName}</div>
            <div className="question-modal__question">{props.question.content}</div>

            <div className="question-modal__buttons">
              <button className="question-modal__button" onClick={props.onAnswer}>
                Answer
              </button>
              &nbsp;
              <button className="question-modal__button" onClick={props.onSkip}>
                Skip
              </button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
