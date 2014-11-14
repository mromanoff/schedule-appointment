###*
  * Views Calendar Module
###

Backbone = require "backbone"
Marionette = require "backbone.marionette"
moment = require "moment"
app = require "../app.coffee"
msgBus = require "../msgbus.coffee"

class Item extends Marionette.ItemView
  tagName: "li"
  template: require "../../templates/calendar/item.hbs"
  events:
    "click .available": "selectAppointment"

  initialize: ->
    #@addClass("item-" + @model.get "indexOfWeek"
    @addAttribute "data-item", @model.get "indexOfWeek"
    @addAttribute "data-date", @model.get "startDate"

  onBeforeRender: ->
    startTime = null
    endTime = null
    meridiemIndicator = null
    scheduled = if @model.has "id"  then " scheduled" else false

    if @model.get "isAvailable"
      startTime = moment(@model.get "startDate").format "hh:mm"
      endTime = moment(@model.get "endDate").format "hh:mm"
      meridiemIndicator = moment(@model.get "endDate").format "A"
      @model.set
        cid: @model.cid #client ID.
        className: if scheduled then "scheduled" else "available"
        appointment: startTime + " - " + endTime + " " + meridiemIndicator
        scheduled: scheduled


  addAttribute: (attrName, attrValue) ->
    @$el.attr attrName, attrValue

  selectAppointment: (e) ->
    e.preventDefault()
    msgBus.reqres.request "#{app.flow}:review", @options.model

class EmptyItem extends Marionette.ItemView
  tagName: "li"
  className: "empty"
  template: require "../../templates/calendar/empty_item.hbs"

  initialize: ->
    @addClass "item-" + @model.get "indexOfWeek"

  addClass: (className) ->
    @$el.addClass className


class DayPartView extends Marionette.CollectionView
  tagName: "ul"
  childViewOptions: (model, index) ->
    itemIndex: index

  getChildView: (item) ->
    if item.get "isAvailable" then Item else EmptyItem

class CalendarHeaderItem  extends Marionette.ItemView
  tagName: "li"
  template: require "../../templates/calendar/header_item.hbs"
  initialize: ->
    if @model.get "selected"
        @$el.addClass "selected"


class CalendarHeaderView extends Marionette.CollectionView
  tagName: "ul"
  className: "day-dates"
  childView: CalendarHeaderItem


class AppointmentsLayout extends Marionette.LayoutView
    template: require "../../templates/calendar/index.hbs"
    regions:
      header: ".appointments-header"
      morning: ".morning"
      afternoon: ".afternoon"
      evening: ".evening"

    events:
      "click .toggle-day": "toggleDayPart"

    toggleDayPart: (e) ->
      e.preventDefault()
      $(e.currentTarget).next().toggle()

module.exports = (options) ->
  appointmentsLayout = new AppointmentsLayout()

  app.layout.content.show appointmentsLayout

  appointmentsLayout.header.show new CalendarHeaderView
    collection: options.dates

  appointmentsLayout.morning.show new DayPartView
    collection: new Backbone.Collection options.appointments.models[0].get "morning"

  appointmentsLayout.afternoon.show new DayPartView
    collection: new Backbone.Collection options.appointments.models[0].get "afternoon"

  appointmentsLayout.evening.show new DayPartView
    collection: new Backbone.Collection options.appointments.models[0].get "evening"
