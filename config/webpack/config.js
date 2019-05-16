/*global process*/
import webpack from 'webpack'
import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import Res from '@res/core'

const WHITE_LIST_ENV = []

export default {
  context: path.resolve('.'),
  entry: {
    'assets/index': [
      path.resolve('app', 'frontend', 'assets', 'styles', `index.scss`),
      path.resolve('app', 'frontend', 'index.js')
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        sideEffects: false,
        exclude: /node_modules\/(?!(atpjs)\/).*/
      },
      {
        test: /\.(png|jpg|gif)/,
        use: [
          { loader: 'file-loader' },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false
              }
            }
          }
        ]
      },
      {
        test: /\.svg(\?.*)?$/,
        use: [
          { loader: 'file-loader' },
          { loader: 'svg-transform-loader' },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false
              }
            }
          }
        ]
      },
      {
        test: /\.xjson/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].json'
            }
          }
        ]
      },
      {
        test: /\.pdf/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      },
      {
        test: /(\.scss|\.css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true, url: true, importLoaders: 1 } },
          { loader: 'svg-transform-loader/encode-query' },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.scss',
      '.css',
      '.png',
      '.jpg',
      '.svg',
      '.gif',
      '.pdf',
      '.ttf',
      '.otf',
      '.eot',
      '.woff',
      '.woff2',
      '.xjson'
    ],
    alias: {
      images: path.resolve('app/frontend/assets/images'),
      styles: path.resolve('app/frontend/assets/styles'),
      jsons: path.resolve('app/frontend/assets/jsons'),
      pdfs: path.resolve('app/frontend/assets/pdfs'),
      app: path.resolve(`app/frontend`),

      api: path.resolve(`app/frontend/api`),
      stores: path.resolve(`app/frontend/stores`),
      views: path.resolve(`app/frontend/views`),
      components: path.resolve(`app/frontend/components`),
      helpers: path.resolve(`app/frontend/helpers`),
      libs: path.resolve(`app/frontend/libs`),
      data: path.resolve(`app/frontend/data`)
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      ATP_ENV: JSON.stringify(
        WHITE_LIST_ENV.reduce(
          (result, entry) => {
            if (process.env[entry]) result[entry] = process.env[entry]
            return result
          },
          { ENV: Res.environment }
        )
      )
    })
  ]
}
