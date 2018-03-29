const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
	devtool:'inline-soure-map',
	devServer:{
		contentBase:'./dist'
	}
})

