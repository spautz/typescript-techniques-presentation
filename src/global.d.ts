import React from 'react';

/**
 * Handled by the build system: this does not actually exist.
 */
declare const __DEV__: boolean;

/**
 * Used for the sample code; not truly global
 */
export type TextFieldChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;
