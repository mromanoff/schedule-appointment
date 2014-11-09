###*
  * View Cancel Index Module
###

Marionette = require "backbone.marionette"
moment = require "moment"
App = require "../../app.coffee"
msgBus = require "../../msgbus.coffee"

module.exports = Marionette.ItemView.extend
    template: require "../../../templates/cancel/index.hbs"

    events:
      "click .cancel-all": "cancelAll"
      "click .cancel": "cancel"
      "click .update": "update"

    initialize: () ->
      console.log "cansel"

      msgBus.commands.execute "scroll:top"

    onBeforeRender: () ->
      weekDay = moment(@model.get("startDate")).format "dddd"
      shortMonth = moment(@model.get("startDate")).format "MMM"
      date = moment(@model.get("startDate")).format "DD"
      startTime = moment(@model.get("startDate")).format "hh:mm"
      endTime = moment(@model.get("endDate")).format "hh:mm"
      meridiemIndicator = moment(@model.get("endDate")).format "A"

      @model.set
        shortMonth: shortMonth,
        appointmentDate: weekDay + ", " + shortMonth + " " + date,
        appointmentTime: startTime + " - " + endTime + " " + meridiemIndicator


    cancelAll: (e) ->
      e.preventDefault()
      @model.set
        cancelAll: true
      msgBus.reqres.request "schedule:cancel:review", @model


    cancel: (e) ->
      e.preventDefault()
      @model.set
        cancelAll: false

      msgBus.reqres.request "schedule:cancel:review", @model


    update: (e) ->
      e.preventDefault()
      App.navigate "update/" + @model.id, trigger: false
      msgBus.reqres.request "schedule:update", @model.id
