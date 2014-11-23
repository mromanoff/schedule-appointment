###*
  * Main Module
###

# start the marionette inspector
#if window.__agent
  #window.__agent.start Backbone, Marionette

App = require "./app.coffee"

options =
  scheduleCriteria: window.scheduleCriteria or {}
  APIEndpoint: window.APIEndpoint or null
  MainDomain: window.MainDomain or null

App.start(options)
