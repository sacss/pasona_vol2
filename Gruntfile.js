module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jekyll: {
      dev: {
        options: {
          src: '_source',
          dest: 'demo'
        }
      }
    },

    compass: {
      dev: {
        options: {
          httpPath: '.',
          sassDir: '_source/_scss',
          cssDir: 'demo/css',
          images: '_source/images',
          outputStyle: 'expanded',
          env: 'development',
          relativeAssets: false,
          noLineComments: true
        }
      }
    },

    autoprefixer: {
      dev: {
        src: 'demo/css/styles.css',
        dest: 'demo/css/styles.css'
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'demo',
          keepalive: true,
          livereload: true
        }
      }
    },

    uglify: {
      dev: {
        files: {
          'demo/js/all.js': ['_source/js/jquery-2.1.1.min.js', '_source/js/function.js']
        }
      }
    },

    concurrent: {
      server: {
        tasks: [
          'connect',
          'open',
          'watch'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:8000'
      }
    },

    watch: {
      html: {
        files: ['_source/**/*.html'],
        tasks: ['jekyll:dev', 'compass', 'autoprefixer', 'uglify']
      },
      css: {
        files: ['_source/**/*.scss'],
        tasks: ['compass', 'autoprefixer']
      },
      js: {
        files: ['_source/**/*.js'],
        tasks: ['uglify']
      },
      server: {
        files: [
          'demo/**/*'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  // Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }

  grunt.registerTask('compile', ['jekyll:dev', 'compass', 'autoprefixer', 'uglify']);
  grunt.registerTask('server', ['jekyll:dev', 'compass', 'autoprefixer', 'uglify', 'concurrent:server']);
};
