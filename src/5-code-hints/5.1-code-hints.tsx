import React from 'react';

/**
 * If you have a list of special values, but also need to accept any string (or number), simply
 * adding `string` to the type will remove code hints and autocomplete in some IDEs -- like
 * VS Code.
 *
 * The root problem is that `'value1' | 'value2' | string` all gets smushed into just `string`,
 * because `'value1'` and `'value2'` are subclasses of `string`: Typescript doesn't keep the
 * original details around because there's no value in checking those three possibilities
 * when `string` covers them all.
 *
 * --
 *
 * We can avoid this by using a type that *accepts* all strings, but which `'value1'`, `'value2'`,
 * etc do not inherit from: the intersection `string & Record<never, never>` gives us exactly that.
 * This works for `number` as well -- it should work for any type.
 *
 * The "accept any string" part needs to come at the end of the union.
 */

// ============================================================================

type WidthKeyword =
  | 'auto'
  | 'fit-content'
  | 'inherit'
  | 'initial'
  | 'intrinsic'
  | 'max-content'
  | 'min-content'
  | 'unset';

// Option 1: This doesn't work great
type AnyWidth = WidthKeyword | string;

// Option 2: This works in all IDEs
// type AnyWidth = WidthKeyword | (string & Record<never, never>);

// Option 3: Alternate syntax that you might see
// type AnyWidth = WidthKeyword | (string & {});

const MyComponent: React.FC<{ width: AnyWidth }> = (props) => {
  return <div style={{ width: props.width }} />;
};

// Usage:
const example: AnyWidth = 'auto';
const example2 = <MyComponent width="12px" />;

// ============================================================================

// Export to make the linter happy
export { MyComponent, example, example2 };
