###*
  * Controller Create Module
###
_ = require "underscore"
Marionette = require "backbone.marionette"
app =  require "../../../app.coffee"

class Controller extends Marionette.Controller
  createAppointment: ->
    @layout = @getLayoutView()

    @layout.on "show", =>
      console.log "show layout"

    console.log "app", app

    #app.mainReqion.show @layout

  getLayoutView: ->
    Layout = require "./view.coffee"
    layout = new Layout

module.exports = Controller