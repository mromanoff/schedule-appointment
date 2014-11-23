
console.log "footer"

Marionette = require "backbone.marionette"
Backbone = require "backbone"

#
#ShowView = require "./show/show-view.coffee"


#module.exports = Marionette.Module.extend

API:
  showFooter: ->
    ShowController  = require "./show/show-controller.coffee"
    controller =  new ShowController
    controller.showFooter()
