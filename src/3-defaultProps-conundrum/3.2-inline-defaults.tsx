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
// If you don't need to reference the prop from outside, just inline it instead of using
// defaultProps.
//

interface ModalProps {
  size?: 'small' | 'medium' | 'large';
}

const sizeOptions = {
  small: '400px',
  medium: '600px',
  large: '800px',
};

const Modal: React.FC<ModalProps> = (props): ReactElement => {
  const { size = 'medium' } = props;

  const width = sizeOptions[size];

  // Alternative:
  // You could also put defaults inline, or use null checks
  // const width = size ? sizeOptions[size] : sizeOptions.medium;

  return <div style={{ width }} />;
};

// Usage:
const example = <Modal />;
const example2 = <Modal size="medium" />;

// ============================================================================

// Export to make the linter happy
export { Modal, example, example2 };
