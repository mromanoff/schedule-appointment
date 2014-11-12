###*
  * Controller Calendar Module
###

Backbone = require "backbone"
Marionette = require "backbone.marionette"
moment = require "moment"
app = require "../app.coffee"
msgBus = require "../msgbus.coffee"
View = require "../views/calendar.coffee"

Appointments = require "../entities/appointments.coffee"


class Model extends Backbone.Model

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
      date: date.format "ddd"
      day: date.format "DD"
      month: date.format "MMM"
      selected: if i == 0 then "selected" else null

    daysHeader.add model
    date.add "days", 1

  daysHeader

class Controller extends Marionette.Controller
    index: () ->
      date = app.filterCriteria.get "startDate"

      #require "../entities/appointments.coffee", () ->
      promise = msgBus.reqres.request "entities:appointments", date
      promise.done (appointments) ->
        #reset collection
        daysHeader.reset()
        daysHeader = getDates date

        module.exports = new View
          appointments: appointments
          dates: daysHeader
        return

      promise.fail (model, jqXHR, textStatus) ->
        msgBus.reqres.request "error",
          error: [model, jqXHR, textStatus]

module.exports = Controller