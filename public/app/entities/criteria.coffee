define (require, exports, module) ->

  msgBus = require 'msgbus'
  Backbone = require 'backbone'

  module.exports = Backbone.Model.extend
    defaults:
      trainerId: null
      trainerName: null
      sessionTypeId: null
      duration: null
      startDate: null


    initialize: () ->
      @on 'change', @updateCalendar


    updateCalendar: () ->
      msgBus.reqres.request 'schedule:calendar',
        startDate: this.get('startDate')
        trainerId: this.get('trainerId')
        sessionTypeId: this.get('sessionTypeId')

  return





