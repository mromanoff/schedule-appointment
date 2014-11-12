###*
 * app Controller Module
 *
 * This is the base controller for the account app. In here, we simply manage
 * the firing of the appropriate sub-controller logic for each page. Note how
 * we do not require all Views, Models, Layouts and Forms on top. Instead, we
 * we load them only when needed via a require() call inside each method. This
 * will ensure the app does not load too much into memory.
 *
 * @augments Backbone.Model
 * @name Scheduleapp
 * @class appController
 * @return module
 ###

Marionette = require "backbone.marionette"

module.exports = Marionette.Controller.extend
  ###*
  * render index page for schedule appointment flow
  * @param {string} [date] - date in 2014-05-31 format
  ###
  create: (date) ->
    controller = require "./create.coffee"
    create = new controller().index date


  ###*
   * render review page for schedule appointment flow
   * @param {object} appointment - Selected appointment model
  ###
  createReview: (appointment) ->
    require "./create.coffee", (Controller) ->
      controller = new Controller()
      controller.review appointment

  ###*
   * render confirmation page for schedule appointment flow
   * @param {object} appointment - Selected appointment model
  ###
  createConfirmation: (appointment) ->
    require "./create.coffee", (Controller) ->
      controller = new Controller()
      controller.confirmation appointment

  ###*
  * render index page for cancel appointment flow
  * @param {id} id - appointment ID
  ###
  cancel: (id) ->
    require "./cancel.coffee", (Controller) ->
      controller = new Controller()
      controller.index id

  ###*
  * render review page for cancel appointment flow
  * @param {object} appointment - Selected appointment model
  ###
  cancelReview: (appointment) ->
    require "./cancel.coffee", (Controller) ->
    controller = new Controller()
    controller.review appointment


  ###*
  * render confirmation page for cancel appointment flow
  * @param {object} appointment - Selected appointment model
  ###
  cancelConfirmation: (appointment) ->
    require "./cancel.coffee", (Controller) ->
      controller = new Controller()
      controller.confirmation appointment

  ###*
  * render index page for update appointment flow
  * @param {string} id - Selected appointment ID
  ###
  update: (id) ->
    require "./update.coffee", (Controller) ->
      controller = new Controller()
      controller.index id

  ###*
  * render review page for update appointment flow
  * @param {object} appointment - Selected appointment model
  ###
  updateReview: (appointment) ->
    require "./update.coffee", (Controller) ->
      controller = new Controller()
      controller.review appointment

  ###*
  * render confirmation page for update appointment flow
  * @param {object} appointment - Selected appointment model
  ###
  updateConfirmation: (appointment) ->
    require "./update.coffee", (Controller) ->
      controller = new Controller()
      controller.confirmation appointment

  ###*
   * render index page for detail appointment flow
   * @param {string} id - Selected appointment ID
  ###
  detail: (id) ->
    require "./detail.coffee", (Controller) ->
      controller = new Controller(id)
      controller.index id

  ###*
   * render calendar component
  ###
  calendar: () ->
    require "./calendar.coffee", (Controller) ->
      controller = new Controller()
      controller.index()

  ###*
  * Create calendar navigation component
  * @param {object} options - Options object
  ###
  navigation: (options) ->
    require "./calendar-navigation.coffee", (Controller) ->
      controller = new Controller(options)
      controller.index options

  ###*
  * Create header component
  * @param {object} options - Options object
  ###
  header: (options) ->
    controller = require "./header.coffee"
    new controller().init options


  ###*
   * Create filter component, filter by Trainer and Duration
  ###
  trainerFilter: () ->
    require "./trainer.coffee", (Controller) ->
      controller = new Controller()
      controller.initialize()

  ###*
  * Render an error page
  * @param {object} options - Options object
  ###
  error: (options) ->
    require "./error.coffee", (Controller) ->
      controller = new Controller(options)
      controller.initialize options

  ###*
  *   Scroll page to the top.
  *   TODO: move to helper file
  ###
  scroll: () ->
    $(document).scrollTop(0)
    $("#app-main").css(
      opacity: 0
      ).animate(
      opacity: 1
      , 600
    )
    return


  ###*
  *   Route to default page. Full app reload
  ###
  defaultPage: () ->
    #update url if there is route doesn"t exist. go to schedule default page
    Backbone.history.navigate "",  trigger: true
