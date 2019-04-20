import path from 'path'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import merge from 'webpack-merge'
import config from './config'

export default merge.smart(config, {
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(`public/assets`),
    publicPath: '/assets/'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { zindex: false }
      })
    ]
  },
  plugins: [
    //new WebpackBundleAnalyzer.BundleAnalyzerPlugin()
  ]
})
