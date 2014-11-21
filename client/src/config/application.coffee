###*
  * Application Config Module
###

_ = require "underscore"
Backbone = require "backbone"
Marionette = require "backbone.marionette"

module.exports = _.extend Backbone.Marionette.Application::,

  navigate: (route, options = {}) ->
    ## use this line if you want consistent urls like: schedule/#/create
    route = "#" + route if route.charAt(0) is "/"
    Backbone.history.navigate route, options

  getCurrentRoute: ->
    Backbone.history.fragment