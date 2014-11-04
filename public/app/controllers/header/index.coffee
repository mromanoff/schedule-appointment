define (require, exports, module) ->

  Marionette = require 'marionette'
  App = require 'app'
  Model = require 'entities/header'
  View = require 'views/header'

  model = new Model()
  view = new View(
    model: model
  )

  module.exports = Marionette.Controller.extend(
      initialize: (options) ->
        model.set(options)

        App.layout.header.show(view)
  )