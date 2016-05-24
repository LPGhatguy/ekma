interface Stringable {
    toString(): string;
}
export { Stringable };
export declare type EachIterator<T> = (value: T, key: number) => Stringable;
export declare type StringFunction = () => string;
/**
 * Turns HTML-sensitive characters into HTML entities
 * Escapes all of &><"'`
 */
export declare function escapeHTML(str: string): string;
/**
 * Turns double quotes into HTML entities in the given text.
 */
export declare function escapeQuotes(str: string): string;
/**
 * An HTML snippet that's escaped by default.
 * Use $${"data"} to escape an input.
 */
export declare function $html(literalSections: any, ...substs: any[]): string;
/**
 * Executes the given string or function a given number of times.
 */
export declare function $times(n: number, method: Function | string): string;
export declare function $map(collection: any[], method: EachIterator<any> | string): string[];
export declare function $map<T extends {}>(collection: T[], method: EachIterator<T> | string): string[];
/**
 * The Armature replacement for Circular's `each`
 * Automatically joins the given strings with nothing between them.
 * Use `$map` if you want an array.
 */
export declare function $each<T extends {}>(collection: T[], method: EachIterator<T> | string): string;
/**
 * Calls the given function with the given object as a parameter.
 * Useful for aliasing a value to a shorter name in a template.
 */
export declare function $alias<T extends {}>(object: T, callback: (v: T) => string): string;
/**
 * Executes the function or string only if the condition given is truthy.
 */
export declare function $if(condition: any, method: StringFunction | string, other?: StringFunction | string): string;
