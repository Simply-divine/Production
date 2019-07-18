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
                tasks: ['concat', 'uglify', 'cssmin'],
            },
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).
    grunt.registerTask('default', ['watch']);
};