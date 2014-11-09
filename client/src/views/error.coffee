###*
  * View Error Module
###

Marionette = require "backbone.marionette"
msgBus = require "../msgbus.coffee"

module.exports = Marionette.ItemView.extend
  className: "error"
  template: require "../../templates/error.hbs"

  initialize: () ->
    msgBus.commands.execute "scroll:top"
