###*
  * Controller Detail Module
###

Marionette = require "backbone.marionette"
app = require "../app.coffee"
msgBus = require "../msgbus.coffee"
View = require "../views/detail/index.coffee"
require "../entities/appointment.coffee"

view = null

app.flow = "detail"

class Controller extends Marionette.Controller
  index: (id) ->
    msgBus.reqres.request "header:region", pageTitle: "Session Detail"

    promise = msgBus.reqres.request "entities:appointment", id
    promise.done (appointment) ->
      view = new View
        model: appointment

      app.layout.content.show view

    promise.fail (model, jqXHR, textStatus) ->
      msgBus.reqres.request "error", error: [model, jqXHR, textStatus]

module.exports = Controller