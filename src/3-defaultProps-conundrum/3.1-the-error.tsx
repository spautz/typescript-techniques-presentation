import React, { ReactElement } from 'react';

/**
 * If you need defaultProps to be available outside of the file that defines them, there's no
 * one ideal -- but several okay alternatives.
 *
 * Core issue: a prop is optional from outside, but will always be set inside the component --
 * so we really need two type args, but React.FC only gets one.
 *
 */

// ============================================================================
//
// Size is optional, but will always be set
//

interface ModalProps {
  // We use the raw value, instead of an extendable interface, solely to keep this example short
  size?: 'small' | 'medium' | 'large';
}

const sizeOptions = {
  small: '400px',
  medium: '600px',
  large: '800px',
};

const Modal: React.FC<ModalProps> = (props): ReactElement => {
  const { size } = props;

  // `size` is `'small' | 'medium' | 'large' | undefined` -- and `undefined` isn't valid here
  const width = sizeOptions[size];

  return <div style={{ width }} />;
};

Modal.defaultProps = {
  size: 'medium',
};

// Usage:
const example = <Modal />;
const example2 = <Modal size="medium" />;

// ============================================================================

// Export to make the linter happy
export { Modal, example, example2 };
