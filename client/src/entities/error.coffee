###*
* Entities Error Module
###

Backbone = require "backbone"

class Model extends Backbone.Model
  defaults:
    message: "Please try again later."
    code: null
    exception: null
    data: null

module.exports = Model
