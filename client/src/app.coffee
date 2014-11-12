###*
  * app Module
###

$ = require "jquery"
_ = require "underscore"
Backbone = require "backbone"
Backbone.$  = $
Marionette = require "backbone.marionette"
Layout = require "./views/layout.coffee"
Router = require "./router.coffee"
msgBus = require "./msgbus.coffee"
FilterCriteriaModel = require "./entities/criteria.coffee"

app = new Marionette.Application

app.addRegions
  mainRegion: "#app-main"

app.layout = new Layout
app.mainRegion.show app.layout
app.filterCriteria = new FilterCriteriaModel

###*
 * @param route
 * @param {object} options
###
app.navigate = (route, options = {}) ->
  Backbone.history.navigate(route, options)


app.on "initialize:before", (options={}) ->
  console.log "init:before", options


app.on "initialize:after", () ->
  app.filterCriteria.set
    sessionTypeId: app.scheduleCriteria.durations[0].sessionTypeId # first duration in the list is default session. 60 Min
    duration: app.scheduleCriteria.durations[0].duration
    trainerId: app.scheduleCriteria.trainers[0].trainerId  # first trainer in the list is default trainer
    trainerName: app.scheduleCriteria.trainers[0].trainerFirstName + " " + app.scheduleCriteria.trainers[0].trainerLastName
      ,
    silent: true


app.addInitializer (options) ->
  _.extend app, options,
      appstate: null

  new Router()
  Backbone.history.start
    pushState: true
    root: "/personal-training/schedule"


window.app = app

module.exports = app