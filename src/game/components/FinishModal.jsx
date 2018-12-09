// @flow
import React from 'react';
import { Modal } from './Modal';
import './FinishModal.scss';

export interface FinishModalProps {
  open: boolean;

  onClose: () => void;
}

export function FinishModal(props: FinishModalProps) {
  return (
    <Modal open={props.open}>
      <div className="finish-modal__wrapper">
        <span className="finish-modal__title">Gratulacje!</span>

        <button className="finish-modal__button" onClick={props.onClose}>
          Zakończ
        </button>
      </div>
    </Modal>
  );
}
