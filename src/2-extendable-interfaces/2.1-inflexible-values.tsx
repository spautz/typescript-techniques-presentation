import React, { ReactElement } from 'react';

/**
 * If your library needs to support extendable/overrideable string values, export an interface
 * and then derive the strings from that.
 *
 * This allows overrides, without falling back to `string`.
 *
 * --
 *
 * String unions are easy, but inflexible
 */

// ============================================================================
//
// A fixed set of strings
//

type ButtonVariant = 'primary' | 'secondary' | 'link';

interface ButtonProps {
  variant: ButtonVariant;
}

const Button = (props: ButtonProps): ReactElement => {
  // implementation not relevant here
  return <button>{props}</button>;
};

// Usage:
const example = <Button variant="primary" />;

// ============================================================================

// Export to make the linter happy
export { Button, example };
