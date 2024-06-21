const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry,
		editor: './assets/js/editor/editor.js',
	},
	module: {
		...defaultConfig.module,
	},
	plugins: [new DependencyExtractionWebpackPlugin()],
};
