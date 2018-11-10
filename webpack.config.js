const config = {
  mode: 'development',
  output: {
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}

module.exports = config
