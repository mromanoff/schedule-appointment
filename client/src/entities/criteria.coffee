###*
* Entities Criteria Module
###

Backbone = require "backbone"
msgBus = require "../msgbus.coffee"

class Model extends Backbone.Model
  defaults:
    trainerId: null
    trainerName: null
    sessionTypeId: null
    duration: null
    startDate: null

  initialize: () ->
    @on "change", @updateCalendar

  updateCalendar: () ->

    msgBus.reqres.request "calendar:show",
      startDate: @get "startDate"
      trainerId: @get "trainerId"
      sessionTypeId: @get "sessionTypeId"

module.exports = Model


