# Presentation: Typescript Techniques from dk-web-fx

This repo contains demos for a Web Technology Group talk, given September 1, 2021.

## Standard Disclaimer

Libraries and apps have different needs -- doubly so when the library needs
to be extendable and widely-useful.

These techniques work pretty well for dk-web-fx-core:
you should decide for yourself whether they make sense in your app.

## Examples

Each directory under `src/` presents a particular typescript scenario and a few
different approaches to typing it. Each shows one bad approach and 1-2
better options.

### [Type Ownership](./src/1-type-ownership/)

Scenario: Incorporating types from a 3rd party library

Suggestion: Any time you create your own wrapper to encapsulate some outside
code, also create your own typings: don't just extend theirs

### [Extendable Interfaces](./src/2-extendable-interfaces/)

Scenario: Defining a list of options that others can add to later

Suggestion: List them within an interface (since interfaces can be merged to
expand them later), and derive a type from that

### [The DefaultProps Conundrum](./src/3-defaultProps-conundrum/)

Scenario: A prop is optional but has a default value which Typescript doesn't
know about

Suggestion: Either move defaultProps inside the component, or migrate it out
to a separate variable

### [Collating for Generics](./src/4-collating-for-generics/)

Scenario: Many typings follow the same pattern, and a util type needs many
generic arguments as a result

Suggestion: Roll the typings together into their own meta-typing -- similar to
how you might combine many function arguments together into their own options
argument

### [Code Hints for Flexible Types](./src/5-code-hints/)

Scenario: A prop or argument has several common preset options but allows any
string, and your code hints don't appear

Suggestion: Unioning the list with `string` and a never-matched type makes
code autocomplete work while still allowing non-preset values
