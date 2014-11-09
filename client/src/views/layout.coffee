###*
  * Layout Module
###

Marionette = require "backbone.marionette"
_ = require "underscore"

module.exports = Marionette.Layout.extend
  template: require "../../templates/layout.hbs"

  regions:
    header: ".header"
    filter: ".trainer-filter"
    navigation: ".navigation"
    content: ".content"
  