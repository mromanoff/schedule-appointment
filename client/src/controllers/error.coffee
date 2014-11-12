###*
  * Controller Error Module
###

Marionette = require "backbone.marionette"
app = require "../app.coffee"
msgBus = require "../msgbus.coffee"
Model = require "../entities/error.coffee"
View = require "../views/error.coffee"

model = new Model

class Controller extends Marionette.Controller
  init: (options) ->
    msgBus.reqres.request "header:region",
      pageTitle: "Error"
      subTitle: null


    #close filters if it was open before
    app.layout.filter.close()

    #close navigation if it was open before
    app.layout.navigation.close()

    model.set options.error

    app.layout.content.show new View
      model: model

  module.exports = Controller
