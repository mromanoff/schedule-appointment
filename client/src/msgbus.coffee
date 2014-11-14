###*
 * MsgBus Module
 ###

Wreqr = require "backbone.wreqr"
Controller = require "./controllers/_base-controller.coffee"

controller = new Controller()

msgBus =
  reqres: new Wreqr.RequestResponse()
  commands: new Wreqr.Commands()
  events: new Wreqr.EventAggregator()

msgBus.commands.setHandler "scroll:top", () ->
  controller.scroll()

msgBus.reqres.setHandler "header:region", (options) ->
  controller.header options

msgBus.reqres.setHandler "filter:region",  () ->
  controller.trainerFilter()

msgBus.reqres.setHandler "calendar:navigation:region", (options) ->
  controller.navigation options

msgBus.reqres.setHandler "calendar:show", ()   ->
  controller.calendar()

msgBus.reqres.setHandler "create:review", (id) ->
  controller.createReview id

msgBus.reqres.setHandler "create:confirmation", (model) ->
  controller.createConfirmation(model)

msgBus.reqres.setHandler "cancel", (id) ->
  controller.cancel id


msgBus.reqres.setHandler "cancel:review", (appointment) ->
  controller.cancelReview appointment


msgBus.reqres.setHandler "cancel:confirmation", (appointment) ->
  controller.cancelConfirmation appointment

module.exports = msgBus;
