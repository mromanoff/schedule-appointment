define (require) ->

  app = require "../app.coffee"
  msgBus = require '../msgbus.coffee'
  Loading = require '../views/spinner.coffee'

  loadingView = new Loading()
  Model = Backbone.Model.extend
    defaults:
      id: null #"BC494EF7-60E8-4AF0-8A19-5786D2ABAE62",
      cancelAll: null #true|false
      message: null

    url: () ->
      app.APIEndpoint + 'cancel'

  API =
    ###*
     * @name cancelappointment
     * @function
     * @returns {object} promise object
    ###
    cancelappointment: (data) ->
      model = new Model()
      deferred = $.Deferred()

      app.layout.content.show loadingView

      #setTimeout () ->
      model.save data,
          success: deferred.resolve
          error: deferred.reject
      #, 2000

      deferred.promise()



  msgBus.reqres.setHandler 'entities:cancel:appointment', (data) ->
    API.cancelappointment data


