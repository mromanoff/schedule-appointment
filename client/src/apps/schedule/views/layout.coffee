###*
  * Layout Module
###

Marionette = require "backbone.marionette"

class Layout extends Marionette.LayoutView
  template: require "../../templates/layout.hbs"

  regions:
    header: ".header"
    filter: ".trainer-filter"
    navigation: ".navigation"
    content: ".content"

  onShow: ->
    console.log "onShow"


module.exports = Layout
  