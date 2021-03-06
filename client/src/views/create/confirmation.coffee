###*
  * View Create Confirmation Module
###

Marionette  = require "backbone.marionette"
app = require "../../app.coffee"
msgBus = require "../../msgbus.coffee"

module.exports = Marionette.ItemView.extend
  template : require "../../../templates/create/confirmation.hbs"

  initialize: () ->
    msgBus.commands.execute "scroll:top"

  events:
    "click .cancel": "cancelAppointment"

  cancelAppointment: (e) ->
    e.preventDefault()
    app.navigate "#cancel/#{@model.id}",
      trigger: false

    msgBus.reqres.request "cancel", @model.id