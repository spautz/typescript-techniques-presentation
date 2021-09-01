import React from 'react';

/*
 * If you have a standard pattern that involves a lot of related types -- as can result when
 * you have extendable interfaces and derived types -- then utility types can help keep
 * everything standard.
 *
 * Utility types need arguments, though, and if you have a lot of types then those arguments
 * can become complex or inconsistent themselves.
 *
 * --
 *
 * Allowing `string` or `number` will clobber the other options
 */

// ============================================================================
// We use raw values, instead of extendable interfaces, solely to keep these examples short
//

type WidthKeyword =
  | 0
  | 'auto'
  | 'fit-content'
  | 'inherit'
  | 'initial'
  | 'intrinsic'
  | 'max-content'
  | 'min-content'
  | 'unset';

// Option 1: This doesn't work well
type AnyWidth = WidthKeyword | string;

// Option 2: This works in all IDEs
// type AnyWidth = WidthKeyword | (string & Record<never, never>);

// Option 3: Alternate syntax that you might see
// type AnyWidth = WidthKeyword | (string & {}});

const MyComponent: React.FC<{ width: AnyWidth }> = (props) => {
  const { width } = props;

  return <div style={{ width }} />;
};

// Usage:
const example: AnyWidth = 'min';
const example2 = <MyComponent width="12px" />;

// ============================================================================

// Export to make the linter happy
export { MyComponent, example, example2 };
