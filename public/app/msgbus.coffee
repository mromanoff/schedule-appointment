define (require, exports, module) ->

  Wreqr = require 'backbone.wreqr'
  AppController = require 'controllers/app_controller'

  controller = new AppController()


  msgBus =
    reqres: new Wreqr.RequestResponse()
    commands: new Wreqr.Commands()
    events: new Wreqr.EventAggregator()



  msgBus.commands.setHandler 'scroll:top', () ->
    controller.scroll()


  msgBus.reqres.setHandler 'schedule:calendar:navigation', (options) ->
    controller.navigation options


  msgBus.reqres.setHandler 'schedule:header', (options) ->
    controller.header options

  msgBus.reqres.setHandler 'schedule:trainer:filter', () ->
    controller.trainerFilter()


  msgBus.reqres.setHandler 'schedule:calendar', () ->
    controller.calendar()


  msgBus.reqres.setHandler 'schedule:error', (options) ->
    controller.error options


  msgBus.reqres.setHandler 'schedule:create:review', (id) ->
    controller.createReview(id)

  msgBus.reqres.setHandler 'schedule:create:confirmation', (model) ->
    controller.createConfirmation(model)


  msgBus.reqres.setHandler 'schedule:cancel', (id) ->
    controller.cancel(id)


  msgBus.reqres.setHandler 'schedule:cancel:review', (appointment) ->
    controller.cancelReview(appointment)


  msgBus.reqres.setHandler 'schedule:cancel:confirmation', (appointment) ->
    controller.cancelConfirmation(appointment)


  msgBus.reqres.setHandler 'schedule:update', (id) ->
    controller.update(id)


  msgBus.reqres.setHandler 'schedule:update:review', (appointment) ->
    controller.updateReview(appointment)


  msgBus.reqres.setHandler 'schedule:update:confirmation', (appointment) ->
    controller.updateConfirmation(appointment)

  module.exports = msgBus;

  return
