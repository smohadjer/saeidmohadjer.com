// rollup.config.js

import babel from '@rollup/plugin-babel';

export default {
	input: 'public/resources/js/main.js',
	output: {
		file: 'public/resources/js/bundle.js',
		format: 'iife'
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
      babelHelpers: 'bundled'
		})
	]
};
