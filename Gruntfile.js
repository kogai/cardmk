module.exports = function(grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: 'public/',
                    hostname:'localhost'
                }
            },
            stop : {
                options : { keepalive: false }
            }
        },
        express: {
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },
        jshint: {
            files: ['public/js/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                },
                ignores : ['public/js/_analytics.js'],
                force : true
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['public/js/*.js'],
                dest: 'public/js/min/functions.min.js'
            }
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'public/js/min/functions.min.map'
                },
                files: {
                    'public/js/min/functions.min.js': ['public/js/*.js']
                }
            }
        },
        compass : {
            check : {
                options : {
                    outputStyle: 'nested',
                    sassDir : 'public/stylesheets/sass' , 
                    cssDir : 'public/sass/lint'
                }
            },
            dist : {
                options : {
                    sourcemap: true,
                    outputStyle: 'compressed',
                    sassDir : 'public/stylesheets/sass' , 
                    cssDir : 'public/stylesheets/'
                }
            }
        },
        csslint : {
            strict : {
                options : {
                    'adjoining-classes' : false,
                    'star-property-hack' : false,
                    'ids' : false,
                    'important' : false,
                    'box-sizing' : false,
                    'text-indent' : false,
                    'fallback-colors' : false,
                    'regex-selectors' : false
                },
                src : ['public/sass/lint/*.css']
            }
        },
        command: {
            dev : {
                cmd: 'node bin/www'
            }
        },
        watch: {
            html : {
                files : [ 'views/*.haml' , 'public/images/*.png' , 'public/images/**/*.png' ],
                tasks : [ 'haml'],
                options: {
                    livereload: true,
                    nospawn: true
                }
            },
            js : {
                files: [ 'public/js/*.js' ],
                tasks: [ 'jshint' , 'concat', 'uglify' ],
                options: {
                    livereload: true,
                    nospawn: true
                }
            },
            sass : {
                files : [ 'public/stylesheets/sass/*.sass' ],
                tasks: [ 'compass:check' , 'csslint' , 'compass:dist' ] ,
                options: {
                    livereload: true,
                    nospawn: true
                }
            },
            express: {
                files:  [ 'app.js' , 'routes/*.js' ],
                tasks:  [ 'command' ],
                options: {
                    delay: 1000
                }
            }
        }
    });

    [
        'grunt-contrib-commands',
        'grunt-contrib-connect',
        'grunt-express-server',
        'grunt-contrib-uglify',
        'grunt-contrib-concat',
        'grunt-contrib-watch',
        'grunt-contrib-compass',
        'grunt-contrib-jshint',
        'grunt-contrib-csslint'
    ].forEach(function (task) {
    grunt.loadNpmTasks(task);
    })

    grunt.registerTask('build', [ 'haml' , 'jshint' , 'concat', 'uglify' , 'compass:check' , 'csslint' , 'compass:dist' ]);
    grunt.registerTask('default', [ 'command' , 'watch' ]);
};