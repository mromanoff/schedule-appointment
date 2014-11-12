###*
  * Entity appState Module
###

Backbone = require "backbone"


class appState extends _Backbone.Model
  defaults:
    flow: null
    loginStatus: null

appState = new appState

API =
  getappState: ->
    appState

msgBus.reqres.setHandler "get:current:appstate", ->
  API.getappState()

msgBus.reqres.setHandler "get:current:flow", ->
  appState.get "flow"

module.exports = appState