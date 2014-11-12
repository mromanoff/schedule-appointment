###*
  * View Calendar Navigation Module
###

Marionette = require "backbone.marionette"
moment = require "moment"
app = require "../app.coffee"
msgBus = require "../msgbus.coffee"
Utils = require "../components/utils.coffee"
utils =  new Utils

class ChildView extends Marionette.ItemView
    tagName: "li"
    template: require "../../templates/calendar/navigation_item.hbs"
    events:
      "click": "updateCalendar"

    onRender: () ->
      date = @model.get "dataDate"

      if !utils.isValidDate date
        @$el.addClass "disabled"

    updateCalendar: (e) ->
      e.preventDefault()
      date = @model.get "dataDate"

      #trigger event if isValidDate = true
      if utils.isValidDate date
        app.filterCriteria.set
          startDate: date

        msgBus.reqres.request "calendar:navigation",
          startDate: date

class View extends Marionette.CompositeView
    childView: ChildView
    className: "classes-calendar"
    template: require "../../templates/calendar/navigation.hbs"
    childViewContainer: "ul"

    initialize: () ->
      @first = moment @collection.at(0).get "dataDate"
      @last = moment @collection.at(6).get "dataDate"

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


      if utils.isValidDate @nextWeek
        @ui.rightArrow.show()
      else
        @ui.rightArrow.hide()

    updateCalendarPrevWeek: (e) ->
      e.preventDefault()
      date = @prevWeek

      app.filterCriteria.set
        startDate: date

      msgBus.reqres.request "calendar:navigation",
        startDate: date

    updateCalendarNextWeek: (e) ->
      e.preventDefault()
      date = @nextWeek

      app.filterCriteria.set
        startDate: date

      msgBus.reqres.request "calendar:navigation",
        startDate: date


module.exports = View