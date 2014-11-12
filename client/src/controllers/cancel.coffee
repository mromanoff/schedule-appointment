###*
  * Controller Cancel Module
###

Marionette = require "backbone.marionette"
app = require "../app.coffee"
msgBus = require "../msgbus.coffee"
CancelView = require "../views/cancel/index.coffee"
ReviewView = require "../views/cancel/review.coffee"
ConfirmationView = require "../views/cancel/confirmation.coffee"

view = null

app.flow = "cancel"

module.exports = Marionette.Controller.extend
    index: (id) ->
      msgBus.reqres.request "schedule:header",
        pageTitle: "Cancel your session"

      require ["entities/appointment"], () ->
        promise = msgBus.reqres.request "entities:appointment", id
        promise.done (appointment) ->
          view = new CancelView
            model: appointment

          app.layout.content.show view

          app.analytics.set
            action: "delete-start"


        promise.fail (model, jqXHR, textStatus) ->
          msgBus.reqres.request "schedule:error",
            error: [model, jqXHR, textStatus]

    review: (appointment) ->
      msgBus.reqres.request "schedule:header",
        pageTitle: "Cancel your session"

      view = new ReviewView
        model: appointment

      app.layout.content.show view

      app.analytics.set
        action: "delete-review"


    confirmation: (appointment) ->
      #pick data.
      data = _.pick appointment.toJSON(), "id", "cancelAll", "message"

      require ["entities/cancel"], () ->
        promise = msgBus.reqres.request "entities:cancel:appointment", data
        promise.done (response) ->

          #update model with new id and pass APIEndpoint
          appointment.set
            id: response.id
            APIEndpoint: app.APIEndpoint


          msgBus.reqres.request "schedule:header",
            pageTitle: "Your session is canceled"

          view = new ConfirmationView
            model: appointment

          app.layout.content.show view

          app.analytics.set
            action: "delete-complete"

        promise.fail (response) ->
          msgBus.reqres.request "schedule:error", response.responseJSON
