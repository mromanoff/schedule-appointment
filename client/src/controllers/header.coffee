###*
  * Controller Header Module
###
Marionette = require "backbone.marionette"
app = require "../app.coffee"
Model = require "../entities/header.coffee"
View = require "../views/header.coffee"

model = new Model
view = new View
  model: model

class Controller extends Marionette.Controller
    init: (options) ->
      model.set options
      app.layout.header.show view

module.exports = Controller