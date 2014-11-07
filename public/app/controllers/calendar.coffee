define (require, exports, module) ->

    Marionette = require 'marionette'
    App = require 'app'
    msgBus = require 'msgbus'
    moment = require 'moment'
    View = require 'views/calendar'

    Model = Backbone.Model.extend()
    daysHeader = new Backbone.Collection()

    ###*
    * Create 7 days
    * @param {string} startDate - 2014-05-31 format
    * @returns {Backbone.Collection}
    ###
    getDates = (startDate) ->
      i = 0
      date = moment(startDate)
      model

      for i in [0..6] by 1
        model = new Model
          date: date.format 'ddd'
          day: date.format 'DD'
          month: date.format 'MMM'
          selected: if i == 0 then 'selected' else null

        daysHeader.add model
        date.add 'days', 1

      daysHeader

    module.exports = Marionette.Controller.extend
        index: () ->
          date = App.filterCriteria.get 'startDate'

          require ['entities/appointments'], () ->
            promise = msgBus.reqres.request 'entities:appointments', date
            promise.done (appointments) ->
              #reset collection
              daysHeader.reset()
              daysHeader = getDates date

              module.exports = new View
                appointments: appointments
                dates: daysHeader
              return

            promise.fail (model, jqXHR, textStatus) ->
              msgBus.reqres.request 'schedule:error',
                error: [model, jqXHR, textStatus]

            return
          return
