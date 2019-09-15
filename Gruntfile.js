module.exports = function (grunt) {
    // Project config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngAnnotate: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'Website/assets/js/',
                    src: ['**/*.js', '!**/*.annotated.js'],
                    dest: 'Website/assets/js/'
                    //ext: '.annotated.js',
                    //extDot: 'last'
                }]
            }
        },
        uglify: {
            build: {
                src: [
                    'Website/assets/js/jquery.js',
                    'Website/assets/js/bootstrap.min.js',
                    'Website/assets/js/angular.min.js',
                    'Website/assets/js/*.js'
                ],
                dest: 'Website/static/js/app.min.js'
            }
        },
        cssmin: {
            build: {
                src: 'Website/assets/css/*.css',
                dest: 'Website/static/css/app.min.css'
            }
        },
        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: "Website/assets/images/",
                    src: "**/*.{jpg,png,gif}",
                    dest: "Website/static/images/"
                }]
            }
        },
        copy: {
            html: {
                expand: true,
                cwd: "Website/assets/",
                src: "*.html",
                dest: "Website/static/"
            },
            fonts: {
                expand: true,
                cwd: "Website/assets/fonts/",
                src: "**/*",
                dest: "Website/static/fonts"
            }
        },
        run: {
            prod: {
                cmd: 'node',
                args: [
                    'Website/app.js',
                    'prod'
                ]
            },
            dev: {
                cmd: 'node',
                args: [
                    'Website/app.js',
                    'dev'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-ng-annotate') // angular js doesn't like minification normally
    grunt.loadNpmTasks('grunt-contrib-uglify'); // js minification
    grunt.loadNpmTasks('grunt-contrib-cssmin'); // css minification
    grunt.loadNpmTasks('grunt-contrib-imagemin'); // image minification
    grunt.loadNpmTasks('grunt-contrib-copy'); // copy over html

    grunt.loadNpmTasks('grunt-newer'); // only run on new files - takes like 5 mins to run from scratch
    grunt.loadNpmTasks('grunt-run'); // used to start the server

    // Default task - build assets, and start a production server
    grunt.registerTask('default', ['build', 'run:prod']);

    // Dev task - build assets, and start a dev server
    grunt.registerTask('dev', ['build', 'run:dev']);

    // Build task - minimize all assets
    grunt.registerTask('build', ['newer:ngAnnotate:build', 'newer:uglify:build', 'newer:cssmin:build', 'newer:imagemin:build', 'newer:copy']);

}