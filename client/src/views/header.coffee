###*
  * Views Header Module
###

Marionette = require "backbone.marionette"

class View extends Marionette.ItemView
  template: require "../../templates/header.hbs"

module.exports = View