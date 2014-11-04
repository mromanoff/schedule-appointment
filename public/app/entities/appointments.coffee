###*
 * @module entities/appointments
###

define (require) ->

  App = require 'app'
  msgBus = require 'msgbus'
  Loading = require 'views/spinner'

  loadingView = new Loading()
  DayPart = Backbone.Model.extend
    defaults:
      morning: null
      afternoon: null
      evening: null

  Appointments = Backbone.Collection.extend
    model: DayPart

  API =
    ###*
     * @name getAppointments
     * @function
     * @returns {object} promise object
    ###
    getAppointments: () ->
      appointments = new Appointments()
      deferred = $.Deferred()

      App.layout.content.show loadingView

      appointments.url = () ->
        query = '?startDate=' + App.filterCriteria.get('startDate') + '&sessionTypeId=' + App.filterCriteria.get('sessionTypeId') + '&trainerId=' + App.filterCriteria.get('trainerId')
        App.APIEndpoint + 'appointments' + query

      #setTimeout () ->
      appointments.fetch
        success: deferred.resolve
        error: deferred.reject
      #, 2000

      deferred.promise()

  msgBus.reqres.setHandler('entities:appointments', () ->
    API.getAppointments()
  )
