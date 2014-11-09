###*
  * View Update Review Module
###

Marionette = require "backbone.marionette"
moment = require "moment"
App = require "../../app.coffee"
msgBus = require "../../msgbus.coffee"

module.exports = Marionette.ItemView.extend
  template: require "../../../templates/update/review.hbs"

  events:
    "click .schedule": "schedule"
    "click .update": "update"
    "click .add-message": "addMessage"
    "keyup textarea": "countLimit"


  initialize: () ->
    msgBus.commands.execute "scroll:top"


  ui:
    textarea: "textarea"


  onBeforeRender: () ->
    #TODO: make it DRY
    weekDay = moment(@model.get("startDate")).format "dddd"
    shortMonth = moment(@model.get("startDate")).format "MMM"
    date = moment(@model.get("startDate")).format "DD"
    startTime = moment(@model.get("startDate")).format "hh:mm"
    endTime = moment(@model.get("endDate")).format "hh:mm"
    meridiemIndicator = moment(@model.get("endDate")).format "A"

    originalWeekDay = moment(@options.original.get("startDate")).format "dddd"
    originalShortMonth = moment(@options.original.get("startDate")).format "MMM"
    originalDate = moment(@options.original.get("startDate")).format "DD"
    originalStartTime = moment(@options.original.get("startDate")).format "hh:mm"
    originalEndTime = moment(@options.original.get("endDate")).format "hh:mm"
    originalMeridiemIndicator = moment(@options.original.get("endDate")).format "A"

    @model.set
      shortMonth: shortMonth
      appointmentDate: weekDay + ", " + shortMonth + " " + date
      appointmentTime: startTime + " - " + endTime + " " + meridiemIndicator

      originalShortMonth: originalShortMonth
      originalAppointmentDate: originalWeekDay + ", " + originalShortMonth + " " + originalDate
      originalAppointmentTime: originalStartTime + " - " + originalEndTime + " " + originalMeridiemIndicator



    schedule: (e) ->
      e.preventDefault()
      if !_.isEmpty @ui.textarea.val()
        @model.set
          message: @ui.textarea.val()

      msgBus.reqres.request "schedule:update:confirmation", @model


    update: (e) ->
      e.preventDefault()
      App.navigate "update/" + @options.original.id, trigger: false
      msgBus.reqres.request "schedule:update",  @options.original.id


    countLimit: (e) ->
      e.preventDefault()
      #limit 300 chars
      count = 300 - @ui.textarea.val().length
      @ui.textarea.next(".char-counter").text count


    addMessage: (e) ->
      e.preventDefault()
      @$(".add-message-container").toggleClass "hidden"
