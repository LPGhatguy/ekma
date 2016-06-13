interface Stringable {
	toString(): string;
}

export { Stringable };

type Callable = { (): any };

export type EachIterator<T> = (value: T, key: number) => Stringable;
export type StringFunction = () => Stringable;

function isFunction(f: any): f is { (...args: any[]): any } {
	return typeof f === "function";
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
 * Turns double quotes into HTML entities in the given text.
 */
export function escapeQuotes(str: string) {
	if (typeof str !== "string" || str.length === 0) {
		return "";
	}

	return str.replace(/"/g, "&quot;");
}

/**
 * An HTML snippet that's escaped by default.
 * Use $${"data"} to escape an input.
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
			if (subst == null) {
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
		toString: () => result
	};
}

/**
 * Executes the given string or function a given number of times.
 */
export function $times(n: number, method: Function | string) {
	const buffer = [];

	for (let i = 0; i < n; i += 1) {
		if (typeof method === "function") {
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