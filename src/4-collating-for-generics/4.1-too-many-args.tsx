/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, ReactNode } from 'react';

/**
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

// Each component-variant has_many elements
type ButtonElement = 'root' | 'label' | 'overlay';
type ModalElement = 'frame' | 'closeButton' | 'overlay';
type TextElement = 'atom';

// Some components require children
type ButtonRequiresChildren = false;
type ModalRequiresChildren = true;
type TextRequiresChildren = true;

// Since all of the components follow the same general pattern, let's make some common helpers
// instead of creating each interface manually.

type StandardPropsForComponent<
  ComponentVariant extends string,
  ComponentSize extends string,
  ComponentRequiresChildren extends boolean,
> = (
  props: {
    variant: ComponentVariant;
    size: ComponentSize;
  } & (ComponentRequiresChildren extends true
    ? {
        children: ReactNode;
      }
    : {}),
) => ReactElement;

type ThemeShapeForComponent<
  ComponentVariant extends string,
  ComponentSize extends string,
  ComponentElement extends string,
> = {
  [key in ComponentVariant]: Partial<
    {
      [key in ComponentElement]: Partial<
        {
          [key in ComponentSize]: React.CSSProperties;
        }
      >;
    }
  >;
};

const Button: StandardPropsForComponent<
  ButtonVariant,
  ButtonSize,
  ButtonRequiresChildren
> = (props) => {
  const { variant, size } = props;

  // implementation not relevant here
  return <>{{ variant, size }}</>;
};

const buttonTheme: ThemeShapeForComponent<ButtonVariant, ButtonSize, ButtonElement> = {
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

const Text: StandardPropsForComponent<TextVariant, TextSize, TextRequiresChildren> = (
  props,
) => {
  const { variant, size, children } = props;

  // implementation not relevant here
  return <>{{ variant, size, children }}</>;
};

const textTheme: ThemeShapeForComponent<TextVariant, TextSize, TextElement> = {
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
export type {
  ButtonVariant,
  ModalVariant,
  TextVariant,
  ButtonSize,
  ModalSize,
  TextSize,
  ButtonElement,
  ModalElement,
  TextElement,
  ButtonRequiresChildren,
  ModalRequiresChildren,
  TextRequiresChildren,
};
export { Button, buttonTheme, Text, textTheme, example, example2, example3, example4 };
