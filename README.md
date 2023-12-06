# Graph Algorithms

## Usage

Install project dependencies: `npm install`

Compile TypeScript files: `npm run tsc`

Run **Webpack**:

* To build for production: `npm run build`
* To build for development and watch for anges: `npm start`

Your dist/bundle.js will be generated, which you can include in your HTML.


## Tests

* Run all tests:

`npx jest`

* Run all tests from a file:

`npx jest src/algorithms/__tests__/Prim.test.ts`

* Run a specific test:

`npx jest src/algorithms/__tests__/Prim.test.ts -t "should find the shortest path - Example 11"`
