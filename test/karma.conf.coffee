module.exports = (config) ->
  'use strict'
  config.set
    autoWatch: true

    frameworks: [ 'jasmine' ]

    basePath: '../'

    files: [
      'test/polifills.js'
      'node_modules/xml-fiesta/dist/xml-fiesta.js'
      # bower:js
      'bower_components/jquery/dist/jquery.js'
      'bower_components/angular/angular.js'
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js'
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js'
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js'
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js'
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js'
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js'
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js'
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js'
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js'
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js'
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js'
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js'
      'bower_components/angular-animate/angular-animate.js'
      'bower_components/angular-cookies/angular-cookies.js'
      'bower_components/angular-resource/angular-resource.js'
      'bower_components/angular-route/angular-route.js'
      'bower_components/angular-sanitize/angular-sanitize.js'
      'bower_components/angular-touch/angular-touch.js'
      'bower_components/pdfjs-dist/web/compatibility.js'
      'bower_components/pdfjs-dist/build/pdf.js'
      'bower_components/angular-pdf/dist/angular-pdf.js'
      'bower_components/angular-ui-router/release/angular-ui-router.js'
      'bower_components/angular-local-storage/dist/angular-local-storage.js'
      'bower_components/angular-translate/angular-translate.js'
      'bower_components/angular-mocks/angular-mocks.js'
      # endbower
      # bower:coffee
      'app/scripts/**/*.coffee'
      'app/scripts/**/*.coffee'
      'test/spec/**/*.coffee'
    ]

    exclude: []

    port: 8080

    browsers: [
      'PhantomJS'
      # 'Chrome'
    ]

    preprocessors:
      '**/*.coffee': 'coffee'
      'app/*/{*.coffee,!(test)/**/*.coffee}': 'coverage'

    reporters: ['spec', 'coverage', 'clear-screen']

    specReporter:
      suppressSkipped: true

    coverageReporter:
      type : 'lcov'
      dir : 'coverage/'
      instrumenterOptions:
        istanbul:
          noCompact: true

    singleRun: false

    colors: true

    concurrency: Infinity

    logLevel: config.LOG_INFO
  return
