###*
  * Views Header Module
###
_ = require "underscore"
Marionette = require "backbone.marionette"

module.exports = Marionette.ItemView.extend
  initialize: ->
    console.log "view header"
  template: _.template "<h1>Hello there</h1>"