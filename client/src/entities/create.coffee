define (require) ->

  App = require "../app.coffee"
  msgBus = require '../msgbus.coffee'
  Loading = require '../views/spinner.coffee'

  loadingView = new Loading()
  Model = Backbone.Model.extend
    defaults:
      trainerId: null
      sessionTypeId: null
      startDate: null
      endDate: null
      message: null

    url: () ->
      App.APIEndpoint + 'create'

  API =
    ###*
    * @name createAppointment
    * @function
    * @returns {object} promise object
    ###
    createAppointment: (data) ->
      model = new Model()
      deferred = $.Deferred()

      App.layout.content.show(loadingView)

      #setTimeout () ->
      model.save data,
        success: deferred.resolve
        error: deferred.reject

      #}, 2000);
      deferred.promise()


  msgBus.reqres.setHandler 'entities:create:appointment', (data) ->
    API.createAppointment data



