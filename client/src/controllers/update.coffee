###*
  * Controller Update Module
###
Marionette = require "backbone.marionette"
moment = require "moment"
app = require "../app.coffee"
msgBus = require "../msgbus.coffee"
ReviewView = require "../views/update/review.coffee"
ConfirmationView = require "../views/update/confirmation.coffee"

view = null
originalappointment = null

app.flow = "update"

module.exports = Marionette.Controller.extend

  index: (id) ->
    require "../entities/appointment.coffee", () ->
      promise = msgBus.reqres.request "entities:appointment", id
      promise.done (appointment) ->
        originalappointment = appointment
        date = appointment.get "startDate"

        startDate = moment(date).format "YYYY-MM-DD"
        uiDate = moment(date).format "MMM D @ H A"

        msgBus.reqres.request "header:region",
          pageTitle: "Reschedule Training"
          subTitle: "edit the time for <strong>" + uiDate + "</strong> and notify your trainer"

        msgBus.reqres.request "schedule:calendar:navigation",
          startDate: startDate


        app.filterCriteria.set
          startDate: startDate
          trainerId: appointment.get "trainerId"
          trainerName: appointment.get "trainerFirstName" + " " + appointment.get "trainerLastName"
          sessionTypeId: appointment.get "sessionTypeId"
          duration: appointment.get "duration"

        #if user clicked on "Edit Session" from Update reivew page.
        #trigger change on model. even model is still the same.
        app.filterCriteria.trigger "change"

        app.analytics.set
          action: "edit-start"

      promise.fail (model, jqXHR, textStatus) ->
      msgBus.reqres.request "error",
        error: [model, jqXHR, textStatus]


  review: (appointment) ->
    msgBus.reqres.request "header:region",
        pageTitle: "Review your session"
        subTitle: null


    view = new ReviewView
      model: appointment
      original: originalappointment

    app.layout.navigation.close()
    app.layout.content.show view

    app.analytics.set
      action: "edit-review"


  confirmation: (appointment) ->
    #get id from original appointment and asign to new appointment
    appointment.set
      id: originalappointment.id

    #pick data.
    data = _.pick appointment.toJSON(), "id", "sessionTypeId", "trainerId", "startDate", "endDate", "message"

    require "../entities/update.coffee", () ->
      promise = msgBus.reqres.request "entities:update:appointment", data
      promise.done (response) ->

      #update model with new id and pass APIEndpoint
      appointment.set
        id: response.id
        APIEndpoint: app.APIEndpoint


      msgBus.reqres.request "header:region",
        pageTitle: "Enjoy your workout."
        subTitle: null


      view = new ConfirmationView
        model: appointment
        original: originalappointment


      app.layout.navigation.close()
      app.layout.content.show view

      app.analytics.set
        action: "edit-complete"


    promise.fail (response) ->
      msgBus.reqres.request "error", response.responseJSON
