###*
  * app Module
###
$ = require "jquery"
_ = require "underscore"
Backbone = require "backbone"
Backbone.$  = $
Marionette = require "backbone.marionette"

app = new Marionette.Application

app.addRegions
  mainRegion: "#app-main"

app.on "before:start", (options={}) ->
  require "./apps/schedule/app.coffee"

app.addInitializer (options) ->
  _.extend app, options

app.on "start", () ->
  console.log "start"
  if Backbone.history
    Backbone.history.start()

  view = new Marionette.ItemView.extend()

  app.mainRegion.show view



module.exports = app
