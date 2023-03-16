import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

export default {
	input: 'main.js',
	output: {
		file: 'index.js'
	},
	plugins: [
		nodeResolve(),
		commonjs(),
		babel({
			babelHelpers: 'runtime',
			exclude: /core-js/,
			targets: '> 0%',
			presets: [
				[
					'@babel/preset-env', {}
				]
			],
			plugins: [
				[
					'@babel/plugin-transform-runtime',
					{
						corejs: 3,
						version: '7.21.0'
					}
				]
			]
		})
	]
};
