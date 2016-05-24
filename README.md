# ekma: templating for ES6
```sh
npm install ekma --save
```

There are lots of templating languages and view systems for JS. Handlebars, Jade, Nunjucks, and React's JSX are just a few, and there are more every day! All of them expose a domain-specific language (DSL) and introduce plenty of complexity when all you want is regular JavaScript.

The common untapped feature is ES6 template strings, which ekma aims to fix in a portable and flexible way. ekma works well whether you're running native ES6 or transpiling to ES5 via Babel, Traceur, or TypeScript!

## Requirements
ekma requires an ES5 environment. That's it!

## Examples
ekma templates are just functions that return strings!

```js
import { $each, $if } from "ekma";

const myCollection = [5, 6, 7];

const template = () => `
	${ $if(myCollection.length === 0, () => `
		Nothing to show in the collection.
	`) }

	${ $each(myCollection, v => `
		Value: ${v}
	`) }
`;

console.log(template());
```

## Building
Building requires Node.js 5 or newer.

To build ekma from sources, run `npm run build` in the root of the project.

The main field specified in `package.json` is only valid after the library has been built, as compiled JS isn't checked into source control to reduce commit noise.

## License
ekma is licensed under the MIT license. See [LICENSE.md](LICENSE.md) for more details.