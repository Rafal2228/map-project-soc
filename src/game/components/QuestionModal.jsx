// @flow
import React from 'react';
import { Modal } from './Modal';
import { Question } from '../models';
import './QuestionModal.scss';
import { Counter } from './Counter';

export interface QuestionModalProps {
  open: boolean;
  question: Question;

  onAnswer: () => void;
  onSkip: () => void;
}

export function QuestionModal(props: QuestionModalProps) {
  return (
    <Modal open={props.open}>
      {props.question && (
        <>
          <div className="question-modal__wrapper">
            <div className="question-modal__question-wrapper">
              <div className="question-modal__question">{props.question.content}</div>

              <div className="question-modal__counter">
                <Counter key={props.question.id} />
              </div>
            </div>

            <div className="question-modal__buttons">
              <button className="question-modal__button" onClick={props.onAnswer}>
                Wiem!
              </button>
              &nbsp;
              <button className="question-modal__button" onClick={props.onSkip}>
                Nie wiem?
              </button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
