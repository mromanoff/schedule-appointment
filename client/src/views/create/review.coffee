###*
  * Create Review Module
###

Marionette = require "backbone.marionette"
moment = require "moment"
msgBus = require "../../msgbus.coffee"

module.exports = Marionette.ItemView.extend
  template: require "../../../templates/create/review.hbs"

  events:
    "click .schedule": "schedule"
    "click .add-message": "addMessage"
    "keyup textarea": "countLimit"

  initialize: () ->
    msgBus.commands.execute "scroll:top"

  ui:
    textarea: "textarea"

  onBeforeRender: () ->
    weekDay = moment(@model.get "startDate").format "dddd"
    shortMonth = moment(@model.get "startDate").format "MMM"
    date = moment(@model.get "startDate").format "DD"
    startTime = moment(@model.get "startDate").format "hh:mm"
    endTime = moment(@model.get "endDate").format "hh:mm"
    meridiemIndicator = moment(@model.get "endDate").format "A"

    @model.set
      shortMonth: shortMonth
      appointmentDate: weekDay + ", " + shortMonth + " " + date
      appointmentTime: startTime + " - " + endTime + " " + meridiemIndicator

  schedule: (e) ->
    e.preventDefault()
    if !_.isEmpty @ui.textarea.val()
      @model.set
        message: @ui.textarea.val()

    msgBus.reqres.request "schedule:create:confirmation", @model

  countLimit: (e) ->
    e.preventDefault()
    #limit 300 chars
    count = 300 - @ui.textarea.val().length
    @ui.textarea.next(".char-counter").text count

  addMessage: (e) ->
    e.preventDefault()
    @$(".add-message-container").toggleClass "hidden"
