###*
  * app Module
###


$ = require "jquery"
_ = require "underscore"
Backbone = require "backbone"
Backbone.$  = $
Marionette = require "backbone.marionette"

require "./config/application.coffee"
require "./apps/footer/footer-app.coffee"

#//= require backbone/app
#//= require_tree ./backbone/controllers
#//= require_tree ./backbone/views
#//= require_tree ./backbone/entities
#//= require_tree ./backbone/components
#//= require_tree ./backbone/apps

#require "./apps/footer/footer-app.coffee"


App = new Marionette.Application

App.VERSION = "0.0.0"

#App = new Marionette.Application

App.rootRoute = "create"

App.addRegions
  headerRegion: "#header-region"
  mainRegion: "#main-region"
  footerRegion: "#footer-region"

App.on "before:start", (options = {}) ->
  require "./apps/schedule/app.coffee"

App.addInitializer (options) ->
  _.extend App, options



CustomModule = Marionette.Module.extend
  #Custom module properties


App.module "FooterApp",
  #moduleClass: require "./apps/footer/footer-app.coffee"
  #container: app.layout.overlay



App.on "start", () ->
  console.log "start App"
  if Backbone.history
    Backbone.history.start()
    @navigate(@rootRoute, trigger:true ) if @getCurrentRoute() is ""


window.App = App

module.exports = App
