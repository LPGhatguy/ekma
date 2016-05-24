"use strict";
/**
 * Turns HTML-sensitive characters into HTML entities
 * Escapes all of &><"'`
 */
function escapeHTML(str) {
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
exports.escapeHTML = escapeHTML;
/**
 * Turns double quotes into HTML entities in the given text.
 */
function escapeQuotes(str) {
    if (typeof str !== "string" || str.length === 0) {
        return "";
    }
    return str.replace(/"/g, "&quot;");
}
exports.escapeQuotes = escapeQuotes;
/**
 * An HTML snippet that's escaped by default.
 * Use $${"data"} to escape an input.
 */
function $html(literalSections) {
    var substs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        substs[_i - 1] = arguments[_i];
    }
    var raw = literalSections.raw;
    var result = "";
    substs.forEach(function (subst, i) {
        var lit = raw[i];
        if (Array.isArray(subst)) {
            subst = subst.join("");
        }
        if (lit.endsWith("$")) {
            if (subst == null) {
                subst = "null";
            }
            else {
                subst = escapeHTML(subst.toString());
            }
            lit = lit.slice(0, -1);
        }
        result += lit;
        result += subst;
    });
    result += raw[raw.length - 1];
    return result;
}
exports.$html = $html;
/**
 * Executes the given string or function a given number of times.
 */
function $times(n, method) {
    var buffer = [];
    for (var i = 0; i < n; i += 1) {
        if (typeof method === "function") {
            buffer.push(method(i));
        }
        else {
            buffer.push(method);
        }
    }
    return buffer.join("");
}
exports.$times = $times;
function $map(collection, method) {
    var buffer = [];
    var len = collection.length;
    for (var i = 0; i < len; i++) {
        if (typeof method === "function") {
            buffer.push(method(collection[i], i).toString());
        }
        else {
            buffer.push(method.toString());
        }
    }
    return buffer;
}
exports.$map = $map;
/**
 * The Armature replacement for Circular's `each`
 * Automatically joins the given strings with nothing between them.
 * Use `$map` if you want an array.
 */
function $each(collection, method) {
    return $map(collection, method).join("");
}
exports.$each = $each;
/**
 * Calls the given function with the given object as a parameter.
 * Useful for aliasing a value to a shorter name in a template.
 */
function $alias(object, callback) {
    return callback(object);
}
exports.$alias = $alias;
/**
 * Executes the function or string only if the condition given is truthy.
 */
function $if(condition, method, other) {
    if (condition) {
        if (typeof method === "function") {
            return method();
        }
        else if (method) {
            return method;
        }
    }
    else {
        if (typeof other === "function") {
            return other();
        }
        else if (other) {
            return other;
        }
    }
    return "";
}
exports.$if = $if;

//# sourceMappingURL=index.js.map
