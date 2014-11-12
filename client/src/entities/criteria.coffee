###*
* Criteria Module
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
    console.log "criteria model"
    @on "change", @updateCalendar

  updateCalendar: () ->
    console.log "criteria model change"

    msgBus.reqres.request "calendar:show",
      startDate: @get "startDate"
      trainerId: @get "trainerId"
      sessionTypeId: @get "sessionTypeId"

module.exports = Model


