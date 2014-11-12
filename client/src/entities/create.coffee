###*
 * Entities Create Appointment
 * @module entities/create
###

$ = require "jquery"
Backbone = require "backbone"
app = require "../app.coffee"
msgBus = require '../msgbus.coffee'
Loading = require '../views/spinner.coffee'

loadingView = new Loading()

class Model extends Backbone.Model
  defaults:
    trainerId: null
    sessionTypeId: null
    startDate: null
    endDate: null
    message: null

  url: () ->
    app.APIEndpoint + '/create'

API =
  ###*
  * @name createAppointment
  * @function
  * @returns {object} promise object
  ###
  createAppointment: (data) ->
    model = new Model
    deferred = $.Deferred()

    app.layout.content.show loadingView

    #setTimeout () ->
    model.save data,
      success: deferred.resolve
      error: deferred.reject

    #}, 2000);
    deferred.promise()

msgBus.reqres.setHandler 'entities:create:appointment', (data) ->
  API.createAppointment data



