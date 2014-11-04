define (require, exports, module) ->

  App = require 'app'
  Marionette = require 'marionette'
  View = require 'views/filter/trainer'

  Model = Backbone.Model.extend(
    defaults:
      durations: null
      trainers: null
  )

  model = new Model()
  view = new View
    model: model

  module.exports = Marionette.Controller.extend(

      initialize: () ->
      model.set
          trainers: App.scheduleCriteria.trainers
          durations: App.scheduleCriteria.durations

    App.layout.filter.show(view)
  )
