/* global module */

module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            build: {
                src: [
                    '**/*.js',
                    '!node_modules/**/*.js',
                    '!test/**/*.js'
                ]
            }
        },

        // Unit testing is provided by Karma.  Change the two commented locations
        // below to either: mocha, jasmine, or qunit.
        karma: {
            options: {
                basePath: './',
                singleRun: true,
                captureTimeout: 7000,
                autoWatch: true,

                // level of logging
                // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
                //logLevel: config.LOG_INFO,
                //logLevel: 'ERROR',
                logLevel: 'ERROR',

                // test results reporter to use
                // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
                reporters: ['progress', 'coverage'],
                // Start these browsers, currently available:
                // - Chrome
                // - ChromeCanary
                // - Firefox
                // - Opera (has to be installed with `npm install karma-opera-launcher`)
                // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
                // - PhantomJS
                // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
                browsers: ['Chrome'],

                // Change this to the framework you want to use.
                frameworks: ['jasmine'],

                plugins: [
                    'karma-jasmine',
                    'karma-mocha',
                    'karma-qunit',
                    'karma-phantomjs-launcher',
                    'karma-coverage'
                ],

                preprocessors: {
                    'app/**/*.js': 'coverage'
                },

                coverageReporter: {
                    type: 'lcov',
                    dir: 'test/coverage'
                },

                files: [
                    '../../vendor/bower_components/requirejs/require.js',
                    'test/runner.js',

                    { pattern: 'app/*.js', included: false },
                    { pattern: 'app/**/*.js', included: false },
                    { pattern: 'vendor/**/*.js', included: false },

                    // Derives test framework from Karma configuration.
                    {
                        pattern: 'test/<%= karma.options.frameworks[0] %>/**/*.spec.js',
                        included: false
                    }
                ]
            },

            // This creates a server that will automatically run your tests when you
            // save a file and display results in the terminal.
            daemon: {
                options: {
                    singleRun: false
                }
            },

            // This is useful for running the tests just once.
            run: {
                options: {
                    singleRun: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Third-party tasks.
    grunt.loadNpmTasks('grunt-karma');
    //grunt.loadNpmTasks('grunt-karma-coveralls');

    // Default task(s).
    grunt.registerTask('default', ['jshint']);

};