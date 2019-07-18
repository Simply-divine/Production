module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: ['scripts/Arrays.js', 'scripts/Object.js'],
                dest: 'dist/app.js',
            }
        },
        commits: {
            options: {
                format: /^(Add|Update|Fix|Remove|Docs|Deps):/,
                begin: 'some-sha',
                noMerge: false,
                strict: true
            }
        },
        uglify: {
            build: {
                src: 'dist/app.js',
                dest: 'dist/app.min.js'
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/theme.css': ['styles/*'],
                }
            }
        },
        watch: {
            scripts: {
                files: ['scripts/*.js', 'styles/*.css'],
                tasks: ['concat', 'uglify', 'cssmin', 'commits'],
            },
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-git-commits');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
};