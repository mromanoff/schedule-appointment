###*
  * Router Module
###

Marionette = require "backbone.marionette"
AppController = require "./controllers/app_controller.coffee"

module.exports = Marionette.AppRouter.extend

  controller: new AppController()
  
  appRoutes:
    "": "create"
    "create/:date": "create"
    "cancel/:id": "cancel"
    "update/:id": "update"
    "detail/:id": "detail"
    "error": "error"
    "*allOthers": "defaultPage"
  