import React, { ReactElement } from 'react';

/**
 * If your library needs to support extendable/overrideable string values, export an interface
 * and then derive the strings from that.
 *
 * This allows overrides, without falling back to `string`.
 *
 * --
 *
 * Deriving from an interface is *odd*, but works perfectly.
 */

// ============================================================================
//
// Union type derived from an interface
//

export interface ButtonVariants {
  // Only the keys matter, here
  primary: true;
  secondary: true;
  link: true;
}

type ButtonVariantName = keyof ButtonVariants;

interface ButtonProps {
  variant: ButtonVariantName;
}

const Button = (props: ButtonProps): ReactElement => {
  // implementation not relevant here
  return <button>{props}</button>;
};

// Usage:
const example = <Button variant="primary" />;

// ============================================================================
//
// Now a consumer can add their own
//

declare module './2.2-extendable-values' {
  interface ButtonVariants {
    myCustomName: true;
  }
}

// Usage:
const example2 = <Button variant="myCustomName" />;

// ============================================================================

// Export to make the linter happy
export { Button, example, example2 };
