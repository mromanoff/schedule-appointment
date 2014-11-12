###*
 * _Base Controller Module
 ###

$ = require "jquery"
Marionette = require "backbone.marionette"

class Controller extends Marionette.Controller
  ###*
  * render index page for schedule appointment flow
  * @param {string} [date] - date in 2014-05-31 format
  ###
  create: (date) ->
    Controller = require "./create.coffee"
    new Controller().index date

  ###*
   * render review page for schedule appointment flow
   * @param {object} appointment - Selected appointment model
  ###
  createReview: (appointment) ->
    Controller = require "./create.coffee"
    new Controller().review appointment

  ###*
   * render confirmation page for schedule appointment flow
   * @param {object} appointment - Selected appointment model
  ###
  createConfirmation: (appointment) ->
    Controller = require "./create.coffee"
    new Controller().confirmation appointment

  ###*
  * Create header component
  * @param {object} options - Options object
  ###
  header: (options) ->
    Controller = require "./header.coffee"
    new Controller().init options

  ###*
   * Create filter component, filter by Trainer and Duration
  ###
  trainerFilter: () ->
    Controller = require "./trainer.coffee"
    new Controller().init()

  ###*
  * Create calendar navigation component
  * @param {object} options - Options object
  ###
  navigation: (options) ->
    Controller = require "./calendar-navigation.coffee"
    new Controller(options).index options

  ###*
   * render calendar component
  ###
  calendar: () ->
    Controller = require "./calendar.coffee"
    new Controller().index()

  ###*
  * render index page for cancel appointment flow
  * @param {id} id - appointment ID
  ###
  cancel: (id) ->
    Controller = require "./cancel.coffee"
    new Controller().index id

  ###*
  * render index page for update appointment flow
  * @param {string} id - Selected appointment ID
  ###
  update: (id) ->
    Controller = require "./update.coffee"
    new Controller().index id

  ###*
  * render review page for update appointment flow
  * @param {object} appointment - Selected appointment model
  ###
  updateReview: (appointment) ->
    Controller = require "./update.coffee"
    new Controller().review appointment

  ###*
  * render confirmation page for update appointment flow
  * @param {object} appointment - Selected appointment model
  ###
  updateConfirmation: (appointment) ->
    Controller = require "./update.coffee"
    new Controller().confirmation appointment

  ###*
  * render index page for detail appointment flow
  * @param {string} id - Selected appointment ID
  ###
  detail: (id) ->
    Controller = require "./detail.coffee"
    new Controller().index id

  ###*
  * Render an error page
  * @param {object} options - Options object
  ###
  error: (options) ->
    Controller = require "./error.coffee"
    new Controller(options).init options

  ###*
  *   Scroll page to the top.
  *   TODO: move to helper file or marionette behavior
  ###
  scroll: () ->
    $(document).scrollTop(0)
    $("#app-main").css(
      opacity: 0
    ).animate(
      opacity: 1
    , 600
    )

  ###*
  *   Route to default page. Full app reload
  ###
  defaultPage: () ->
    #update url if there is route doesn"t exist. go to schedule default page
    Backbone.history.navigate "",  trigger: true

module.exports = Controller