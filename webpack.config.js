

const webpack = require('webpack');
const helpers = require('./config/helpers');

/** Webpack plugins */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//入口
var entry = {
    //用到的第三方库
    'vendor': './src/vendor.ts',
    //使普通浏览器完整支持es6的语法
    'polyfills': './src/polyfills.ts',
    //程序入口
    'main': './src/main.ts'
  };

//输出
var output = {
    libraryTarget: 'umd',
    path: helpers.root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    //chunkFilename: '[name].chunk.js'
};

var resolve = {
    //引用时可以忽略后缀
    extensions: ['', '.ts', '.js', '.json'],
    // Make sure root is src
    root: helpers.root('src'),
    // remove other default values
    modulesDirectories: ['node_modules']
};

//js预处理
/*
var preLoaders = [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular2-material')
        ]
      }
];
*/

//加载器
var loaders = [
    //ts加载器
    {
        test: /\.ts$/,
        loaders:[   'awesome-typescript-loader',
                    'angular2-template-loader'  //将组件中的templateUrl替换为require函数
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
    },
    //html加载器
    {
        test: /\.(html|htm)$/,
        loader: 'raw-loader'
    },
    //css文件加载器
    {
        test: /\.css$/,
        loader: 'raw-loader'
    },
    //json文件
    {
        test: /\.json$/,
        loader: 'json-loader'
    }
];

var plugins = [
    
    new CopyWebpackPlugin([
        {
            from: 'src/assets',
            to: 'assets'
        }
    ]),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: helpers.packageSort(['vendor','polyfills','main'])
    }),
    
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: 2
    }),
    
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
       compress: {
                warnings: false
            }
    })
    
];

//var devtool = 'cheap-module-eval-source-map';
/*
var devServer = {
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    stats: 'minimal'
};
*/

var config = {
    debug: true,
    entry: entry,
    output: output,
    module: {
        //preLoaders: preLoaders,
        loaders: loaders
    },
    resolve: resolve,
    plugins: plugins,
    //devtool:devtool,
    //devServer:devServer,
    //对于web项目，公共库走cdn
    externals: {
      //  /^@angular\//,
      //  /^BaiduMap\//
    }
}
module.exports = config;