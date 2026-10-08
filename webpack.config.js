const config = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...config,
	module: {
		...config.module,
		rules: [
			...config.module.rules,
			{
				test: /(?:js-masonry|ctc_overlay)\.js$/,
				include: /node_modules/,
				use: path.resolve(
					__dirname,
					'tooling/legacy-library-loader.cjs'
				),
			},
		],
	},
};
