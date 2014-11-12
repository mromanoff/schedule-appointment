###*
 * Entities Appointments
 * @module entities/appointments
###

$ = require "jquery"
Backbone = require "backbone"
app = require "../app.coffee"
msgBus = require '../msgbus.coffee'
Loading = require '../views/spinner.coffee'

loadingView = new Loading()

class DayPart extends Backbone.Model
  defaults:
    morning: null
    afternoon: null
    evening: null

class Appointments extends Backbone.Collection
  model: DayPart

API =
  ###*
   * @name getappointments
   * @function
   * @returns {object} promise object
  ###
  getAppointments: () ->
    appointments = new Appointments()
    deferred = $.Deferred()

    app.layout.content.show loadingView

    appointments.url = () ->
      query = '?startDate=' + app.filterCriteria.get('startDate') + '&sessionTypeId=' + app.filterCriteria.get('sessionTypeId') + '&trainerId=' + app.filterCriteria.get('trainerId')
      app.APIEndpoint + '/personal-training-schedule/appointments' + query

    #setTimeout () ->
    appointments.fetch
      success: deferred.resolve
      error: deferred.reject
    #, 2000

    deferred.promise()

msgBus.reqres.setHandler 'entities:appointments', () ->
  API.getAppointments()


