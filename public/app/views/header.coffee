define (require, exports, module) ->
  Marionette = require 'marionette'
  template = require 'text!templates/header.tpl'

  module.exports = Marionette.ItemView.extend(
    template: _.template template
  )