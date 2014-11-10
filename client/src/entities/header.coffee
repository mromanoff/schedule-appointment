###*
  * Entities Header Module
###

Backbone = require "backbone"

module.exports = Backbone.Model.extend
  defaults:
    pageTitle: null
    subTitle: null