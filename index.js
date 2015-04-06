var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    exorcist = require('exorcist');

module.exports = function (config) {
    return function () {
         return browserify(config.options)
                .transform('coffeeify')
                .transform({sourcemap:true, global: true}, 'uglifyify')
                .bundle()
                .pipe(exorcist(config.dest + '/main.js.map'))
                .pipe(source('main.js'))
                .pipe(gulp.dest(config.dest));
    };
};
