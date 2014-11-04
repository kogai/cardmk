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
                    sassDir : 'public/sass' , 
                    cssDir : 'public/sass/lint'
                }
            },
            dist : {
                options : {
                    sourcemap: true,
                    outputStyle: 'compressed',
                    sassDir : 'public/sass' , 
                    cssDir : 'public'
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
        haml : {
            dist : {
                files: {
                    'public/index.html' : [ 'public/haml/index.haml' ]
                }
            }
        },
        watch: {
            html : {
                files : [ 'public/haml/*.haml' , 'public/images/*.png' , 'public/images/**/*.png' ],
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
                files : [ 'public/sass/*.sass' ],
                tasks: [ 'compass:check' , 'csslint' , 'compass:dist' ] ,
                options: {
                    livereload: true,
                    nospawn: true
                }
            },
            express: {
                files:  [ 'app.js' , 'route/*.js' ],
                tasks:  [ 'express:dev:stop' ],
                options: {
                    delay: 1000
                }
            }
        }
    });

    [
        'grunt-contrib-connect',
        'grunt-contrib-haml',
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
    grunt.registerTask('default', [ 'express:dev' , 'watch' ]);
};