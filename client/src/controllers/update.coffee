###*
  * Controller Update Module
###
Marionette = require "backbone.marionette"
moment = require "moment"
App = require "../app.coffee"
msgBus = require "../msgbus.coffee"
ReviewView = require "../views/update/review.coffee"
ConfirmationView = require "../views/update/confirmation.coffee"

view = null
originalAppointment = null

App.flow = "update"

module.exports = Marionette.Controller.extend

  index: (id) ->
    require "../entities/appointment.coffee", () ->
      promise = msgBus.reqres.request "entities:appointment", id
      promise.done (appointment) ->
        originalAppointment = appointment
        date = appointment.get "startDate"

        startDate = moment(date).format "YYYY-MM-DD"
        uiDate = moment(date).format "MMM D @ H A"

        msgBus.reqres.request "schedule:header",
          pageTitle: "Reschedule Training"
          subTitle: "edit the time for <strong>" + uiDate + "</strong> and notify your trainer"

        msgBus.reqres.request "schedule:calendar:navigation",
          startDate: startDate


        App.filterCriteria.set
          startDate: startDate
          trainerId: appointment.get "trainerId"
          trainerName: appointment.get "trainerFirstName" + " " + appointment.get "trainerLastName"
          sessionTypeId: appointment.get "sessionTypeId"
          duration: appointment.get "duration"

        #if user clicked on "Edit Session" from Update reivew page.
        #trigger change on model. even model is still the same.
        App.filterCriteria.trigger "change"

        App.analytics.set
          action: "edit-start"

      promise.fail (model, jqXHR, textStatus) ->
      msgBus.reqres.request "schedule:error",
        error: [model, jqXHR, textStatus]


  review: (appointment) ->
    msgBus.reqres.request "schedule:header",
        pageTitle: "Review your session"
        subTitle: null


    view = new ReviewView
      model: appointment
      original: originalAppointment

    App.layout.navigation.close()
    App.layout.content.show view

    App.analytics.set
      action: "edit-review"


  confirmation: (appointment) ->
    #get id from original appointment and asign to new appointment
    appointment.set
      id: originalAppointment.id

    #pick data.
    data = _.pick appointment.toJSON(), "id", "sessionTypeId", "trainerId", "startDate", "endDate", "message"

    require "../entities/update.coffee", () ->
      promise = msgBus.reqres.request "entities:update:appointment", data
      promise.done (response) ->

      #update model with new id and pass APIEndpoint
      appointment.set
        id: response.id
        APIEndpoint: App.APIEndpoint


      msgBus.reqres.request "schedule:header",
        pageTitle: "Enjoy your workout."
        subTitle: null


      view = new ConfirmationView
        model: appointment
        original: originalAppointment


      App.layout.navigation.close()
      App.layout.content.show view

      App.analytics.set
        action: "edit-complete"


    promise.fail (response) ->
      msgBus.reqres.request "schedule:error", response.responseJSON
