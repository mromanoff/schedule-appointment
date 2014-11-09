define (require) ->

  App = require "../app.coffee"
  msgBus = require '../msgbus.coffee'
  Loading = require '../views/spinner.coffee'

  loadingView = new Loading()
  Model = Backbone.Model.extend
    defaults:
      id: null #"BC494EF7-60E8-4AF0-8A19-5786D2ABAE62",
      cancelAll: null #true|false
      message: null

    url: () ->
      App.APIEndpoint + 'cancel'

  API =
    ###*
     * @name cancelAppointment
     * @function
     * @returns {object} promise object
    ###
    cancelAppointment: (data) ->
      model = new Model()
      deferred = $.Deferred()

      App.layout.content.show loadingView

      #setTimeout () ->
      model.save data,
          success: deferred.resolve
          error: deferred.reject
      #, 2000

      deferred.promise()



  msgBus.reqres.setHandler 'entities:cancel:appointment', (data) ->
    API.cancelAppointment data


