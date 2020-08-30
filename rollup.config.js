// rollup.config.js

import babel from 'rollup-plugin-babel';

export default {
	input: 'app/resources/js/main.js',
	output: {
		file: '.tmp/resources/js/main.es5.js',
		format: 'iife'
	},
	plugins: [
		babel({
			exclude: 'node_modules/**'
		})
	]
};
