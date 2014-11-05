###*
 * App Controller
 *
 * This is the base controller for the account app. In here, we simply manage
 * the firing of the appropriate sub-controller logic for each page. Note how
 * we do not require all Views, Models, Layouts and Forms on top. Instead, we
 * we load them only when needed via a require() call inside each method. This
 * will ensure the app does not load too much into memory.
 *
 * @augments Backbone.Model
 * @name ScheduleApp
 * @class AppController
 * @return module
 ###

define (require, exports, module) ->

  Marionette = require 'marionette'

  module.exports = Marionette.Controller.extend(
    ###*
    * render index page for schedule appointment flow
    * @param {string} [date] - date in 2014-05-31 format
    ###
    create: (date) ->
      require ['controllers/create'], (Controller) ->
        controller = new Controller()
        controller.index date


    ###*
     * render review page for schedule appointment flow
     * @param {object} appointment - Selected Appointment model
    ###
    createReview: (appointment) ->
      require ['controllers/create'], (Controller) ->
        controller = new Controller()
        controller.review appointment

    ###*
     * render confirmation page for schedule appointment flow
     * @param {object} appointment - Selected Appointment model
    ###
    createConfirmation: (appointment) ->
      require ['controllers/create'], (Controller) ->
        controller = new Controller()
        controller.confirmation appointment

    ###*
    * render index page for cancel appointment flow
    * @param {id} id - Appointment ID
    ###
    cancel: (id) ->
      require ['controllers/cancel'], (Controller) ->
        controller = new Controller()
        controller.index id
        
    ###*
    * render review page for cancel appointment flow
    * @param {object} appointment - Selected Appointment model
    ###
    cancelReview: (appointment) ->
      require ['controllers/cancel'], (Controller) ->
      controller = new Controller()
      controller.review appointment


    ###*
    * render confirmation page for cancel appointment flow
    * @param {object} appointment - Selected Appointment model
    ###
    cancelConfirmation: (appointment) ->
      require ['controllers/cancel'], (Controller) ->
        controller = new Controller()
        controller.confirmation appointment

    ###*
    * render index page for update appointment flow
    * @param {string} id - Selected Appointment ID
    ###
    update: (id) ->
      require ['controllers/update/index'], (Controller) ->
        controller = new Controller()
        controller.index id

    ###*
    * render review page for update appointment flow
    * @param {object} appointment - Selected Appointment model
    ###
    updateReview: (appointment) ->
      require ['controllers/update/index'], (Controller) ->
        controller = new Controller()
        controller.review appointment

    ###*
    * render confirmation page for update appointment flow
    * @param {object} appointment - Selected Appointment model
    ###
    updateConfirmation: (appointment) ->
      require ['controllers/update/index'], (Controller) ->
        controller = new Controller()
        controller.confirmation appointment

    ###*
     * render index page for detail appointment flow
     * @param {string} id - Selected Appointment ID
    ###
    detail: (id) ->
      require ['controllers/detail/index'], (Controller) ->
        controller = new Controller(id)
        controller.index id

    ###*
     * render calendar component
    ###
    calendar: () ->
      require ['controllers/calendar'], (Controller) ->
        controller = new Controller()
        controller.index()

    ###*
    * Create calendar navigation component
    * @param {object} options - Options object
    ###
    navigation: (options) ->
      require ['controllers/calendar-navigation'], (Controller) ->
        controller = new Controller(options)
        controller.index options

    ###*
    * Create header component
    * @param {object} options - Options object
    ###
    header: (options) ->
      require ['controllers/header/index'], (Controller) ->
        controller = new Controller(options)
        controller.initialize options


    ###*
     * Create filter component, filter by Trainer and Duration
    ###
    trainerFilter: () ->
      require ['controllers/filter/trainer'], (Controller) ->
        controller = new Controller()
        controller.initialize()

    ###*
    * Render an error page
    * @param {object} options - Options object
    ###
    error: (options) ->
      require ['controllers/error'], (Controller) ->
        controller = new Controller(options)
        controller.initialize options

    ###*
    *   Scroll page to the top.
    *   TODO: move to helper file
    ###
    scroll: () ->
      $(document).scrollTop(0)
      $('#app-main').css(
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
      #update url if there is route doesn't exist. go to schedule default page
      Backbone.history.navigate '',  trigger: true

  )

  return