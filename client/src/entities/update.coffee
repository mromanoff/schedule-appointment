define (require) ->

  app = require "../app.coffee"
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
      app.APIEndpoint + 'update'

    API =
      ###*
      * @name updateappointment
      * @function
      * @returns {object} promise object
      ###
      updateappointment: (data) ->
        model = new Model()
        deferred = $.Deferred()

        app.layout.content.show loadingView

        #setTimeout () ->
        model.save data,
            success: deferred.resolve
            error: deferred.reject

        #, 2000
          deferred.promise()


    msgBus.reqres.setHandler 'entities:update:appointment', (data) ->
      API.updateappointment data



