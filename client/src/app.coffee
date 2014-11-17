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

app.on "start", () ->
  console.log "start"

app.addInitializer (options) ->
  _.extend app, options,


window.app = app

module.exports = app
