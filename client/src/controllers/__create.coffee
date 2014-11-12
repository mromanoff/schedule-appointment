###*
  * Controller Create Module
###

Marionette = require "backbone.marionette"
app = require "../app.coffee"
msgBus = require "../msgbus.coffee"
ReviewView = require "../views/create/review.coffee"
ConfirmationView = require "../views/create/confirmation.coffee"
view = null

app.flow = "create"

module.exports = Marionette.Controller.extend

  index: (date) ->
    console.log "Create: date attr ", date

    date = if app.utils.isValidDate date  then date else app.utils.TOMORROW

    msgBus.reqres.request "schedule:header",
      pageTitle: "Schedule Training"

    msgBus.reqres.request "schedule:trainer:filter"

    msgBus.reqres.request "schedule:calendar:navigation",
      startDate: date

    app.filterCriteria.set
      startDate: date

    app.analytics.set
      action: "add-start"


  review: (appointment) ->
    msgBus.reqres.request "schedule:header",
      pageTitle: "Review your session"

    view = new ReviewView
      model: appointment

    app.layout.filter.close()
    app.layout.navigation.close()
    app.layout.content.show view

    app.analytics.set
      action: "add-review"


  confirmation: (appointment) ->
    #pick data.
    data = _.pick appointment.toJSON(), "id", "sessionTypeId", "trainerId", "startDate", "endDate", "message"

    require ["entities/create"], () ->
      promise = msgBus.reqres.request "entities:create:appointment", data
      promise.done (response) ->

        #update model with new id and pass APIEndpoint
        appointment.set
          id: response.id
          APIEndpoint: app.APIEndpoint

        msgBus.reqres.request "schedule:header",
          pageTitle: "Enjoy your workout."

        view = new ConfirmationView
          model: appointment

        app.layout.navigation.close()
        app.layout.content.show view

        app.analytics.set
          action: "add-complete"

      promise.fail (response) ->
        msgBus.reqres.request "schedule:error", response.responseJSON
