###*
  * Router Module
###

Marionette = require "backbone.marionette"
Controller = require "./controllers/_base-controller.coffee"

class Router extends Marionette.AppRouter
  controller: new Controller()

  appRoutes:
    "": "create"
    "create/:date": "create"
    "cancel/:id": "cancel"
    "update/:id": "update"
    "detail/:id": "detail"
    "error": "error"
    "*allOthers": "defaultPage"

module.exports = Router

