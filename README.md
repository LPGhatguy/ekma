# ekma: templating for ES6
```sh
npm install ekma --save
```

There are lots of templating languages and view systems for JS. Handlebars, Jade, Nunjucks, and React's JSX are just a few, and there are more every day! All of them expose a domain-specific language (DSL) and introduce plenty of complexity when all you want is regular JavaScript.

The common untapped feature is ES6 template strings, which ekma aims to fix in a portable and flexible way. ekma works well whether you're running native ES6 or transpiling to ES5 via Babel, Traceur, or TypeScript!

ekma includes TypeScript typings out of the box.

## Requirements
ekma requires an ES5 environment. That's it!

## Examples
ekma templates are just functions that return string-like objects!

Use the `$html` template tag to automatically escape inputs to fit into HTML:

```js
import { $html, $each, $if } from "ekma";

const myCollection = [5, 6, 7];

const template = () => $html`
	${ $if(myCollection.length === 0, () => `
		Nothing to show in the collection.
	`) }

	${ $each(myCollection, v => `
		Value: ${ v }
	`) }
`;

console.log(template().toString());
```

The return value of the template is an object with a `toString` method and the property `safeInHTML` set to `true`.

## API

This API is using TypeScript syntax for expressing types. For additional details, check [the source](https://github.com/LPGhatguy/ekma/blob/master/src/index.ts) of the module.

In these annotations, `Stringable` is an object that has a `toString` method, or is an actual string.

- `escapeHTML(html: string)`
	- escapes the given string as HTML
- `$html`
	- A template string tag that marks the string as HTML
	- Use `$${ value }` to output unescaped values in substitutions
	- Nested strings will automatically have correct escaping
- `$times(count: number, method: Function | Stringable)`
	- Outputs the given `Function` or `Stringable` `count` times.
- `$map(collection: Array, callback: Function | Stringable)`
	- Equivalent to `Array.prototype.map`, but evaluates functions
- `$each(collection: Array, callback: Function | Stringable)`
	- Iterates over the collection and joins the resulting array into a string
- `$alias(object: any, method: Function)`
	- Syntax sugar for method(object), used to shorten access chains
	- Similar to old JavaScript `with`
- `$if(condition: any, pass: Function | Stringable, fail: Function | Stringable)`
	- An `if` statement in function/expression form
	- Returns the result of `pass` if the condition is `true`
	- Otherwise returns the result of `fail`
- `$join(collection: Stringable[])`
	- Joins a collection of elements that may be safe in HTML

## Building
Building requires Node.js 5 or newer.

To build ekma from sources, run `npm run build` in the root of the project.

The main field specified in `package.json` is only valid after the library has been built, as compiled JS isn't checked into source control to reduce commit noise.

## License
ekma is licensed under the MIT license. See [LICENSE.md](LICENSE.md) for more details.