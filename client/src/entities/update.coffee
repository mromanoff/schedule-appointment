define (require) ->

  App = require "../app.coffee"
  msgBus = require '../msgbus.coffee'
  Loading = require '../views/spinner.coffee'

  loadingView = new Loading()
  Model = Backbone.Model.extend
    defaults:
      id: null
      trainerId: null
      startDate: null
      endDate: null
      sessionTypeId: null
      message: null

    url: () ->
      App.APIEndpoint + 'update'

    API =
      ###*
      * @name updateAppointment
      * @function
      * @returns {object} promise object
      ###
      updateAppointment: (data) ->
        model = new Model()
        deferred = $.Deferred()

        App.layout.content.show loadingView

        #setTimeout () ->
        model.save data,
            success: deferred.resolve
            error: deferred.reject

        #, 2000
          deferred.promise()


    msgBus.reqres.setHandler 'entities:update:appointment', (data) ->
      API.updateAppointment data



