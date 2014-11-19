###*
  * Schedule Create Layout View
###

Marionette = require "backbone.marionette"

class Layout extends Marionette.LayoutView
  template: require "./templates/layout.hbs"

  regions:
    header: ".header"
    filter: ".trainer-filter"
    navigation: ".navigation"
    content: ".content"

module.exports = Layout