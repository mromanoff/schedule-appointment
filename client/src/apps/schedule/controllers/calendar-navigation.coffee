###*
  * Controller Calendar Navigation Module
###

Backbone = require "backbone"
Marionette = require "backbone.marionette"
moment = require "moment"
app = require "../app.coffee"
View = require "../views/calendar-navigation.coffee"

class Model extends Backbone.Model

collection = new Backbone.Collection()

createCollection = (startDate) ->
  date = moment startDate
  model

  for i in [0..6] by 1
    model = new Model
      dataDate: date.format "YYYY-MM-DD"
      date: date.format "ddd"
      dateShort: date.format "dd"
      month: date.format "MMM"
      day: date.format "DD"
      current: if i == 0 then "mobile-current current" else ""

    collection.add model
    date.add "days", 1

  collection


class Controller extends Marionette.Controller
  index: (options) ->
    #reset collection
    collection.reset()
    collection = createCollection options.startDate

    app.layout.navigation.show new View
      collection: collection

module.exports = Controller