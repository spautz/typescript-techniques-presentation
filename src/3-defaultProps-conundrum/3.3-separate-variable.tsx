import React, { ReactElement } from 'react';

/*
 * If you need defaultProps to be available outside of the file that defines them, there's no
 * one ideal -- but several okay alternatives.
 *
 * Core issue: a prop is optional from outside, but will always be set inside the component --
 * so we really need two type args, but React.FC only gets one.
 *
 */

// ============================================================================
//
// If you DO (or may) need to reference defaultProps from outside, a separate variable
// can make the typings easier
//

interface ModalProps {
  size?: 'small' | 'medium' | 'large';
}

const sizeOptions = {
  small: '400px',
  medium: '600px',
  large: '800px',
};

const modalDefaultProps = {
  size: 'medium',
} as const;

const Modal: React.FC<ModalProps> = (props): ReactElement => {
  // This works pretty well when props are destructured in one place
  const { size } = props as ModalProps & typeof modalDefaultProps;

  // Alternative:
  // You could also forego `Component.defaultProps` entirely:
  // const { size } = { ...modalDefaultProps, ...props };

  const width = sizeOptions[size];

  return <div style={{ width }} />;
};

Modal.defaultProps = modalDefaultProps;

// Usage:
const example = <Modal />;
const example2 = <Modal size="medium" />;

// ============================================================================

// Export to make the linter happy
export { Modal, example, example2 };
