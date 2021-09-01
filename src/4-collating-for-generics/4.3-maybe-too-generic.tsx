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
import { ShapeForComponentMeta, ThemeShapeForComponent } from './4b.2-pass-type-group';

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

// This adds even more type enforcement, but might be a bit overkill...
interface AllMetas extends Record<string, ShapeForComponentMeta> {
  Button: {
    VariantName: ButtonVariantName;
    ElementName: ButtonElementName;
    ElementStyle: ButtonElementStyle;
  };
  Modal: {
    VariantName: ModalVariantName;
    ElementName: ModalElementName;
    ElementStyle: ModalElementStyle;
  };
  Text: {
    VariantName: TextVariantName;
    ElementName: TextElementName;
    ElementStyle: TextElementStyle;
  };
}

// Usage:

const buttonTheme: ThemeShapeForComponent<AllMetas['ButtonMeta']> = {
  primary: {
    root: {},
    label: {},
    overlay: {},
  },
  secondary: {},
  link: {},
};

const modalTheme: ThemeShapeForComponent<AllMetas['ModalMeta']> = {
  error: {
    frame: {},
    closeButton: {},
    overlay: {},
  },
  promotion: {},
};

const textTheme: ThemeShapeForComponent<AllMetas['TextMeta']> = {
  header: {},
  body: {},
};

// ============================================================================

// Export to make the linter happy
export { buttonTheme, modalTheme, textTheme };
