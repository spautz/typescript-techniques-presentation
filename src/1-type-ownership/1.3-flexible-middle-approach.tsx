import React, { ReactElement } from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import { TextFieldChangeEvent } from '../global';

/**
 * Use types from 3rd party libraries -- but don't reapply them directly.
 *
 * If you own the component, you own its interface.
 *
 * --
 *
 * Sometimes you really do want EVERYTHING from the 3rd party library:
 * instead of using it *as* your wrapper, use it *within* your wrapper.
 *
 * Composition instead of inheritance.
 */

// ============================================================================
//
// A safe wrapper around Material-UI's TextField with an escape hatch
//

interface MyTextFieldProps {
  name: string;
  value: string;
  onChange: (newValue: string, e: TextFieldChangeEvent) => void;
  textFieldProps?: StandardTextFieldProps;
}

const MyTextField = (props: MyTextFieldProps): ReactElement => {
  const { name, value, onChange, textFieldProps } = props;

  const onChangeWithValue = (e: TextFieldChangeEvent) => onChange(e.target.value, e);

  return (
    <TextField
      name={name}
      value={value}
      onChange={onChangeWithValue}
      {...textFieldProps}
    />
  );
};

// Usage:
const example = (
  <MyTextField
    name="First Name"
    value="Alice"
    onChange={console.log}
    textFieldProps={{
      fullWidth: true,
    }}
  />
);

// ============================================================================

// Export to make the linter happy
export { MyTextField, example };
