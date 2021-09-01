import { CSSProperties } from 'react';

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
type ButtonVariantName = 'primary' | 'secondary' | 'link';
type ModalVariantName = 'error' | 'promotion';
type TextVariantName = 'header' | 'body';

// Each component-variant has_many elements
type ButtonElementName = 'root' | 'label' | 'overlay';
type ModalElementName = 'frame' | 'closeButton' | 'overlay';
type TextElementName = 'atom';

// Each collection of elements has its own type
type ButtonElementStyle = Record<ButtonElementName, CSSProperties>;
type ModalElementStyle = Record<ModalElementName, CSSProperties>;
type TextElementStyle = Record<TextElementName, CSSProperties>;

// Since all of the components follow the same general pattern, let's make some common helpers
// instead of creating each interface manually.

type ThemeShapeForComponent<
  ComponentVariantName extends string,
  ComponentElementName extends string,
  ComponentElementStyle extends Record<ComponentElementName, CSSProperties>,
> = {
  [key in ComponentVariantName]: Partial<
    {
      [key in ComponentElementName]: Partial<ComponentElementStyle>;
    }
  >;
};

// Usage:

const buttonTheme: ThemeShapeForComponent<
  ButtonVariantName,
  ButtonElementName,
  ButtonElementStyle
> = {
  primary: {
    root: {},
    label: {},
    overlay: {},
  },
  secondary: {},
  link: {},
};

const modalTheme: ThemeShapeForComponent<
  ModalVariantName,
  ModalElementName,
  ModalElementStyle
> = {
  error: {
    frame: {},
    closeButton: {},
    overlay: {},
  },
  promotion: {},
};

const textTheme: ThemeShapeForComponent<
  TextVariantName,
  TextElementName,
  TextElementStyle
> = {
  header: {},
  body: {},
};

// ============================================================================

// Export to make the linter happy
export type {
  ButtonVariantName,
  ModalVariantName,
  TextVariantName,
  ButtonElementName,
  ModalElementName,
  TextElementName,
  ButtonElementStyle,
  ModalElementStyle,
  TextElementStyle,
};
export { buttonTheme, modalTheme, textTheme };
