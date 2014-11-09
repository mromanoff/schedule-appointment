###*
  * View Cancel Confirmation Module
###

Marionette = require "backbone.marionette"
msgBus = require "../../msgbus.coffee"

module.exports = Marionette.ItemView.extend
  template: require "../../../templates/cancel/confirmation.hbs"

  initialize: () ->
    msgBus.commands.execute "scroll:top"
