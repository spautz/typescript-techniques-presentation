import { CSSProperties } from 'react';
import {
  ButtonVariantName,
  ModalVariantName,
  TextVariantName,
  ButtonElementName,
  ModalElementName,
  TextElementName,
  ButtonElementStyle,
  ModalElementStyle,
  TextElementStyle,
} from './4b.1-too-many-args';

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
interface ShapeForComponentMeta {
  VariantName: string;
  ElementName: string;
  ElementStyle: Record<string, CSSProperties>;
}

interface ButtonMeta {
  VariantName: ButtonVariantName;
  ElementName: ButtonElementName;
  ElementStyle: ButtonElementStyle;
}

interface ModalMeta {
  VariantName: ModalVariantName;
  ElementName: ModalElementName;
  ElementStyle: ModalElementStyle;
}

interface TextMeta {
  VariantName: TextVariantName;
  ElementName: TextElementName;
  ElementStyle: TextElementStyle;
}

// Since all of the components follow the same general pattern, let's make some common helpers
// instead of micro-managing their interfaces.

type ThemeShapeForComponent<ComponentMeta extends ShapeForComponentMeta> = {
  // For each variant name...
  [key in ComponentMeta['VariantName']]: Partial<
    {
      // Have a key for each element in the variant,
      // And the value of each key is its styles
      [key in ComponentMeta['ElementName']]: Partial<ComponentMeta['ElementStyle']>;
    }
  >;
};

// Usage:

const buttonTheme: ThemeShapeForComponent<ButtonMeta> = {
  primary: {
    root: {},
    label: {},
    overlay: {},
  },
  secondary: {},
  link: {},
};

const modalTheme: ThemeShapeForComponent<ModalMeta> = {
  error: {
    frame: {},
    closeButton: {},
    overlay: {},
  },
  promotion: {},
};

const textTheme: ThemeShapeForComponent<TextMeta> = {
  header: {},
  body: {},
};

// ============================================================================

// Export to make the linter happy
export type { ModalMeta, ShapeForComponentMeta, ThemeShapeForComponent };
export { buttonTheme, modalTheme, textTheme };
