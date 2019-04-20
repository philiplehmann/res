import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import config from './config'

export default merge.smart(config, {
  mode: 'development',
  entry: {
    index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(`public/assets`),
    publicPath: '/assets/',
    sourceMapFilename: '[file].map'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      minimize: false
    })
  ]
})
