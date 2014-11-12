###*
  * Controller Detail Module
###

Marionette = require "backbone.marionette"
app = require "../app.coffee"
msgBus = require "../msgbus.coffee"
View = require "../views/detail/index.coffee"
view = null

app.flow = "detail"

module.exports = Marionette.Controller.extend

  index: (id) ->
    msgBus.reqres.request "schedule:header", pageTitle: "Session Detail"

    require ["entities/appointment"], () ->
      promise = msgBus.reqres.request "entities:appointment", id
      promise.done (appointment) ->
        view = new View
          model: appointment

        app.layout.content.show view

      promise.fail (model, jqXHR, textStatus) ->
        msgBus.reqres.request "schedule:error", error: [model, jqXHR, textStatus]
