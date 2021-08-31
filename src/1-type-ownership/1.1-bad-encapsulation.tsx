import React, { ReactElement } from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import { TextFieldChangeEvent } from '../global';

/*
 * Use types from 3rd party libraries -- but don't reapply them directly.
 *
 * If you own the component, you own its interface.
 *
 * --
 *
 * This is not a good way to encapsulate a 3rd party component:
 *    - We don't know what props consumers might actually be using; we don't know how large the API
 *      footprint is.
 *    - Any future changes with Material UI -- either from upgrading, or if you want to switch to
 *      another library -- are inflicted on the consumers.
 *    - If it's a library, the typings a consumer has for `@material-ui/core` may be different --
 *      or even incompatible/inappropriate, depending on the package.
 *    - The implementation is really not encapsulated well, either: if the underlying
 *      implementation changes, or needs to change, this breaks at the *consumer*, not here.
 */

// ============================================================================
//
// A poor wrapper around Material-UI's TextField
//

const MyTextField = (props: StandardTextFieldProps): ReactElement => {
  return <TextField {...props} />;
};

// Usage:
const example = <MyTextField fullWidth />;

// ============================================================================
//
// Extending the interface has exactly the same problems -- sometimes with additional confusion
// because you cannot change typings of the things you extend.
//

interface MyTextFieldProps extends StandardTextFieldProps {
  onChange2: (newValue: string, e: TextFieldChangeEvent) => void;
}

const MyTextField2 = (props: MyTextFieldProps): ReactElement => {
  const { onChange2, ...otherProps } = props;

  const onChangeWithValue = (e: TextFieldChangeEvent) => onChange2(e.target.value, e);

  return <TextField {...otherProps} onChange={onChangeWithValue} />;
};

// Usage:
const example2 = <MyTextField2 fullWidth onChange2={console.log} />;

// ============================================================================

// Export to make the linter happy
export { MyTextField, MyTextField2, example, example2 };
