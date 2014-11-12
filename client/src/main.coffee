###*
  * Main Module
###

app = require "./app.coffee"

options =
  scheduleCriteria: window.scheduleCriteria or {}
  APIEndpoint: window.APIEndpoint or null
  MainDomain: window.MainDomain or null

app.start(options)
