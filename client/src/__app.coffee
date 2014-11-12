###*
  * app Module
###
_ = require "underscore"
Backbone = require "backbone"
Marionette = require "backbone.marionette"
Layout = require "./views/layout.coffee"
Utils = require "./components/utils.coffee"
FilterCriteriaModel = require "./entities/criteria.coffee"
Analytics = require "./entities/analytics.coffee"

app = new Marionette.application()
app.layout = new Layout()
app.utils = new Utils()
app.filterCriteria = new FilterCriteriaModel()
app.analytics = new Analytics()
app.el = "#app-main"

###* update app flow
   *  @param {string} create, update, cancel, detail
###
app.flow = null;

###*
 *
 * @returns {Backbone.History.fragment|*}
###
app.getCurrentRoute = () ->
  Backbone.history.fragment


###*
 * @param route
 * @param {object} options
###
app.navigate = (route, options = {}) ->
  Backbone.history.navigate(route, options)


app.on "initialize:after", () ->
  #TODO: temp fix. if member don"t have a trainer. don"t start app. redirect
  if _.isEmpty app.scheduleCriteria.trainers
    window.location.href = "/personal-training/schedule-equifit"
    return false


  #all the core meat goes here
  #create global app {} mimic legacy app.
  #window.app =
    #Components: {}


  #require ["components"]
  #require ["helpers"]

  app.filterCriteria.set
    sessionTypeId: app.scheduleCriteria.durations[0].sessionTypeId # first duration in the list is default session. 60 Min
    duration: app.scheduleCriteria.durations[0].duration
    trainerId: app.scheduleCriteria.trainers[0].trainerId  # first trainer in the list is default trainer
    trainerName: app.scheduleCriteria.trainers[0].trainerFirstName + " " + app.scheduleCriteria.trainers[0].trainerLastName
    ,
    silent: true


  app.analytics.set
    trainerId: app.scheduleCriteria.trainers[0].trainerId  # first trainer in the list is default trainer

  app.addRegions
    mainRegion: app.el

  app.mainRegion.show app.layout


window.app = app

module.exports = app
