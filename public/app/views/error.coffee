define (require, exports, module) ->

  Marionette = require 'marionette'
  msgBus = require 'msgbus'
  template = require 'text!templates/error.tpl'

  module.exports = Marionette.ItemView.extend(
    className: 'error'
    template: _.template template

    initialize: () ->
      msgBus.commands.execute 'scroll:top'
  )

  return