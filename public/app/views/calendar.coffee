define (require, exports, module) ->

  Marionette = require 'marionette'
  App = require 'app'
  msgBus = require 'msgbus'
  moment = require 'moment'
  calendarTemplate = require 'text!templates/calendar/index.tpl'
  itemTemplate = require 'text!templates/calendar/item.tpl'
  emptyItemTemplate = require 'text!templates/calendar/empty_item.tpl'
  headerItemTemplate = require 'text!templates/calendar/header_item.tpl'

  Item = Marionette.ItemView.extend
    tagName: 'li'
    template: _.template itemTemplate
    events:
      'click .available': 'selectAppointment'

    initialize: () ->
      #@addClass('item-' + @model.get 'indexOfWeek'
      @addAttribute 'data-item', this.model.get 'indexOfWeek'
      @addAttribute 'data-date', this.model.get 'startDate'

    onBeforeRender: () ->
      startTime = null
      endTime = null
      meridiemIndicator = null
      scheduled = if @model.has 'id'  then ' scheduled' else false

      if @model.get 'isAvailable'
        startTime = moment(@model.get 'startDate').format 'hh:mm'
        endTime = moment(@model.get 'endDate').format 'hh:mm'
        meridiemIndicator = moment(@model.get 'endDate').format 'A'
        this.model.set
          cid: @model.cid #client ID.
          className: if scheduled then 'scheduled' else 'available'
          appointment: startTime + ' - ' + endTime + ' ' + meridiemIndicator
          scheduled: scheduled


    addAttribute: (attrName, attrValue) ->
      @$el.attr attrName, attrValue

    selectAppointment: (e) ->
      e.preventDefault()
      msgBus.reqres.request 'schedule:' + App.flow + ':review', @options.model


  EmptyItem = Marionette.ItemView.extend
    tagName: 'li'
    className: 'empty'
    template: _.template emptyItemTemplate

    initialize: () ->
      @addClass 'item-' + @model.get 'indexOfWeek'

    addClass: (className) ->
      @$el.addClass className


  DayPartView = Marionette.CollectionView.extend
    tagName: 'ul'
    itemViewOptions: (model, index) ->
      itemIndex: index


    getItemView: (item) ->
      if item.get 'isAvailable' then Item else EmptyItem

  CalendarHeaderItem = Marionette.ItemView.extend
    tagName: 'li'

    initialize: () ->
      if @model.get 'selected'
        @$el.addClass 'selected'

    template: _.template headerItemTemplate

  CalendarHeaderView = Marionette.CollectionView.extend
    tagName: 'ul'
    className: 'day-dates'
    itemView: CalendarHeaderItem

  AppointmentsLayout = Marionette.Layout.extend
      template: _.template calendarTemplate
      regions:
        header: '.appointments-header'
        morning: '.morning'
        afternoon: '.afternoon'
        evening: '.evening'

      events:
        'click .toggle-day': 'toggleDayPart'

      toggleDayPart: (e) ->
        e.preventDefault()
        $(e.currentTarget).next().toggle()

  module.exports = (options) ->
    appointmentsLayout = new AppointmentsLayout()

    App.layout.content.show appointmentsLayout

    appointmentsLayout.header.show new CalendarHeaderView
      collection: options.dates

    appointmentsLayout.morning.show new DayPartView
      collection: new Backbone.Collection options.appointments.models[0].get 'morning'

    appointmentsLayout.afternoon.show new DayPartView
      collection: new Backbone.Collection options.appointments.models[0].get 'afternoon'

    appointmentsLayout.evening.show new DayPartView
      collection: new Backbone.Collection options.appointments.models[0].get 'evening'
  return