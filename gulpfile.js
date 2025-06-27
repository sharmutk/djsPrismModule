const gulp = require('gulp');
// djs-dev-tools-primer - https://djs.deshaw.com/projects/djs-dev-tools/master/docs/getting-started/ddt-packages
const {addStandardGulpTasks} = require('@deshaw/djs-dev-tools-all');

const fse = require('fs-extra');
const {getServerConfig} = require('./config/configReader');
const webpackConfig = require('./config/webpack.config');

const otherTaskConfig = {
    isReact: true,
    hashAssets: true,
    test: {
        opts: {
            exit: true,
        },
    },
};

// https://djs.deshaw.com/projects/djs-dev-tools/master/docs/api-docs/types/DEVTOOLS_CONFIG
const userConfig = {
    ...getServerConfig(),
    webpack: webpackConfig,
    ...otherTaskConfig,
};

addStandardGulpTasks(gulp, userConfig);

// This is how you define a custom task
gulp.task('clean-djs-config', async (done) => {
    fse.emptyDirSync('djs-config');
    // If you are not returning a stream, use an async hint otherwise gulp won't know when your task completed
    // This will make it difficult to compose with other tasks
    // The easiest async hint is calling done or returning a promise.
    // Others can be seen here - https://github.com/gulpjs/gulp/blob/master/docs/API.md#async-task-support
    done();
    // return Promise.resolve()
});

// Stringing together 2 tasks
gulp.task('recreate-server-config', gulp.series('clean-djs-config', 'create-server-config'));
