###*
  * Controller Error Module
###

Marionette = require "backbone.marionette"
App = require "../app.coffee"
msgBus = require "../msgbus.coffee"
Model = require "../entities/error.coffee"
View = require "../views/error.coffee"

model = new Model()

module.exports = Marionette.Controller.extend

  initialize: (options) ->
    msgBus.reqres.request "schedule:header",
      pageTitle: "Error"
      subTitle: null


    #close filters if it was open before
    App.layout.filter.close()

    #close navigation if it was open before
    App.layout.navigation.close()

    model.set options.error

    App.layout.content.show new View
      model: model
