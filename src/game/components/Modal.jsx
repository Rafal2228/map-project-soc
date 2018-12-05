// @flow
import React from 'react';
import { createPortal } from 'react-dom';
import { animated, Keyframes } from 'react-spring';
import './Modal.scss';

const ModalSpring = Keyframes.Spring({
  opened: [{ y: 0, opacity: 1, from: { y: 50, opacity: 0 } }],
  closed: [{ y: -50, opacity: 0 }],
});

export interface ModalProps {
  open: boolean;
  children: React$Node;
  closeOnDimmerClick?: boolean;
  onClose?: () => void;
}

export const Modal = React.memo<ModalProps>(
  function(props: ModalProps) {
    const modalState = props.open ? 'opened' : 'closed';

    const content = (
      <ModalSpring state={modalState}>
        {styles => (
          <animated.div
            className="modal__dimmer"
            onClick={() => props.closeOnDimmerClick && props.onClose && props.onClose()}
            style={{
              opacity: styles.opacity,
              display: styles.opacity === 0 ? 'none' : 'flex',
            }}
          >
            <animated.div
              className="modal__wrapper"
              onClick={e => e.stopPropagation()}
              style={{
                transform: `translateY(${styles.y}%)`,
                opacity: styles.opacity,
              }}
            >
              {props.children}
            </animated.div>
          </animated.div>
        )}
      </ModalSpring>
    );

    return createPortal(content, document.body);
  },
  function(prev, next) {
    return prev.open === next.open;
  }
);
