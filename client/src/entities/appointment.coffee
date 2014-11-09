###*
* Entities Appointment Module
###

App = require "../app.coffee"
msgBus = require "../msgbus.coffee"
Loading = require "../views/spinner.coffee"

loadingView = new Loading()
Appointment = Backbone.Model.extend()

API =
  ###*
     * @name getAppointment
     * @function
     * @returns {object} promise object
  ###
  getAppointment: (id) ->
    appointment = new Appointment
      id: id
    deferred = $.Deferred()

    App.layout.content.show loadingView

    appointment.urlRoot = () ->
      App.APIEndpoint + "/personal-training-schedule/appointments"

    appointment.fetch
      success: deferred.resolve
      error: deferred.reject

    deferred.promise()


msgBus.reqres.setHandler "entities:appointment", (id) ->
  API.getAppointment id
