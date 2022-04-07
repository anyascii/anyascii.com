import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';

export default {
	context: 'this',
	input: 'main.js',
	output: {
		file: 'index.js'
	},
	plugins: [
		commonjs(),
		nodeResolve({ browser: true }),
		babel({
			babelHelpers: 'inline',
			exclude: [/core-js/],
			presets: [
				[
					'@babel/preset-env',
					{
						targets: '> 0%',
						useBuiltIns: 'usage',
						corejs: '3.21',
						spec: true
					},
				],
			],
		})
	]
};
