import path from 'path';

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8000,
  },
};
