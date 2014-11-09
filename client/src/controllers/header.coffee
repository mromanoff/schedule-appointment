###*
  * Controller Header Module
###
Marionette = require "backbone.marionette"
App = require "../app.coffee"
Model = require "../entities/header.coffee"
View = require "../views/header.coffee"

model = new Model()
view = new View
  model: model

module.exports = Marionette.Controller.extend
    initialize: (options) ->
      model.set options

      App.layout.header.show view