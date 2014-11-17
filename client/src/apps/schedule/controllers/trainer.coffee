###*
  * Controller Trainer Module
###
Marionette = require "backbone.marionette"
Backbone = require "backbone"
app = require "../app.coffee"
View = require "../views/filter/trainer.coffee"

class Model extends Backbone.Model
  defaults:
    durations: null
    trainers: null

model = new Model
view = new View
  model: model

class Controller extends Marionette.Controller
  init: () ->
    model.set
        trainers: app.scheduleCriteria.trainers
        durations: app.scheduleCriteria.durations

    app.layout.filter.show view

module.exports = Controller
