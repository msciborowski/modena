While implementing:

- match our existing project architecture
- page must follow a11y standards
- page must be both desktop and mobile friendly - this is very important
- when in need to write some function or helper method (eg. format date), first search solution if there are any usage of similar, if not create resuable function with unit tests in common functions/helpers

My coding preferences

- code must build, and lint must pass
- all tests must pass green
- npm run dev must throw no errors
- no inline styling, prefer styling in component file using @emotion/react
- prefer smaller components; if some funcionality can be extracted to separate shared component, thats preffered way; prefer one component per file (one component + styles)
- if working on an UI component make sure it displays correct both on desktop and mobile devices
- make code clean and if in doubt follow Airbnb ESLint rules
- use functional components only
- no default exports, if possible prefer `export const ComponentName = (props: ComponentNameProps) => {}`
- use arrow functions
- use strict TypeScript types, no any
- prefer useMemo over recalculation
- accessibility compliant
- avoid unnecessary re-renders in react components
- for confirmations we don't use javascript confirm or anythig like this, we have implement dedicated dialogs/modals, we should reuse them
