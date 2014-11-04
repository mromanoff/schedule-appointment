define (require, exports, module) ->
  Marionette = require 'marionette'
  template = require 'text!templates/layout.tpl'

  module.exports = Marionette.Layout.extend(
    template: _.template template

    regions:
      header: '.header'
      filter: '.trainer-filter'
      navigation: '.navigation'
      content: '.content'
  )