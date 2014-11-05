define (require, exports, module) ->


  Marionette = require 'marionette'
  App = require 'app'
  msgBus = require 'msgbus'
  Model = require 'entities/error'
  View = require 'views/error'

  model = new Model()

  module.exports = Marionette.Controller.extend

    initialize: (options) ->
      msgBus.reqres.request 'schedule:header',
        pageTitle: 'Error'
        subTitle: null


      #close filters if it was open before
      App.layout.filter.close()

      #close navigation if it was open before
      App.layout.navigation.close()

      model.set options.error

      App.layout.content.show new View
        model: model
  return