###*
* Entities appointment Module
###

app = require "../app.coffee"
msgBus = require "../msgbus.coffee"
Loading = require "../views/spinner.coffee"

loadingView = new Loading()
appointment = Backbone.Model.extend()

API =
  ###*
     * @name getappointment
     * @function
     * @returns {object} promise object
  ###
  getappointment: (id) ->
    appointment = new appointment
      id: id
    deferred = $.Deferred()

    app.layout.content.show loadingView

    appointment.urlRoot = () ->
      app.APIEndpoint + "/personal-training-schedule/appointments"

    appointment.fetch
      success: deferred.resolve
      error: deferred.reject

    deferred.promise()


msgBus.reqres.setHandler "entities:appointment", (id) ->
  API.getappointment id
