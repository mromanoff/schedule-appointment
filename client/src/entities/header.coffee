###*
  * Entities Header Module
###

Backbone = require "backbone"

class Model extends Backbone.Model
  defaults:
    pageTitle: null
    subTitle: null

module.exports = Model
