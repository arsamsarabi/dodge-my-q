const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
  components: path.resolve(__dirname, './src/components'),
  stores: path.resolve(__dirname, './src/stores'),
  resources: path.resolve(__dirname, './src/resources'),
  pages: path.resolve(__dirname, './src/pages'),
  config: path.resolve(__dirname, './src/config'),
}

const isDev = process.env.NODE_ENV === 'development'

const devCss = [
  'css-hot-loader',
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    query: {
      modules: true,
      localIdentName: '[local]__[hash:base64:5]',
      sourceMap: false,
    },
  },
]
const prodCss = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      // you can specify a publicPath here
      // by default it use publicPath in webpackOptions.output
      publicPath: './dist'
    }
  },
  {
    loader: 'css-loader',
    query: {
      modules: true,
      localIdentName: '[name]__[local]___[hash:base64:5]',
      sourceMap: false
    },
  },
]
const cssConfig = isDev ? devCss : prodCss

const hotMiddlewareScript =
  `webpack-hot-middleware/client?path=http://localhost:${process.env.PORT}/__webpack_hmr`

const config = {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  entry: isDev ? [
    'react-hot-loader/patch',
    hotMiddlewareScript,
    './src/index.js'
  ] : './src/index.js',
  output: {
    path: path.resolve(PATHS.dist),
    filename: 'js/app-bundle.js',
  },
  devtool: isDev ? 'eval-source-map' : '',
  devServer: {
    hot: true,
    historyApiFallback: true,
    overlay: true,
    open: true,
    stats: 'errors-only',
  },
  resolve: {
    extensions: ['.js', '.css', '.scss'],
    alias: {
      stores: PATHS.stores,
      pages: PATHS.pages,
      components: PATHS.components,
      resources: PATHS.resources,
      config: PATHS.config,
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: cssConfig,
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
        exclude: /node_modules/,
        query: {
          name: 'fonts/[hash].[ext]'
        },
      },
      {
        test: /\.(jpe?g|gif|png|svg)($|\?)/i,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'images/[hash].[ext]'
        },
        include: [
          PATHS.src,
        ]
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          DEV_BASE_API: JSON.stringify(isDev ? 'http://localhost:4100/api' : '/api'),
          DEV_BASE_GQL: JSON.stringify(isDev ? 'http://localhost:4100/api' : '/gql'),
        }
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Dodge my Q',
      filename: 'index.html',
      template: path.join(PATHS.src, 'index.ejs'),
      cache: !isDev,
      hash: !isDev,
    }),
  ],
}

if (isDev) {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

if (!isDev) {
  config.plugins.push(
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: require('cssnano'),
      canPrint: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/style-bundle.css',
      chunkFilename: '[id].css'
    })
  )
  config.optimization = {
    minimizer: [
      new UglifyJsPlugin()
    ]
  }
}


module.exports = config
