define (require, exports, module) ->

  Backbone = require 'backbone'

  module.exports = Backbone.Model.extend(
    defaults:
      message: 'Please try again later.'
      code: null
      exception: null
      data: null
  )
  return