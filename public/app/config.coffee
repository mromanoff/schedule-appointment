requirejs.config
  #baseUrl: './'

  paths:
    vendor: '../vendor'
    jquery: '../vendor/bower_components/jquery/jquery'
    #Opt for Lo-Dash Underscore compatibility build over Underscore.
    underscore: '../vendor/bower_components/lodash/dist/lodash.underscore'
    backbone: '../vendor/bower_components/backbone/backbone'
    marionette: '../vendor/bower_components/backbone.marionette/lib/backbone.marionette'
    'backbone.wreqr': '../vendor/bower_components/backbone.wreqr/lib/amd/backbone.wreqr'
    spin: '../vendor/bower_components/spin.js/spin'
    text: '../vendor/bower_components/requirejs-text/text'
    moment: '../vendor/bower_components/momentjs/moment'
    debug: '../vendor/_console'


  shim:
    backbone:
      deps: ['jquery', 'underscore']
      exports: 'Backbone'

    marionette:
      deps: ['backbone']
      exports: 'Marionette'