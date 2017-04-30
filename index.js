var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    exorcist = require('exorcist');

module.exports = function ({ options, transforms, dest }) {
    return function () {
         const bundle = browserify(options);

        if (transforms && transforms.length > 1) {
            bundle = transforms.reduce((bunle, transform) => {
                let transformArguments = transform;
                if (!isArray(transformArguments)) {
                    transformArguments = [transformArguments];
                }
                return bundle.transform.apply(bundle, transformArguments);
            }, bundle);
        }
         return bundle
                .bundle()
                .pipe(exorcist(dest + '/main.js.map'))
                .pipe(source('main.js'))
                .pipe(gulp.dest(dest));
    };
};
