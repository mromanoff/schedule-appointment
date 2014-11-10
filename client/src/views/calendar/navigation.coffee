###*
  * View Calendar Navigation Module
###

Marionette = require "backbone.marionette"
moment = require "moment"
App = require "../../app.coffee"
msgBus = require "../../msgbus.coffee"

Item = Marionette.ItemView.extend
    tagName: "li"
    template: require "../../../templates/calendar/navigation_item.hbs"
    events:
      "click": "updateCalendar"

    onRender: () ->
      date = @model.get "dataDate"

      if !App.utils.isValidDate date
        @$el.addClass "disabled"

    updateCalendar: (e) ->
      e.preventDefault()
      date = @model.get "dataDate"

      #trigger event if isValidDate = true
      if App.utils.isValidDate date
        App.filterCriteria.set
          startDate: date

        msgBus.reqres.request "schedule:calendar:navigation",
          startDate: date

module.exports = Marionette.CompositeView.extend
    itemView: Item
    className: "classes-calendar"
    template: require "../../../templates/calendar/navigation.hbs"
    itemViewContainer: "ul"

    initialize: () ->
      @first = moment @collection.at(0).attributes.dataDate
      @last = moment @collection.at(6).attributes.dataDate

      #moment() modifies data. so cache it.
      first = moment @first
      last = moment @last

      #create step - 7 or + 7  days
      @prevWeek = first.subtract("days", 7).format "YYYY-MM-DD"
      @nextWeek = last.add("days", 1).format "YYYY-MM-DD"

    events:
      "click .icon-left-arrow": "updateCalendarPrevWeek"
      "click .icon-right-arrow": "updateCalendarNextWeek"

    ui:
      leftArrow: ".icon-left-arrow"
      rightArrow: ".icon-right-arrow"
      currentWeek: ".current-week"


    onRender: () ->
      #print JUL 21 JUL 27. update current week title
      @ui.currentWeek.text(moment(this.first).format("MMM DD") + " - " + moment(this.last).format("MMM DD"))

      if moment().add("days", 1).format("W") < this.first.format("W")
        @ui.leftArrow.show()

      else
        @ui.leftArrow.hide()


      if App.utils.isValidDate @nextWeek
        @ui.rightArrow.show()

      else
        @ui.rightArrow.hide()



  updateCalendarPrevWeek: (e) ->
    e.preventDefault()
    date = @prevWeek

    App.filterCriteria.set
      startDate: date

    msgBus.reqres.request "schedule:calendar:navigation",
      startDate: date

    updateCalendarNextWeek: (e) ->
      e.preventDefault()
      date = @nextWeek

    App.filterCriteria.set
      startDate: date

    msgBus.reqres.request "schedule:calendar:navigation",
      startDate: date
