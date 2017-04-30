var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

module.exports = function ({ options, transforms, dest }) {
    return function () {
        let bundle = browserify(options);
        if (transforms && transforms.length > 0) {
            bundle = transforms.reduce((bundle, transform) => {
                let transformArguments = transform;
                if (!Array.isArray(transformArguments)) {
                    transformArguments = [transformArguments];
                }
                return bundle.transform.apply(bundle, transformArguments);
            }, bundle);
        }
         return bundle
                .bundle()
                .on('error', e => console.log(e))
                .pipe(source('main.js'))
                .pipe(gulp.dest(dest));
    };
};
a
