import React from 'react';
import { StandardPropsForComponent, ThemeShapeForComponent } from './4.2-pass-type-group';

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
 * Passing types individually can get messy
 */

// ============================================================================
// We use raw values, instead of extendable interfaces, solely to keep these examples short
//

// Each component has_many variants
type ButtonVariant = 'primary' | 'secondary' | 'link';
type ModalVariant = 'error' | 'promotion';
type TextVariant = 'header' | 'body';

// Each component has_many sizes
type ButtonSize = 'small' | 'medium' | 'large';
type ModalSize = 'responsive' | 'fullscreen';
type TextSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

// Each component has_many elements
type ButtonElement = 'label' | 'overlay';
type ModalElement = 'frame' | 'closeButton' | 'overlay';
type TextElement = 'text';

// Some components require children
type ButtonRequiresChildren = false;
type ModalRequiresChildren = true;
type TextRequiresChildren = true;

// To make the interface for the helpers easier, we'll group all the above typings into buckets

// This might be going a bit overboard....
interface AllMetas {
  Button: {
    Variant: ButtonVariant;
    Size: ButtonSize;
    Element: ButtonElement;
    RequiresChildren: ButtonRequiresChildren;
  };
  Modal: {
    Variant: ModalVariant;
    Size: ModalSize;
    Element: ModalElement;
    RequiresChildren: ModalRequiresChildren;
  };
  Text: {
    Variant: TextVariant;
    Size: TextSize;
    Element: TextElement;
    RequiresChildren: TextRequiresChildren;
  };
}

// Since all of the components follow the same general pattern, let's make some common helpers
// instead of micro-managing their interfaces.

const Button: StandardPropsForComponent<AllMetas['Button']> = (props) => {
  const { variant, size } = props;

  // implementation not relevant here
  return <>{{ variant, size }}</>;
};

const buttonTheme: ThemeShapeForComponent<AllMetas['Button']> = {
  primary: {
    label: {
      small: {},
      medium: {},
      large: {},
    },
    overlay: {},
  },
  secondary: {},
  link: {},
};

const Text: StandardPropsForComponent<AllMetas['Text']> = (props) => {
  const { variant, size, children } = props;

  // implementation not relevant here
  return <>{{ variant, size, children }}</>;
};

const textTheme: ThemeShapeForComponent<AllMetas['Text']> = {
  header: {},
  body: {},
};

// Usage:
const example = <Button variant="primary" size="medium" />;
const example2 = (
  <Button variant="primary" size="medium">
    Pass children?
  </Button>
);

const example3 = <Text variant="header" size="large" />;
const example4 = (
  <Text variant="header" size="large">
    Hello!
  </Text>
);

// ============================================================================

// Export to make the linter happy
export type { ModalVariant, ModalSize, ModalElement, ModalRequiresChildren };
export { Button, buttonTheme, Text, textTheme, example, example2, example3, example4 };
