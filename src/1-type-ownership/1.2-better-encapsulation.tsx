import React, { ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';
import { TextFieldChangeEvent } from '../global';

/**
 * Use types from 3rd party libraries -- but don't reapply them directly.
 *
 * If you own the component, you own its interface.
 *
 * --
 *
 * Easiest option: copy/paste their interface.
 * Although it looks like it'd be a bad practice, if/when things break in the future, they'll
 * break here first.
 *
 * This is a great way to get familiarity with the typings used inside other libraries, too.
 */

// ============================================================================
//
// A safe, manual wrapper around Material-UI's TextField
//

interface MyTextFieldProps {
  // Duplicating is good, in this case, because if the library changes then this will break
  name: string;
  value: string;
  onChange: (newValue: string, e: TextFieldChangeEvent) => void;
}

const MyTextField = (props: MyTextFieldProps): ReactElement => {
  const { onChange, ...otherValidProps } = props;

  const onChangeWithValue = (e: TextFieldChangeEvent) => onChange(e.target.value, e);

  return <TextField onChange={onChangeWithValue} {...otherValidProps} />;
};

// Usage:
const example = <MyTextField name="First Name" value="Alice" onChange={console.log} />;

// ============================================================================

// Export to make the linter happy
export { MyTextField, example };
