###*
  * View Detail Module
###

moment = require "moment"
Marionette = require "backbone.marionette"
app = require "../../app.coffee"
msgBus = require "../../msgbus.coffee"


class View extends Marionette.ItemView
  template: require "../../../templates/detail/index.hbs"

  events:
    "click .cancel-all": "cancelAll"
    "click .cancel": "cancel"
    "click .reschedule": "reschedule"

  initialize: () ->
    msgBus.commands.execute "scroll:top"

  onBeforeRender: ->
    weekDay = moment(@model.get "startDate").format "dddd"
    shortMonth = moment(@model.get "startDate").format "MMM"
    date = moment(@model.get "startDate").format "DD"
    startTime = moment(@model.get "startDate").format "hh:mm"
    endTime = moment(@model.get "endDate").format "hh:mm"
    meridiemIndicator = moment(@model.get "endDate").format "A"

    @model.set
      shortMonth: shortMonth
      appointmentDate: weekDay + ", " + shortMonth + " " + date
      appointmentTime: startTime + " - " + endTime + " " + meridiemIndicator


    cancelAll: (e) ->
      e.preventDefault()
      @model.set
        cancelAll: true
      #update URL address
      app.navigate "cancel/#{@model.id}"
      msgBus.reqres.request "schedule:cancel:review", @model


    cancel: (e) ->
      e.preventDefault()
      @model.set
        cancelAll: false
      #update URL address
      app.navigate "cancel/#{@model.id}"
      msgBus.reqres.request "schedule:cancel:review", @model

    reschedule: (e) ->
      e.preventDefault()
      app.navigate "update/#{@model.id}"
      msgBus.reqres.request "schedule:update", @model.id

module.exports = View