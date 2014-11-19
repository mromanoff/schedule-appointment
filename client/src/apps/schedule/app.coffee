###*
  * Schedule App
###
$ = require "jquery"
_ = require "underscore"
Backbone = require "backbone"
Backbone.$  = $
Marionette = require "backbone.marionette"
app = require "../../app.coffee"


ScheduleApp = {}

class ScheduleApp.Router extends Marionette.AppRouter
  appRoutes:
    "": "createAppointment"
    "create/:date": "createAppointment"
    "cancel/:id": "cancelAppointment"
    "update/:id": "updateAppointment"
    #"detail/:id": "detail"
    #"error": "error"
    #"*allOthers": "defaultPage"

API =
  createAppointment: (date) ->
    console.log "create", date
    Controller =  require "./create/controller.coffee"
    new Controller().createAppointment()

  cancelAppointment: (id) ->
    #ScheduleApp.Cancel.Controller.cancelAppointment id
    console.log "cancel"

  updateAppointment: (id) ->
    #ScheduleApp.Update.Controller.updateAppointment id
    console.log "update"

app.addInitializer ->
  new ScheduleApp.Router
    controller: API