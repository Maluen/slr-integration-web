'use strict';

var path = require('path');
var gulp = require('gulp');
var gutil = require("gulp-util");
var gls = require('gulp-live-server');
var sass = require('gulp-sass');
var webpack = require('webpack');

gulp.task("webpack", function(callback) {
    // run webpack
    webpack({
        // configuration
        entry: './src/client.js',
        output: {
          path: './build/public',
          filename: 'app.js'
        },
        module: {
          loaders: [
              {
                test: /\.jsx?$/,
                include: [
                  path.resolve(__dirname, './node_modules/react-routing/src'),
                  path.resolve(__dirname, './src'),
                ],
                loader: 'babel-loader',
              }, {
                 test: /\.json$/,
                 loader: 'json-loader',
              }, {
                test: /\.scss$/,
                loader: 'style-loader/useable!css-loader!postcss-loader'
              }, {
                test: /\.txt$/,
                loader: 'raw-loader',
              }, {
               test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
               loader: 'url-loader?limit=10000'
             }, {
               test: /\.(eot|ttf|wav|mp3)$/,
               loader: 'file-loader',
             }
          ]
        }
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('serve', function () {
    // Start the server at the beginning of the task 
    var server = gls.new(['--harmony', './src/server']);
    server.start();
 
    // Restart the server when file changes 
    //gulp.watch(['src/public/**/*'], server.notify.bind(server));
 
    // Note: try wrapping in a function if getting an error like `TypeError: Bad argument at TypeError (native) at ChildProcess.spawn`
    gulp.watch(['src/**'], ['webpack']);
    gulp.watch(['src/**'], function(file) {
        console.log('Server update');
        server.start.bind(server)();
        server.notify.bind(server)(file);
    });
});

gulp.task('dev', ['webpack', 'serve']);