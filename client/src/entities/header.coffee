define (require, exports, module) ->

  module.exports = Backbone.Model.extend(
    defaults:
      pageTitle: null
      subTitle: null
  )