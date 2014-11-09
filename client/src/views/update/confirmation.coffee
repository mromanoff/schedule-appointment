###*
  * View Update Confirmation Module
###


Marionette = require "backbone.marionette"
App = require "../../app.coffee"
msgBus = require "../../msgbus.coffee"

module.exports = Marionette.ItemView.extend
  template: require "../../../templates/update/confirmation.hbs"

  initialize: () ->
    msgBus.commands.execute "scroll:top"


  events:
    "click .cancel": "cancelAppointment"


  cancelAppointment: (e) ->
    e.preventDefault()
    App.navigate "cancel/" + @options.original.id, trigger: false
    msgBus.reqres.request "schedule:cancel", @options.original.id
