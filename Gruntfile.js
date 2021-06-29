module.exports = function( grunt ) {
  
  grunt.initConfig({
    
    source: 'source/',
    dest: 'dest/',
    temp: 'temp/',
    prod: 'markup/',
    
    jade: {
      
      issue: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true, 
            cwd: './<%= source%>',
            src: [
              'blocks/video/**/*.jade',
              'components/video/*.jade'
            ],
            dest: '<%= dest%>',
            ext: '.html',
            extDot: 'first'
          }
        ]
      },
      dev: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true, 
            cwd: './<%= source%>',
            src: [
              '**/*.jade',
              '!layouts/**/*.jade',
              '!modules/**/*.jade',
              '!components/**/*.jade'
            ],
            dest: '<%= dest%>',
            ext: '.html',
            extDot: 'first'
          }
        ]
      },
      
      prod: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true, 
            cwd: './<%= source%>',
            src: [
              '**/*.jade',
              '!layouts/**/*.jade',
              '!modules/**/*.jade',
              '!components/**/*.jade'
            ],
            dest: '<%= temp%>',
            ext: '.html',
            extDot: 'first'
          }
        ]
      }
    },
    
    stylus: {
      options: {
        compress: false,
        urlfunc: {
          name: 'embedurl',
          limit: 30000
        }
      },
      
      issue: {
        files: [
          {
            '<%= dest%>components/video/style.css': '<%= source%>components/video/style.styl'
          }
        ]
      },
      
      template: {
        files: {
          '<%= dest%>template/template_styles.css':
            [
              '<%= source%>styl/template_styles.styl',
              '<%= source%>modules/**/*.styl'
            ]
        }
      },
      components: {
        files: [
          {
            expand: true,
            cwd: '<%= source%>components/',
            src: [ '**/*.styl' ],
            dest: '<%= dest%>components/',
            extDot: 'first',
            ext: '.css'
          }
        ]
      },
      prod: {
        options: {
          compress: {}
        },
        files: [
          {
            expand: true,
            cwd: '<%= source%>components/',
            src: [ '**/*.styl' ],
            dest: '<%= temp %>components/',
            extDot: 'first',
            ext: '.css'
          },
          {
            '<%= temp %>template/template_styles.css':
              [
                '<%= source%>styl/template_styles.styl',
                '<%= source%>modules/**/*.styl'
              ],
            '<%= temp%>template/colors.css': '<%= source%>styl/colors.styl'
          }
        ]
      }
    },
    
    /*less: {
      prod: {
        options: {},
        files: {
          '<%= temp%>template/colors.css': '<%= source%>styl/colors/colors.less'
        }
      }
    },*/
    
    concat: {
      js: {
        files: {
          '<%= source %>js/script.js': [
            '<%= source %>js/src/top.js',
            '<%= source %>js/main.js',
            '<%= source %>modules/**/*.js',
            '<%= source %>js/src/bottom.js',
          ]
        }
      },
      pluginsJS: {
        files: {
          '<%= source %>js/script.js': [
            '<%= source %>js/script.js',
            '<%= source %>js/src/plugins/**/*.js',
          ]
        }
      },
      pluginsCSS: {
        files: {
          '<%= dest %>template/template_styles.css': [
            '<%= dest %>template/template_styles.css',
            '<%= source %>js/src/plugins/**/*.css'
          ]
        }
      },
      LESS:  {
        files: {
          '<%= dest %>template/colors.less': [
            '<%= source %>styl/colors/colors.less',
            '<%= source %>styl/colors/bootstrap.less',
            '<%= source %>styl/colors/headers.less',
            '<%= source %>styl/colors/template_styles.less',
            '<%= source %>styl/colors/form.less',
            '<%= source %>styl/colors/components.less'
          ]
        }
      },
      prod: {
        files: {
          '<%= temp %>template/script.js': [
            '<%= source %>js/src/top.js',
            '<%= source %>js/main.js',
            '<%= source %>modules/**/*.js',
            '<%= source %>js/src/bottom.js',
          ]
        }
      },
      prodPluginsJS: {
        files: {
          '<%= temp %>template/script.js': [
            '<%= temp %>template/script.js',
            '<%= source %>js/src/plugins/**/*.js',
          ]
        }
      },
      prodPluginsCSS: {
        files: {
          '<%= temp %>template/template_styles.css': [
            '<%= temp %>template/template_styles.css',
            '<%= source %>js/src/plugins/**/*.css'
          ]
        }
      },
      prodLESS: {
        files: {
          '<%= temp %>template/colors.less': [
            '<%= source %>styl/colors/colors.less',
            '<%= source %>styl/colors/bootstrap.less',
            '<%= source %>styl/colors/headers.less',
            '<%= source %>styl/colors/template_styles.less',
            '<%= source %>styl/colors/form.less',
            '<%= source %>styl/colors/components.less'
          ]
        }
      }
    },
    
    jshint: {
      devTemplate: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          newcap: true,
          globals: {
            jQuery: true,
            console: true
          }
        },
        files: {
          src: [
            '<%= source %>js/script.js'
          ]
        }
      },
      devComponents: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          newcap: true,
          globals: {
            jQuery: true,
            console: true
          }
        },
        files: {
          src: [
            '<%= source %>components/**/*.js'
          ]
        }
      },
      iss15918: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          newcap: true,
          globals: {
            jQuery: true,
            console: true
          }
        },
        files: {
          src: [
            '<%= source %>components/catalog.collection-props/*.js'
          ]
        }
      },
      prod: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          newcap: true,
          globals: {
            jQuery: true,
            console: true
          }
        },
        files: {
          src: [
            '<%= temp %>template/script.js',
            '<%= temp %>components/**/*.js'
          ]
        }
      }
    },
    
    uglify: {
      devTemplate: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
          preserveComments: 'some'
        },
        files: [
          {
            '<%= dest%>template/script.js': '<%= source %>js/script.js'
          }
        ]
      },
      devComponents: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= source %>components/',
            src: '**/*.js',
            dest: '<%= dest%>components/',
            ext: '.js',
            extDot: 'first'
          }
        ]
      },
      
      issue: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: [
          {
            '<%= dest %>components/video/script.js': '<%= source %>components/video/script.js'
          }
        ]
      },
      
      prodTemplate: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
          preserveComments: 'some'
        },
        files: [
          {
            '<%= temp %>template/script.js': '<%= temp %>template/script.js'
          }
        ]
      },
      prodMinTemplate: {
        options: {
          mangle: true,
          compress: {},
          preserveComments: 'some'
        },
        files: [
          {
            '<%= temp %>template/script.js': '<%= temp %>template/script.min.js'
          }
        ]
      },
      prodComponents: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
          preserveComments: 'some'
        },
        files: [
          {
            expand: true,
            cwd: '<%= source %>components/',
            src: '**/*.js',
            dest: '<%= temp %>components/',
            ext: '.js',
            extDot: 'first'
          }
        ]
      },
      prodMinComponents: {
        options: {
          mangle: true,
          compress: {}
        },
        files: [
          {
            expand: true,
            cwd: '<%= source %>components/',
            src: '**/*.js',
            dest: '<%= temp %>components/',
            ext: '.min.js',
            extDot: 'first'
          }
        ]
      }
    },
    
    clean: {
      js: {
        src: [ '<%= source %>js/script.js' ]
      },
      images: {
        src: [ '<%= dest %>images/' ]
      },
      temp: {
        src: [ '<%= temp %>' ]
      }
    },
    
    copy: {
      iss15918: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>components/catalog.collection-props/',
            src: [ '**/*.js' ],
            dest: '<%= dest %>components/catalog.collection-props/'
          }
        ]
      },
      images: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>images/',
            src: [ '**/*.*' ],
            dest: '<%= dest %>images/'
          }
        ]
      },
      upload: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>upload/',
            src: [ '**/*.*' ],
            dest: '<%= dest %>upload/'
          }
        ]
      },
      tempImages: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>images/',
            src: [ '**/*.*' ],
            dest: '<%= temp %>images/'
          }
        ]
      },
      tempUpload: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>upload/',
            src: [ '**/*.*' ],
            dest: '<%= temp %>upload/'
          }
        ]
      },
      prodComponents: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>components/',
            src: [ '**/*.js' ],
            dest: '<%= temp %>components/'
          }
        ]
      },
      prodLESS: {
        files: [
          {
            expand: true,
            cwd: '<%= temp %>template/',
            src: [ 'colors.less' ],
            dest: '<%= prod %>template/'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: '<%= temp %>',
            src: [ '**/*.*' ],
            dest: '<%= prod %>'
          }
        ]
      }
    },
    
    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: [ '**/*' ]
      },
      
      htmlGeneral: {
        files: [
          '<%= source %>**/*.jade',
          //change component name
          '!<%= source %>components/video/**/*.jade',
          '!<%= source %>blocks/video/**/*.jade'
        ],
        tasks: 'jade:dev'
      },
      
      htmlIssue: {
        files: [
          //change component name
          '<%= source %>components/video/**/*.jade',
          '<%= source %>blocks/video/**/*.jade'
        ],
        tasks: 'htmlIssue'
      },
      
      cssGeneral: {
        files: [
          '<%= source %>**/*.styl',
          //change component name
          '!<%= source %>components/video/**/*.styl',
          '!<%= source %>blocks/video/**/*.styl'
        ],
        tasks: 'css'
      },
      
      cssIssue: {
        files: [
          '<%= source %>components/video/**/*.styl'
        ],
        tasks: 'cssIssue'
      },
      
      jsGeneral: {
        files: [
          '<%= source %>**/*.js',
          '!<%= source %>js/jscript.js',
          //change component name
          '!<%= source %>components/video/**/*.js'
        ],
        tasks: [ 'js' ]
      },
      
      jsIssue: {
        files: [
          //change component name
          '<%= source %>components/video/**/*.js'
        ],
        tasks: [ 'jsIssue' ]
      },
      
      img: {
        files: '<%= source %>images/**/*.*',
        tasks: [
          'copy:images'
        ]
      }
    },
    
    connect: {
      server: {
        options: {
          port: 3000,
          base: '<%= dest%>'
        }
      }
    }
    
  });
  
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-stylus' );
  grunt.loadNpmTasks( 'grunt-contrib-jade' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  
  grunt.registerTask( 'css', [ 'stylus:template', 'stylus:components', /*'less:prod',*/ 'concat:pluginsCSS' ]);
  grunt.registerTask( 'js', [ 'concat:js', /*'jshint:devTemplate', 'jshint:devComponents',*/ 'concat:pluginsJS', 'uglify:devTemplate', 'uglify:devComponents', 'clean:js' ] );
  grunt.registerTask( 'html', [ 'copy:images', 'jade:dev' ] );
  grunt.registerTask( 'less', [ 'concat:LESS', 'concat:prodLESS', 'copy:prodLESS' ] );
  grunt.registerTask( 'default', [ 'connect', 'css', 'js', 'html', 'watch' ] );
  
  //issue tasks
  grunt.registerTask( 'htmlIssue', [ 'jade:issue' ] );
  grunt.registerTask( 'cssIssue', [ 'stylus:issue' ] );
  grunt.registerTask( 'jsIssue', [ /*'jshint:issue', */'uglify:issue' ] );
  
  //issues
  grunt.registerTask( 'iss15918', [ 'connect', 'stylus:iss15918', 'jshint:iss15918', 'uglify:iss15918', 'jade:iss15918', 'watch' ] );
  
  grunt.registerTask( 'prod', [
    'stylus:prod',
    //'less:prod',
    'concat:prodPluginsCSS',
    'concat:prodLESS',
    'jade:prod',
    //js
    'concat:prod',
    'copy:prodComponents',
    //'jshint:prod',
    'uglify:prodTemplate',
    'uglify:prodMinTemplate',
    'concat:prodPluginsJS',
    'uglify:prodComponents',
    'uglify:prodMinComponents',
    //images
    'clean:images',
    'copy:tempImages',
    'copy:tempUpload',
    //copy
    'copy:prod',
    'clean:temp'
  ]);
  
};

/* grunt less */
/* lessc ../dest/template/colors.less ../source/template/colors.css */
/* lessc ../dest/template/colors.less ../dest/template/colors.css */
/* lessc ../dest/template/colors.less ../markup/template/colors.css */