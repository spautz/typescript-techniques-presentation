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
type ButtonElementRecord = Record<ButtonElementName, CSSProperties>;
type ModalElementRecord = Record<ModalElementName, CSSProperties>;
type TextElementRecord = Record<TextElementName, CSSProperties>;

// Since all of the components follow the same general pattern, let's make some common helpers
// instead of creating each interface manually.

type ThemeShapeForComponent<
  ComponentVariantName extends string,
  ComponentElementName extends string,
  ComponentElementRecord extends Record<ComponentElementName, CSSProperties>,
> = {
  [key in ComponentVariantName]: Partial<
    {
      [key in ComponentElementName]: Partial<ComponentElementRecord>;
    }
  >;
};

// Usage:

const buttonTheme: ThemeShapeForComponent<
  ButtonVariantName,
  ButtonElementName,
  ButtonElementRecord
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
  ModalElementRecord
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
  TextElementRecord
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
  ButtonElementRecord,
  ModalElementRecord,
  TextElementRecord,
};
export { buttonTheme, modalTheme, textTheme };
