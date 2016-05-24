"use strict";

const pack = require("./package.json");

// Load TypeScript from our dependencies
try {
	var typescript = require("typescript");
} catch(e) {
	console.error("Couldn't load some dependencies; try running 'npm install'");
	process.exit(1);
}

// Compiler options on the server
// typescript goes to gulp-typescript
const server = {
	typescript: {
		module: "commonjs",
		target: "ES5",
		moduleResolution: "node",
		typescript: typescript,
		noEmitOnError: true,
		experimentalDecorators: true,
		noLib: true
	}
};

const config = {
	// Omit this to turn off Browsersync
	// Passed to Browsersync
	browsersync: false,

	// Default preset
	preset: "default",

	// Collection of presets
	presets: {
		default: {
			watch: true,
			sourcemaps: true,
			minify: false,
			out: "es5"
		}
	},

	// List of pipelines to build and use
	pipelines: [
		// Build primary server files (node_modules/app/server/)
		{
			name: "Library (CommonJS)",
			config: server,
			type: "server",

			input: "src/**/*.ts",
			output: "",

			extraEntries: ["node_modules/typescript/lib/lib.es6.d.ts"],

			typingsOutput: "",
			typingsOutputType: "module",
			moduleName: pack.name,
			moduleEntryPoint: "index.ts"
		}
	]
};

module.exports = config;