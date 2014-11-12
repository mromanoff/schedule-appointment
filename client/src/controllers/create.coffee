###*
  * Controller Create Module
###

_ = require "underscore"
Marionette = require "backbone.marionette"
msgBus = require "../msgbus.coffee"
Utils = require "../components/utils.coffee"
app = require "../app.coffee"
require "../entities/create.coffee"

ReviewView = require "../views/create/review.coffee"
ConfirmationView = require "../views/create/confirmation.coffee"

#view = null
utils =  new Utils

#app.flow = "create"

class Controller extends Marionette.Controller
  index: (date) ->
    date = if utils.isValidDate date  then date else utils.TOMORROW

    msgBus.reqres.request "header:region",
      pageTitle: "Schedule Training"

    msgBus.reqres.request "trainer:filter"

    msgBus.reqres.request "calendar:navigation",
      startDate: date

    app.filterCriteria.set
      startDate: date

    #app.analytics.set
      #action: "add-start"

  review: (appointment) ->
    msgBus.reqres.request "header:region",
      pageTitle: "Review your session"

    view = new ReviewView
      model: appointment

    #app.layout.filter.close()
    #app.layout.navigation.close()
    app.layout.content.show view

    #app.analytics.set
      #action: "add-review"

  confirmation: (appointment) ->
    #pick data.
    data = _.pick appointment.toJSON(), "id", "sessionTypeId", "trainerId", "startDate", "endDate", "message"

    promise = msgBus.reqres.request "entities:create:appointment", data
    promise.done (response) ->

      #update model with new id and pass APIEndpoint
      appointment.set
        id: response.id
        APIEndpoint: app.APIEndpoint

      msgBus.reqres.request "header:region",
        pageTitle: "Enjoy your workout."

      view = new ConfirmationView
        model: appointment

      #app.layout.navigation.close()
      app.layout.content.show view

      #app.analytics.set
        #action: "add-complete"

    promise.fail (response) ->
      msgBus.reqres.request "error", response.responseJSON


module.exports = Controller