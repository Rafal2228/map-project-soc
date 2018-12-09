// @flow
import React from 'react';
import { Modal } from './Modal';
import './NoQuestionsModal.scss';

export interface NoQuestionsModalProps {
  open: boolean;

  onClose: () => void;
}

export function NoQuestionsModal(props: NoQuestionsModalProps) {
  return (
    <Modal open={props.open}>
      <div className="no-questions-modal__wrapper">
        <span className="no-questions-modal__title">Nie mamy dla was więcej pytań :(</span>

        <button className="no-questions-modal__button" onClick={props.onClose}>
          Zakończ grę
        </button>
      </div>
    </Modal>
  );
}
