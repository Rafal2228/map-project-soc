// @flow
import React from 'react';
import { Modal } from './Modal';
import { WithFileInput } from './WithFileInput';
import './MenuModal.scss';

const ChangeQuestionsButton = WithFileInput(props => <button {...props} />);

export interface MenuModalProps {
  open: boolean;

  onClose: () => void;
  onChangeQuestions: (files: File[]) => void;
  onEndGame: () => void;
}

export function MenuModal(props: MenuModalProps) {
  return (
    <Modal open={props.open} closeOnDimmerClick onClose={props.onClose}>
      <div className="menu-modal__wrapper">
        <span className="menu-modal__title">Menu</span>

        <ChangeQuestionsButton
          className="menu-modal__button"
          accept=".json,application/json"
          multiple={false}
          onSelected={props.onChangeQuestions}
        >
          Change questions
        </ChangeQuestionsButton>
        <button className="menu-modal__button" onClick={props.onEndGame}>
          End game
        </button>
        <button className="menu-modal__button" onClick={props.onClose}>
          Close menu
        </button>
      </div>
    </Modal>
  );
}
