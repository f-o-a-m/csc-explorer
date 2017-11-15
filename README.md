# Foam.proto-frontend

## On first run:
1. `npm install` or `yarn add all`

## Thereafter:
1. `npm run start` or `yarn start`, both of which run webpack, watch `/src` for changes to `.scss` files and compile sass

## Notes:
Sass files are imported into `index.scss`. `.scss` files prefixed with `_` will be ignored by node-sass, which is the preprocessor.

## Branches:
- `master` branch that is the reference for other's working on the Purescript Index frontend
- `Staging`, for coordination between General Trademark
- `foam.css` stores reference SCSS/CSS
- a bunch of feature branches
