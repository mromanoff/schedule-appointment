###*
  * Main Module
###

# start the marionette inspector
if window.__agent
  window.__agent.start Backbone, Marionette

app = require "./app.coffee"

options =
  scheduleCriteria: window.scheduleCriteria or {}
  APIEndpoint: window.APIEndpoint or null
  MainDomain: window.MainDomain or null

app.start(options)
