import React, { ReactElement, ReactNode } from 'react';
import {
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
} from './4.1-too-many-args';

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

// To make the interface for the helpers easier, we'll group all the above typings into buckets
type ShapeForComponentMeta = {
  Variant: string;
  Size: string;
  Element: string;
  RequiresChildren: boolean;
};

type ButtonMeta = {
  Variant: ButtonVariant;
  Size: ButtonSize;
  Element: ButtonElement;
  RequiresChildren: ButtonRequiresChildren;
};
type ModalMeta = {
  Variant: ModalVariant;
  Size: ModalSize;
  Element: ModalElement;
  RequiresChildren: ModalRequiresChildren;
};
type TextMeta = {
  Variant: TextVariant;
  Size: TextSize;
  Element: TextElement;
  RequiresChildren: TextRequiresChildren;
};

// Since all of the components follow the same general pattern, let's make some common helpers
// instead of micro-managing their interfaces.

type StandardPropsForComponent<Component extends ShapeForComponentMeta> = (
  props: Component['RequiresChildren'] extends true
    ? {
        variant: Component['Variant'];
        size: Component['Size'];
        children: ReactNode;
      }
    : {
        variant: Component['Variant'];
        size: Component['Size'];
      },
) => ReactElement;

type ThemeShapeForComponent<Component extends ShapeForComponentMeta> = {
  [key in Component['Variant']]: Partial<
    {
      [key in Component['Element']]: Partial<
        {
          [key in Component['Size']]: React.CSSProperties;
        }
      >;
    }
  >;
};

const Button: StandardPropsForComponent<ButtonMeta> = (props) => {
  const { variant, size } = props;

  // implementation not relevant here
  return <>{{ variant, size }}</>;
};

const buttonTheme: ThemeShapeForComponent<ButtonMeta> = {
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

const Text: StandardPropsForComponent<TextMeta> = (props) => {
  const { variant, size, children } = props;

  // implementation not relevant here
  return <>{{ variant, size, children }}</>;
};

const textTheme: ThemeShapeForComponent<TextMeta> = {
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
  ModalMeta,
  ShapeForComponentMeta,
  StandardPropsForComponent,
  ThemeShapeForComponent,
};
export { Button, buttonTheme, Text, textTheme, example, example2, example3, example4 };
