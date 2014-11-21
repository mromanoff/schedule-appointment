###*
  * app Module
###
$ = require "jquery"
_ = require "underscore"
Backbone = require "backbone"
Backbone.$  = $
Marionette = require "backbone.marionette"

Application = require "./config/application.coffee"
#//= require backbone/app
#//= require_tree ./backbone/controllers
#//= require_tree ./backbone/views
#//= require_tree ./backbone/entities
#//= require_tree ./backbone/components
#//= require_tree ./backbone/apps


app = new Marionette.Application

app.VERSION = "0.0.0"

#app = new Marionette.Application

app.rootRoute = "create"

app.addRegions
  headerRegion: "#header-region"
  mainRegion: "#main-region"
  footerRegion: "#footer-region"

app.on "before:start", (options = {}) ->
  require "./apps/schedule/app.coffee"

app.addInitializer (options) ->
  _.extend app, options

app.on "start", () ->
  console.log "start app"
  if Backbone.history
    Backbone.history.start()
    @navigate(@rootRoute, trigger:true ) if @getCurrentRoute() is ""


window.app = app

module.exports = app
