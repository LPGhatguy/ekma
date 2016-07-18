interface Stringable {
	toString(): string;
	safeInHTML?: boolean;
}

export { Stringable };

export type EachIterator<T> = (value: T, key: number) => Stringable;
export type StringFunction = () => Stringable;

/**
 * Stopgap for checking of function args with TypeScript
 * Remove when TypeScript 2.0 is released.
 */
function isFunction(object: any): object is Function {
	return (typeof object === "function");
}

/**
 * Turns HTML-sensitive characters into HTML entities
 * Escapes all of &><"'`
 */
export function escapeHTML(str: string) {
	if (typeof str !== "string" || str.length === 0) {
		return "";
	}

	return str.replace(/&/g, '&amp;')
		.replace(/>/g, '&gt;')
		.replace(/</g, '&lt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/`/g, '&#96;');
}

/**
 * An HTML snippet that's escaped by default.
 * Use $${"data"} to skip escaping of an input.
 */
export function $html(literalSections, ...substs) {
	const raw = literalSections.raw;
	let result = "";

	substs.forEach((subst, i) => {
		let lit = raw[i];

		if (Array.isArray(subst)) {
			subst = subst.join("");
		}

		if (lit.endsWith("$")) {
			lit = lit.slice(0, -1);
		} else {
			if (subst.safeInHTML) {
				subst = subst.toString();
			} else if (subst == null) {
				subst = "null";
			} else {
				subst = escapeHTML(subst.toString());
			}
		}

		result += lit;
		result += subst;
	});

	result += raw[raw.length - 1];

	return {
		toString() {
			return result;
		},
		safeInHTML: true
	};
}

/**
 * Executes the given string or function a given number of times.
 */
export function $times(n: number, method: Function | Stringable) {
	const buffer = [];

	for (let i = 0; i < n; i += 1) {
		if (isFunction(method)) {
			buffer.push(method(i));
		} else {
			buffer.push(method);
		}
	}

	return buffer.join("");
}

/**
 * Maps a list of values using the given function or string.
 */
export function $map<T extends {}>(collection: T[], method: EachIterator<T> | Stringable): Stringable[] {
	let buffer = [];
	let len = collection.length;

	for (let i = 0; i < len; i++) {
		if (isFunction(method)) {
			buffer.push(method(collection[i], i).toString());
		} else {
			buffer.push(method.toString());
		}
	}

	return buffer;
}

/**
 * Maps all values of the collection using $map, then joins the array.
 * Use `$map` to get an array.
 */
export function $each<T extends {}>(collection: T[], method: EachIterator<T> | Stringable): Stringable {
	return $map<T>(collection, method).join("");
}

/**
 * Calls the given function with the given object as a parameter.
 * Useful for aliasing a value to a shorter name in a template.
 */
export function $alias<T extends {}>(object: T, method: (v: T) => Stringable): Stringable {
	return method(object);
}

/**
 * Executes the function or string only if the condition given is truthy.
 */
export function $if(condition: any, method: StringFunction | Stringable, other?: StringFunction | Stringable): Stringable {
	if (condition) {
		if (isFunction(method)) {
			return method();
		} else if (method) {
			return method;
		}
	} else {
		if (isFunction(other)) {
			return other();
		} else if (other) {
			return other;
		}
	}

	return "";
}