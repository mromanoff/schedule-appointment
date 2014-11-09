(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee":[function(require,module,exports){

/**
  * App Module
 */
var Analytics, App, Backbone, FilterCriteriaModel, Layout, Marionette, Utils, _;

_ = require("underscore");

Backbone = require("backbone");

Marionette = require("backbone.marionette");

Layout = require("./views/layout.coffee");

Utils = require("./components/utils.coffee");

FilterCriteriaModel = require("./entities/criteria.coffee");

Analytics = require("./entities/analytics.coffee");

App = new Marionette.Application();

App.layout = new Layout();

App.utils = new Utils();

App.filterCriteria = new FilterCriteriaModel();

App.analytics = new Analytics();

App.el = "#app-main";


/** update App flow
   *  @param {string} create, update, cancel, detail
 */

App.flow = null;


/**
 *
 * @returns {Backbone.History.fragment|*}
 */

App.getCurrentRoute = function() {
  return Backbone.history.fragment;
};


/**
 * @param route
 * @param {object} options
 */

App.navigate = function(route, options) {
  if (options == null) {
    options = {};
  }
  return Backbone.history.navigate(route, options);
};

App.on("initialize:after", function() {
  if (_.isEmpty(App.scheduleCriteria.trainers)) {
    window.location.href = "/personal-training/schedule-equifit";
    return false;
  }
  window.App = {
    Components: {}
  };
  App.filterCriteria.set({
    sessionTypeId: App.scheduleCriteria.durations[0].sessionTypeId,
    duration: App.scheduleCriteria.durations[0].duration,
    trainerId: App.scheduleCriteria.trainers[0].trainerId,
    trainerName: App.scheduleCriteria.trainers[0].trainerFirstName + " " + App.scheduleCriteria.trainers[0].trainerLastName,
    silent: true
  });
  App.analytics.set({
    trainerId: App.scheduleCriteria.trainers[0].trainerId
  });
  App.addRegions({
    mainRegion: App.el
  });
  return App.mainRegion.show(App.layout);
});

module.exports = App;



},{"./components/utils.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/components/utils.coffee","./entities/analytics.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/analytics.coffee","./entities/criteria.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/criteria.coffee","./views/layout.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/layout.coffee","backbone":"backbone","backbone.marionette":"backbone.marionette","underscore":"underscore"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/components/utils.coffee":[function(require,module,exports){

/**
* Utilities Module
*
* Useful utilities we will use throughout the app
*
* @name Utils
* @class Utils
 */
var Utils, moment;

moment = require("moment");

Utils = function() {
  this.STARTDATE = moment().add("days", 1).format("YYYY-MM-DD");
  this.ENDDATE = moment().add("days", 30).format("YYYY-MM-DD");
  this.TOMORROW = moment().add("days", 1).format("YYYY-MM-DD");
};

Utils.prototype = {

  /**
  * @name isValidDate
  * @function
  * @param {string} date - 2014-05-31 format
  * @returns {boolean}
   */
  isValidDate: function(date) {
    var isAfter, isBefore, isEnd, isStart;
    isAfter = moment(date).isAfter(this.STARTDATE);
    isBefore = moment(date).isBefore(this.ENDDATE);
    isStart = moment(date).isSame(this.STARTDATE);
    isEnd = moment(date).isSame(this.ENDDATE);
    return (isAfter && isBefore) || (isStart || isEnd);
  }
};

module.exports = Utils;



},{"moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/app_controller.coffee":[function(require,module,exports){

/**
 * App Controller Module
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
 */
var Marionette;

Marionette = require("backbone.marionette");

module.exports = Marionette.Controller.extend({

  /**
  * render index page for schedule appointment flow
  * @param {string} [date] - date in 2014-05-31 format
   */
  create: function(date) {
    return require("./create.coffee", function(Controller) {
      var controller;
      controller = new Controller();
      return controller.index(date);
    });
  },

  /**
   * render review page for schedule appointment flow
   * @param {object} appointment - Selected Appointment model
   */
  createReview: function(appointment) {
    return require("./create.coffee", function(Controller) {
      var controller;
      controller = new Controller();
      return controller.review(appointment);
    });
  },

  /**
   * render confirmation page for schedule appointment flow
   * @param {object} appointment - Selected Appointment model
   */
  createConfirmation: function(appointment) {
    return require("./create.coffee", function(Controller) {
      var controller;
      controller = new Controller();
      return controller.confirmation(appointment);
    });
  },

  /**
  * render index page for cancel appointment flow
  * @param {id} id - Appointment ID
   */
  cancel: function(id) {
    return require("./cancel.coffee", function(Controller) {
      var controller;
      controller = new Controller();
      return controller.index(id);
    });
  },

  /**
  * render review page for cancel appointment flow
  * @param {object} appointment - Selected Appointment model
   */
  cancelReview: function(appointment) {
    var controller;
    require("./cancel.coffee", function(Controller) {});
    controller = new Controller();
    return controller.review(appointment);
  },

  /**
  * render confirmation page for cancel appointment flow
  * @param {object} appointment - Selected Appointment model
   */
  cancelConfirmation: function(appointment) {
    return require("./cancel.coffee", function(Controller) {
      var controller;
      controller = new Controller();
      return controller.confirmation(appointment);
    });
  },

  /**
  * render index page for update appointment flow
  * @param {string} id - Selected Appointment ID
   */
  update: function(id) {
    return require("./update.coffee", function(Controller) {
      var controller;
      controller = new Controller();
      return controller.index(id);
    });
  },

  /**
  * render review page for update appointment flow
  * @param {object} appointment - Selected Appointment model
   */
  updateReview: function(appointment) {
    return require("./update.coffee", function(Controller) {
      var controller;
      controller = new Controller();
      return controller.review(appointment);
    });
  },

  /**
  * render confirmation page for update appointment flow
  * @param {object} appointment - Selected Appointment model
   */
  updateConfirmation: function(appointment) {
    return require("./update.coffee", function(Controller) {
      var controller;
      controller = new Controller();
      return controller.confirmation(appointment);
    });
  },

  /**
   * render index page for detail appointment flow
   * @param {string} id - Selected Appointment ID
   */
  detail: function(id) {
    return require("./detail.coffee", function(Controller) {
      var controller;
      controller = new Controller(id);
      return controller.index(id);
    });
  },

  /**
   * render calendar component
   */
  calendar: function() {
    return require("./calendar.coffee", function(Controller) {
      var controller;
      controller = new Controller();
      return controller.index();
    });
  },

  /**
  * Create calendar navigation component
  * @param {object} options - Options object
   */
  navigation: function(options) {
    return require("./calendar-navigation.coffee", function(Controller) {
      var controller;
      controller = new Controller(options);
      return controller.index(options);
    });
  },

  /**
  * Create header component
  * @param {object} options - Options object
   */
  header: function(options) {
    return require("./header.coffee", function(Controller) {
      var controller;
      controller = new Controller(options);
      return controller.initialize(options);
    });
  },

  /**
   * Create filter component, filter by Trainer and Duration
   */
  trainerFilter: function() {
    return require("./trainer.coffee", function(Controller) {
      var controller;
      controller = new Controller();
      return controller.initialize();
    });
  },

  /**
  * Render an error page
  * @param {object} options - Options object
   */
  error: function(options) {
    return require("./error.coffee", function(Controller) {
      var controller;
      controller = new Controller(options);
      return controller.initialize(options);
    });
  },

  /**
  *   Scroll page to the top.
  *   TODO: move to helper file
   */
  scroll: function() {
    $(document).scrollTop(0);
    $("#app-main").css({
      opacity: 0
    }).animate({
      opacity: 1
    }, 600);
  },

  /**
  *   Route to default page. Full app reload
   */
  defaultPage: function() {
    return Backbone.history.navigate("", {
      trigger: true
    });
  }
});



},{"./calendar-navigation.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/calendar-navigation.coffee","./calendar.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/calendar.coffee","./cancel.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/cancel.coffee","./create.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/create.coffee","./detail.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/detail.coffee","./error.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/error.coffee","./header.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/header.coffee","./trainer.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/trainer.coffee","./update.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/update.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/calendar-navigation.coffee":[function(require,module,exports){

/**
  * Controller Calendar Navigation Module
 */
var App, Marionette, Model, View, collection, createCollection, moment;

Marionette = require("backbone.marionette");

moment = require("moment");

App = require("../app.coffee");

View = require("../views/calendar/navigation.coffee");

Model = Backbone.Model.extend();

collection = new Backbone.Collection();

createCollection = function(startDate) {
  var date, i, model, _i;
  date = moment(startDate);
  model;
  for (i = _i = 0; _i <= 6; i = _i += 1) {
    model = new Model({
      dataDate: date.format("YYYY-MM-DD"),
      date: date.format("ddd"),
      dateShort: date.format("dd"),
      month: date.format("MMM"),
      day: date.format("DD"),
      current: i === 0 ? "mobile-current current" : ""
    });
    collection.add(model);
    date.add("days", 1);
  }
  return collection;
};

module.exports = Marionette.Controller.extend({
  index: function(options) {
    collection.reset();
    collection = createCollection(options.startDate);
    return App.layout.navigation.show(new View({
      collection: collection
    }));
  }
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../views/calendar/navigation.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/calendar/navigation.coffee","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/calendar.coffee":[function(require,module,exports){

/**
  * Controller Calendar Module
 */
var App, Backbone, Marionette, Model, View, daysHeader, getDates, moment, msgBus;

Backbone = require("backbone");

Marionette = require("backbone.marionette");

moment = require("moment");

App = require("../app.coffee");

msgBus = require("../msgbus.coffee");

View = require("../views/calendar.coffee");

Model = Backbone.Model.extend();

daysHeader = new Backbone.Collection();


/**
* Create 7 days
* @param {string} startDate - 2014-05-31 format
* @returns {Backbone.Collection}
 */

getDates = function(startDate) {
  var date, i, model, _i;
  i = 0;
  date = moment(startDate);
  model;
  for (i = _i = 0; _i <= 6; i = _i += 1) {
    model = new Model({
      date: date.format("ddd"),
      day: date.format("DD"),
      month: date.format("MMM"),
      selected: i === 0 ? "selected" : null
    });
    daysHeader.add(model);
    date.add("days", 1);
  }
  return daysHeader;
};

module.exports = Marionette.Controller.extend({
  index: function() {
    var date;
    date = App.filterCriteria.get("startDate");
    return require(["entities/appointments"], function() {
      var promise;
      promise = msgBus.reqres.request("entities:appointments", date);
      promise.done(function(appointments) {
        daysHeader.reset();
        daysHeader = getDates(date);
        module.exports = new View({
          appointments: appointments,
          dates: daysHeader
        });
      });
      promise.fail(function(model, jqXHR, textStatus) {
        return msgBus.reqres.request("schedule:error", {
          error: [model, jqXHR, textStatus]
        });
      });
    });
  }
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/calendar.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/calendar.coffee","backbone":"backbone","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/cancel.coffee":[function(require,module,exports){

/**
  * Controller Cancel Module
 */
var App, CancelView, ConfirmationView, Marionette, ReviewView, msgBus, view;

Marionette = require("backbone.marionette");

App = require("../app.coffee");

msgBus = require("../msgbus.coffee");

CancelView = require("../views/cancel/index.coffee");

ReviewView = require("../views/cancel/review.coffee");

ConfirmationView = require("../views/cancel/confirmation.coffee");

view = null;

App.flow = "cancel";

module.exports = Marionette.Controller.extend({
  index: function(id) {
    msgBus.reqres.request("schedule:header", {
      pageTitle: "Cancel your session"
    });
    return require(["entities/appointment"], function() {
      var promise;
      promise = msgBus.reqres.request("entities:appointment", id);
      promise.done(function(appointment) {
        view = new CancelView({
          model: appointment
        });
        App.layout.content.show(view);
        return App.analytics.set({
          action: "delete-start"
        });
      });
      return promise.fail(function(model, jqXHR, textStatus) {
        return msgBus.reqres.request("schedule:error", {
          error: [model, jqXHR, textStatus]
        });
      });
    });
  },
  review: function(appointment) {
    msgBus.reqres.request("schedule:header", {
      pageTitle: "Cancel your session"
    });
    view = new ReviewView({
      model: appointment
    });
    App.layout.content.show(view);
    return App.analytics.set({
      action: "delete-review"
    });
  },
  confirmation: function(appointment) {
    var data;
    data = _.pick(appointment.toJSON(), "id", "cancelAll", "message");
    return require(["entities/cancel"], function() {
      var promise;
      promise = msgBus.reqres.request("entities:cancel:appointment", data);
      promise.done(function(response) {
        appointment.set({
          id: response.id,
          APIEndpoint: App.APIEndpoint
        });
        msgBus.reqres.request("schedule:header", {
          pageTitle: "Your session is canceled"
        });
        view = new ConfirmationView({
          model: appointment
        });
        App.layout.content.show(view);
        return App.analytics.set({
          action: "delete-complete"
        });
      });
      return promise.fail(function(response) {
        return msgBus.reqres.request("schedule:error", response.responseJSON);
      });
    });
  }
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/cancel/confirmation.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/cancel/confirmation.coffee","../views/cancel/index.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/cancel/index.coffee","../views/cancel/review.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/cancel/review.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/create.coffee":[function(require,module,exports){

/**
  * Controller Create Module
 */
var App, ConfirmationView, Marionette, ReviewView, msgBus, view;

Marionette = require("backbone.marionette");

App = require("../app.coffee");

msgBus = require("../msgbus.coffee");

ReviewView = require("../views/create/review.coffee");

ConfirmationView = require("../views/create/confirmation.coffee");

view = null;

App.flow = "create";

module.exports = Marionette.Controller.extend({
  index: function(date) {
    console.log("Create: date attr", date);
    date = App.utils.isValidDate(date) ? date : App.utils.TOMORROW;
    msgBus.reqres.request("schedule:header", {
      pageTitle: "Schedule Training"
    });
    msgBus.reqres.request("schedule:trainer:filter");
    msgBus.reqres.request("schedule:calendar:navigation", {
      startDate: date
    });
    App.filterCriteria.set({
      startDate: date
    });
    return App.analytics.set({
      action: "add-start"
    });
  },
  review: function(appointment) {
    msgBus.reqres.request("schedule:header", {
      pageTitle: "Review your session"
    });
    view = new ReviewView({
      model: appointment
    });
    App.layout.filter.close();
    App.layout.navigation.close();
    App.layout.content.show(view);
    return App.analytics.set({
      action: "add-review"
    });
  },
  confirmation: function(appointment) {
    var data;
    data = _.pick(appointment.toJSON(), "id", "sessionTypeId", "trainerId", "startDate", "endDate", "message");
    return require(["entities/create"], function() {
      var promise;
      promise = msgBus.reqres.request("entities:create:appointment", data);
      promise.done(function(response) {
        appointment.set({
          id: response.id,
          APIEndpoint: App.APIEndpoint
        });
        msgBus.reqres.request("schedule:header", {
          pageTitle: "Enjoy your workout."
        });
        view = new ConfirmationView({
          model: appointment
        });
        App.layout.navigation.close();
        App.layout.content.show(view);
        return App.analytics.set({
          action: "add-complete"
        });
      });
      return promise.fail(function(response) {
        return msgBus.reqres.request("schedule:error", response.responseJSON);
      });
    });
  }
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/create/confirmation.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/create/confirmation.coffee","../views/create/review.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/create/review.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/detail.coffee":[function(require,module,exports){

/**
  * Controller Detail Module
 */
var App, Marionette, View, msgBus, view;

Marionette = require("backbone.marionette");

App = require("../app.coffee");

msgBus = require("../msgbus.coffee");

View = require("../views/detail/index.coffee");

view = null;

App.flow = "detail";

module.exports = Marionette.Controller.extend({
  index: function(id) {
    msgBus.reqres.request("schedule:header", {
      pageTitle: "Session Detail"
    });
    return require(["entities/appointment"], function() {
      var promise;
      promise = msgBus.reqres.request("entities:appointment", id);
      promise.done(function(appointment) {
        view = new View({
          model: appointment
        });
        return App.layout.content.show(view);
      });
      return promise.fail(function(model, jqXHR, textStatus) {
        return msgBus.reqres.request("schedule:error", {
          error: [model, jqXHR, textStatus]
        });
      });
    });
  }
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/detail/index.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/detail/index.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/error.coffee":[function(require,module,exports){

/**
  * Controller Error Module
 */
var App, Marionette, Model, View, model, msgBus;

Marionette = require("backbone.marionette");

App = require("../app.coffee");

msgBus = require("../msgbus.coffee");

Model = require("../entities/error.coffee");

View = require("../views/error.coffee");

model = new Model();

module.exports = Marionette.Controller.extend({
  initialize: function(options) {
    msgBus.reqres.request("schedule:header", {
      pageTitle: "Error",
      subTitle: null
    });
    App.layout.filter.close();
    App.layout.navigation.close();
    model.set(options.error);
    return App.layout.content.show(new View({
      model: model
    }));
  }
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../entities/error.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/error.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/error.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/error.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/header.coffee":[function(require,module,exports){

/**
  * Controller Header Module
 */
var App, Marionette, Model, View, model, view;

Marionette = require("backbone.marionette");

App = require("../app.coffee");

Model = require("../entities/header.coffee");

View = require("../views/header.coffee");

model = new Model();

view = new View({
  model: model
});

module.exports = Marionette.Controller.extend({
  initialize: function(options) {
    model.set(options);
    return App.layout.header.show(view);
  }
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../entities/header.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/header.coffee","../views/header.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/header.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/trainer.coffee":[function(require,module,exports){

/**
  * Controller Trainer Module
 */
var App, Marionette, Model, View, model, view;

Marionette = require("backbone.marionette");

App = require("../app.coffee");

View = require("../views/filter/trainer.coffee");

Model = Backbone.Model.extend({
  defaults: {
    durations: null,
    trainers: null
  }
});

model = new Model();

view = new View({
  model: model
});

module.exports = Marionette.Controller.extend({
  initialize: function() {}
}, model.set({
  trainers: App.scheduleCriteria.trainers,
  durations: App.scheduleCriteria.durations
}));

App.layout.filter.show(view);



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../views/filter/trainer.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/filter/trainer.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/update.coffee":[function(require,module,exports){

/**
  * Controller Update Module
 */
var App, ConfirmationView, Marionette, ReviewView, moment, msgBus, originalAppointment, view;

Marionette = require("backbone.marionette");

moment = require("moment");

App = require("../app.coffee");

msgBus = require("../msgbus.coffee");

ReviewView = require("../views/update/review.coffee");

ConfirmationView = require("../views/update/confirmation.coffee");

view = null;

originalAppointment = null;

App.flow = "update";

module.exports = Marionette.Controller.extend({
  index: function(id) {
    return require("../entities/appointment.coffee", function() {
      var promise;
      promise = msgBus.reqres.request("entities:appointment", id);
      promise.done(function(appointment) {
        var date, startDate, uiDate;
        originalAppointment = appointment;
        date = appointment.get("startDate");
        startDate = moment(date).format("YYYY-MM-DD");
        uiDate = moment(date).format("MMM D @ H A");
        msgBus.reqres.request("schedule:header", {
          pageTitle: "Reschedule Training",
          subTitle: "edit the time for <strong>" + uiDate + "</strong> and notify your trainer"
        });
        msgBus.reqres.request("schedule:calendar:navigation", {
          startDate: startDate
        });
        App.filterCriteria.set({
          startDate: startDate,
          trainerId: appointment.get("trainerId"),
          trainerName: appointment.get("trainerFirstName" + " " + appointment.get("trainerLastName")),
          sessionTypeId: appointment.get("sessionTypeId"),
          duration: appointment.get("duration")
        });
        App.filterCriteria.trigger("change");
        return App.analytics.set({
          action: "edit-start"
        });
      });
      promise.fail(function(model, jqXHR, textStatus) {});
      return msgBus.reqres.request("schedule:error", {
        error: [model, jqXHR, textStatus]
      });
    });
  },
  review: function(appointment) {
    msgBus.reqres.request("schedule:header", {
      pageTitle: "Review your session",
      subTitle: null
    });
    view = new ReviewView({
      model: appointment,
      original: originalAppointment
    });
    App.layout.navigation.close();
    App.layout.content.show(view);
    return App.analytics.set({
      action: "edit-review"
    });
  },
  confirmation: function(appointment) {
    var data;
    appointment.set({
      id: originalAppointment.id
    });
    data = _.pick(appointment.toJSON(), "id", "sessionTypeId", "trainerId", "startDate", "endDate", "message");
    require("../entities/update.coffee", function() {
      var promise;
      promise = msgBus.reqres.request("entities:update:appointment", data);
      promise.done(function(response) {});
      appointment.set({
        id: response.id,
        APIEndpoint: App.APIEndpoint
      });
      msgBus.reqres.request("schedule:header", {
        pageTitle: "Enjoy your workout.",
        subTitle: null
      });
      view = new ConfirmationView({
        model: appointment,
        original: originalAppointment
      });
      App.layout.navigation.close();
      App.layout.content.show(view);
      return App.analytics.set({
        action: "edit-complete"
      });
    });
    return promise.fail(function(response) {
      return msgBus.reqres.request("schedule:error", response.responseJSON);
    });
  }
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../entities/appointment.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/appointment.coffee","../entities/update.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/update.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/update/confirmation.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/update/confirmation.coffee","../views/update/review.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/update/review.coffee","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/analytics.coffee":[function(require,module,exports){

/**
  * Analytics Module
 */
var Backbone;

Backbone = require("backbone");

module.exports = Backbone.Model.extend({
  defaults: {
    trainerId: "",
    facilityId: "",
    timeOffset: "",
    action: "",
    availSlots: ""
  },
  initialize: function() {
    return this.on("change:action", this.save, this);
  },
  save: function() {
    return window.tagData.ptSchedule = this.toJSON();
  }
});



},{"backbone":"backbone"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/appointment.coffee":[function(require,module,exports){

/**
* Entities Appointment Module
 */
var API, App, Appointment, Loading, loadingView, msgBus;

App = require("../app.coffee");

msgBus = require("../msgbus.coffee");

Loading = require("../views/spinner.coffee");

loadingView = new Loading();

Appointment = Backbone.Model.extend();

API = {

  /**
     * @name getAppointment
     * @function
     * @returns {object} promise object
   */
  getAppointment: function(id) {
    var appointment, deferred;
    appointment = new Appointment({
      id: id
    });
    deferred = $.Deferred();
    App.layout.content.show(loadingView);
    appointment.urlRoot = function() {
      return App.APIEndpoint + "/personal-training-schedule/appointments";
    };
    appointment.fetch({
      success: deferred.resolve,
      error: deferred.reject
    });
    return deferred.promise();
  }
};

msgBus.reqres.setHandler("entities:appointment", function(id) {
  return API.getAppointment(id);
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/spinner.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/spinner.coffee"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/criteria.coffee":[function(require,module,exports){

/**
* Criteria Module
 */
var Backbone, msgBus;

msgBus = require("../msgbus.coffee");

Backbone = require("backbone");

module.exports = Backbone.Model.extend({
  defaults: {
    trainerId: null,
    trainerName: null,
    sessionTypeId: null,
    duration: null,
    startDate: null
  },
  initialize: function() {
    return this.on("change", this.updateCalendar);
  },
  updateCalendar: function() {
    return msgBus.reqres.request("schedule:calendar", {
      startDate: this.get("startDate"),
      trainerId: this.get("trainerId"),
      sessionTypeId: this.get("sessionTypeId")
    });
  }
});



},{"../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone":"backbone"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/error.coffee":[function(require,module,exports){
define(function(require, exports, module) {
  var Backbone;
  Backbone = require('backbone');
  module.exports = Backbone.Model.extend({
    defaults: {
      message: 'Please try again later.',
      code: null,
      exception: null,
      data: null
    }
  });
});



},{"backbone":"backbone"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/header.coffee":[function(require,module,exports){
define(function(require, exports, module) {
  return module.exports = Backbone.Model.extend({
    defaults: {
      pageTitle: null,
      subTitle: null
    }
  });
});



},{}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/update.coffee":[function(require,module,exports){
define(function(require) {
  var API, App, Loading, Model, loadingView, msgBus;
  App = require("../app.coffee");
  msgBus = require('../msgbus.coffee');
  Loading = require('../views/spinner.coffee');
  loadingView = new Loading();
  return Model = Backbone.Model.extend({
    defaults: {
      id: null,
      trainerId: null,
      startDate: null,
      endDate: null,
      sessionTypeId: null,
      message: null
    },
    url: function() {
      return App.APIEndpoint + 'update';
    }
  }, API = {

    /**
    * @name updateAppointment
    * @function
    * @returns {object} promise object
     */
    updateAppointment: function(data) {
      var deferred, model;
      model = new Model();
      deferred = $.Deferred();
      App.layout.content.show(loadingView);
      model.save(data, {
        success: deferred.resolve,
        error: deferred.reject
      });
      return deferred.promise();
    }
  }, msgBus.reqres.setHandler('entities:update:appointment', function(data) {
    return API.updateAppointment(data);
  }));
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/spinner.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/spinner.coffee"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/main.coffee":[function(require,module,exports){

/**
  * Main Module
 */
var $, App, Backbone, Router, proxiedSync, _;

$ = require("jquery");

_ = require("underscore");

Backbone = require("backbone");

Backbone.$ = $;

App = require("./app.coffee");

Router = require("./router.coffee");

proxiedSync = Backbone.sync;

Backbone.sync = function(method, model, options) {
  options = options || {};
  if (!options.crossDomain) {
    options.crossDomain = true;
  }
  if (!options.xhrFields) {
    options.xhrFields = {
      withCredentials: true
    };
    return proxiedSync(method, model, options);
  }
};

App.addInitializer(function(options) {
  App.Router = new Router();
  App.scheduleCriteria = options.scheduleCriteria;
  App.APIEndpoint = _.isNull(options.APIEndpoint) ? null : options.APIEndpoint + "/personal-training-schedule/";
  App.MainDomain = options.MainDomain;
  return Backbone.history.start({
    pushState: true,
    root: options.root
  });
});

$(function() {
  App.start({
    root: "/personal-training/schedule",
    scheduleCriteria: window.scheduleCriteria || {},
    APIEndpoint: window.APIEndpoint || null,
    MainDomain: window.MainDomain || null
  });
});



},{"./app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","./router.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/router.coffee","backbone":"backbone","jquery":"jquery","underscore":"underscore"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee":[function(require,module,exports){
var AppController, Wreqr, controller, msgBus;

Wreqr = require("backbone.wreqr");

AppController = require("./controllers/app_controller.coffee");

controller = new AppController();

msgBus = {
  reqres: new Wreqr.RequestResponse(),
  commands: new Wreqr.Commands(),
  events: new Wreqr.EventAggregator()
};

msgBus.commands.setHandler("scroll:top", function() {
  return controller.scroll();
});

msgBus.reqres.setHandler("schedule:calendar:navigation", function(options) {
  return controller.navigation(options);
});

msgBus.reqres.setHandler("schedule:header", function(options) {
  return controller.header(options);
});

msgBus.reqres.setHandler("schedule:trainer:filter", function() {
  return controller.trainerFilter();
});

msgBus.reqres.setHandler("schedule:calendar", function() {
  return controller.calendar();
});

msgBus.reqres.setHandler("schedule:error", function(options) {
  return controller.error(options);
});

msgBus.reqres.setHandler("schedule:create:review", function(id) {
  return controller.createReview(id);
});

msgBus.reqres.setHandler("schedule:create:confirmation", function(model) {
  return controller.createConfirmation(model);
});

msgBus.reqres.setHandler("schedule:cancel", function(id) {
  return controller.cancel(id);
});

msgBus.reqres.setHandler("schedule:cancel:review", function(appointment) {
  return controller.cancelReview(appointment);
});

msgBus.reqres.setHandler("schedule:cancel:confirmation", function(appointment) {
  return controller.cancelConfirmation(appointment);
});

msgBus.reqres.setHandler("schedule:update", function(id) {
  return controller.update(id);
});

msgBus.reqres.setHandler("schedule:update:review", function(appointment) {
  return controller.updateReview(appointment);
});

msgBus.reqres.setHandler("schedule:update:confirmation", function(appointment) {
  return controller.updateConfirmation(appointment);
});

module.exports = msgBus;



},{"./controllers/app_controller.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/app_controller.coffee","backbone.wreqr":"backbone.wreqr"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/router.coffee":[function(require,module,exports){

/**
  * Router Module
 */
var AppController, Marionette;

Marionette = require("backbone.marionette");

AppController = require("./controllers/app_controller.coffee");

module.exports = Marionette.AppRouter.extend({
  controller: new AppController(),
  appRoutes: {
    "": "create",
    "create/:date": "create",
    "cancel/:id": "cancel",
    "update/:id": "update",
    "detail/:id": "detail",
    "error": "error",
    "*allOthers": "defaultPage"
  }
});



},{"./controllers/app_controller.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/app_controller.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/calendar.coffee":[function(require,module,exports){

/**
  * Views Calendar Module
 */
var App, AppointmentsLayout, CalendarHeaderItem, CalendarHeaderView, DayPartView, EmptyItem, Item, Marionette, moment, msgBus;

Marionette = require("backbone.marionette");

moment = require("moment");

App = require("../app.coffee");

msgBus = require("../msgbus.coffee");

Item = Marionette.ItemView.extend({
  tagName: "li",
  template: require("../../templates/calendar/item.hbs"),
  events: {
    "click .available": "selectAppointment"
  },
  initialize: function() {
    this.addAttribute("data-item", this.model.get("indexOfWeek"));
    return this.addAttribute("data-date", this.model.get("startDate"));
  },
  onBeforeRender: function() {
    var endTime, meridiemIndicator, scheduled, startTime;
    startTime = null;
    endTime = null;
    meridiemIndicator = null;
    scheduled = this.model.has("id") ? " scheduled" : false;
    if (this.model.get("isAvailable")) {
      startTime = moment(this.model.get("startDate")).format("hh:mm");
      endTime = moment(this.model.get("endDate")).format("hh:mm");
      meridiemIndicator = moment(this.model.get("endDate")).format("A");
      return this.model.set({
        cid: this.model.cid,
        className: scheduled ? "scheduled" : "available",
        appointment: startTime + " - " + endTime + " " + meridiemIndicator,
        scheduled: scheduled
      });
    }
  },
  addAttribute: function(attrName, attrValue) {
    return this.$el.attr(attrName, attrValue);
  },
  selectAppointment: function(e) {
    e.preventDefault();
    return msgBus.reqres.request("schedule:" + App.flow + ":review", this.options.model);
  }
});

EmptyItem = Marionette.ItemView.extend({
  tagName: "li",
  className: "empty",
  template: require("../../templates/calendar/empty_item.hbs"),
  initialize: function() {
    return this.addClass("item-" + this.model.get("indexOfWeek"));
  },
  addClass: function(className) {
    return this.$el.addClass(className);
  }
});

DayPartView = Marionette.CollectionView.extend({
  tagName: "ul",
  itemViewOptions: function(model, index) {
    return {
      itemIndex: index
    };
  },
  getItemView: function(item) {
    if (item.get("isAvailable")) {
      return Item;
    } else {
      return EmptyItem;
    }
  }
});

CalendarHeaderItem = Marionette.ItemView.extend({
  tagName: "li",
  initialize: function() {
    if (this.model.get("selected")) {
      return this.$el.addClass("selected");
    }
  },
  template: require("../../templates/calendar/header_item.hbs")
});

CalendarHeaderView = Marionette.CollectionView.extend({
  tagName: "ul",
  className: "day-dates",
  itemView: CalendarHeaderItem
});

AppointmentsLayout = Marionette.Layout.extend({
  template: require("../../templates/calendar/index.hbs"),
  regions: {
    header: ".appointments-header",
    morning: ".morning",
    afternoon: ".afternoon",
    evening: ".evening"
  },
  events: {
    "click .toggle-day": "toggleDayPart"
  },
  toggleDayPart: function(e) {
    e.preventDefault();
    return $(e.currentTarget).next().toggle();
  }
});

module.exports = function(options) {
  var appointmentsLayout;
  appointmentsLayout = new AppointmentsLayout();
  App.layout.content.show(appointmentsLayout);
  appointmentsLayout.header.show(new CalendarHeaderView({
    collection: options.dates
  }));
  appointmentsLayout.morning.show(new DayPartView({
    collection: new Backbone.Collection(options.appointments.models[0].get("morning"))
  }));
  appointmentsLayout.afternoon.show(new DayPartView({
    collection: new Backbone.Collection(options.appointments.models[0].get("afternoon"))
  }));
  return appointmentsLayout.evening.show(new DayPartView({
    collection: new Backbone.Collection(options.appointments.models[0].get("evening"))
  }));
};



},{"../../templates/calendar/empty_item.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/empty_item.hbs","../../templates/calendar/header_item.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/header_item.hbs","../../templates/calendar/index.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/index.hbs","../../templates/calendar/item.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/item.hbs","../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/calendar/navigation.coffee":[function(require,module,exports){

/**
  * View Calendar Navigation Module
 */
var App, Item, Marionette, moment, msgBus;

Marionette = require("backbone.marionette");

moment = require("moment");

App = require("../../app.coffee");

msgBus = require("../../msgbus.coffee");

Item = Marionette.ItemView.extend({
  tagName: "li",
  template: require("../../../templates/calendar/navigation_item.hbs"),
  events: {
    "click": "updateCalendar"
  },
  onRender: function() {
    var date;
    return date = this.model.get("dataDate");
  }
}, !App.utils.isValidDate(date) ? this.$el.addClass("disabled") : void 0, {
  updateCalendar: function(e) {
    var date;
    e.preventDefault();
    date = this.model.get("dataDate");
    if (App.utils.isValidDate(date)) {
      App.filterCriteria.set({
        startDate: date
      });
      return msgBus.reqres.request("schedule:calendar:navigation", {
        startDate: date
      });
    }
  }
});

module.exports = Marionette.CompositeView.extend({
  itemView: Item,
  className: "classes-calendar",
  template: require("../../../templates/calendar/navigation.hbs"),
  itemViewContainer: "ul",
  initialize: function() {
    var first, last;
    this.first = moment(this.collection.at(0).attributes.dataDate);
    this.last = moment(this.collection.at(6).attributes.dataDate);
    first = moment(this.first);
    last = moment(this.last);
    this.prevWeek = first.subtract("days", 7).format("YYYY-MM-DD");
    return this.nextWeek = last.add("days", 1).format("YYYY-MM-DD");
  },
  events: {
    "click .icon-left-arrow": "updateCalendarPrevWeek",
    "click .icon-right-arrow": "updateCalendarNextWeek"
  },
  ui: {
    leftArrow: ".icon-left-arrow",
    rightArrow: ".icon-right-arrow",
    currentWeek: ".current-week"
  },
  onRender: function() {
    this.ui.currentWeek.text(moment(this.first).format("MMM DD") + " - " + moment(this.last).format("MMM DD"));
    if (moment().add("days", 1).format("W") < this.first.format("W")) {
      this.ui.leftArrow.show();
    } else {
      this.ui.leftArrow.hide();
    }
    if (App.utils.isValidDate(this.nextWeek)) {
      return this.ui.rightArrow.show();
    } else {
      return this.ui.rightArrow.hide();
    }
  }
});

({
  updateCalendarPrevWeek: function(e) {
    var date;
    e.preventDefault();
    date = this.prevWeek;
    App.filterCriteria.set({
      startDate: date
    });
    msgBus.reqres.request("schedule:calendar:navigation", {
      startDate: date
    });
    ({
      updateCalendarNextWeek: function(e) {
        e.preventDefault();
        return date = this.nextWeek;
      }
    });
    App.filterCriteria.set({
      startDate: date
    });
    return msgBus.reqres.request("schedule:calendar:navigation", {
      startDate: date
    });
  }
});



},{"../../../templates/calendar/navigation.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/navigation.hbs","../../../templates/calendar/navigation_item.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/navigation_item.hbs","../../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/cancel/confirmation.coffee":[function(require,module,exports){

/**
  * View Cancel Confirmation Module
 */
var Marionette, msgBus;

Marionette = require("backbone.marionette");

msgBus = require("../../msgbus.coffee");

module.exports = Marionette.ItemView.extend({
  template: require("../../../templates/cancel/confirmation.hbs"),
  initialize: function() {
    return msgBus.commands.execute("scroll:top");
  }
});



},{"../../../templates/cancel/confirmation.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/cancel/confirmation.hbs","../../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/cancel/index.coffee":[function(require,module,exports){

/**
  * View Cancel Index Module
 */
var App, Marionette, moment, msgBus;

Marionette = require("backbone.marionette");

moment = require("moment");

App = require("../../app.coffee");

msgBus = require("../../msgbus.coffee");

module.exports = Marionette.ItemView.extend({
  template: require("../../../templates/cancel/index.hbs"),
  events: {
    "click .cancel-all": "cancelAll",
    "click .cancel": "cancel",
    "click .update": "update"
  },
  initialize: function() {
    console.log("cansel");
    return msgBus.commands.execute("scroll:top");
  },
  onBeforeRender: function() {
    var date, endTime, meridiemIndicator, shortMonth, startTime, weekDay;
    weekDay = moment(this.model.get("startDate")).format("dddd");
    shortMonth = moment(this.model.get("startDate")).format("MMM");
    date = moment(this.model.get("startDate")).format("DD");
    startTime = moment(this.model.get("startDate")).format("hh:mm");
    endTime = moment(this.model.get("endDate")).format("hh:mm");
    meridiemIndicator = moment(this.model.get("endDate")).format("A");
    return this.model.set({
      shortMonth: shortMonth,
      appointmentDate: weekDay + ", " + shortMonth + " " + date,
      appointmentTime: startTime + " - " + endTime + " " + meridiemIndicator
    });
  },
  cancelAll: function(e) {
    e.preventDefault();
    this.model.set({
      cancelAll: true
    });
    return msgBus.reqres.request("schedule:cancel:review", this.model);
  },
  cancel: function(e) {
    e.preventDefault();
    this.model.set({
      cancelAll: false
    });
    return msgBus.reqres.request("schedule:cancel:review", this.model);
  },
  update: function(e) {
    e.preventDefault();
    App.navigate("update/" + this.model.id, {
      trigger: false
    });
    return msgBus.reqres.request("schedule:update", this.model.id);
  }
});



},{"../../../templates/cancel/index.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/cancel/index.hbs","../../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/cancel/review.coffee":[function(require,module,exports){

/**
  * View Cancel Review Module
 */
var Marionette, moment, msgBus;

Marionette = require("backbone.marionette");

moment = require("moment");

msgBus = require("../../msgbus.coffee");

module.exports = Marionette.ItemView.extend({
  template: require("../../../templates/cancel/review.hbs"),
  events: {
    "click .cancel": "cancel",
    "click .add-message": "addMessage",
    "keyup textarea": "countLimit"
  },
  initialize: function() {
    return msgBus.commands.execute("scroll:top");
  },
  ui: {
    textarea: "textarea"
  },
  onBeforeRender: function() {
    var date, endTime, meridiemIndicator, shortMonth, startTime, weekDay;
    weekDay = moment(this.model.get("startDate")).format("dddd");
    shortMonth = moment(this.model.get("startDate")).format("MMM");
    date = moment(this.model.get("startDate")).format("DD");
    startTime = moment(this.model.get("startDate")).format("hh:mm");
    endTime = moment(this.model.get("endDate")).format("hh:mm");
    meridiemIndicator = moment(this.model.get("endDate")).format("A");
    this.model.set({
      shortMonth: shortMonth,
      appointmentDate: weekDay + ", " + shortMonth + " " + date,
      appointmentTime: startTime + " - " + endTime + " " + meridiemIndicator
    });
    return {
      cancel: function(e) {
        e.preventDefault();
        if (!_.isEmpty(this.ui.textarea.val())) {
          this.model.set({
            message: this.ui.textarea.val()
          });
        }
        return msgBus.reqres.request("schedule:cancel:confirmation", this.model);
      },
      countLimit: function(e) {
        var count;
        e.preventDefault();
        count = 300 - this.ui.textarea.val().length;
        return this.ui.textarea.next(".char-counter").text(count);
      },
      addMessage: function(e) {
        e.preventDefault();
        return this.$(".add-message-container").toggleClass("hidden");
      }
    };
  }
});



},{"../../../templates/cancel/review.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/cancel/review.hbs","../../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/create/confirmation.coffee":[function(require,module,exports){

/**
  * Create Confirmation Module
 */
var App, Marionette, msgBus;

Marionette = require("backbone.marionette");

App = require("../../app.coffee");

msgBus = require("../../msgbus.coffee");

module.exports = Marionette.ItemView.extend({
  template: require("../../../templates/create/confirmation.hbs"),
  initialize: function() {
    return msgBus.commands.execute("scroll:top");
  },
  events: {
    "click .cancel": "cancelAppointment"
  },
  cancelAppointment: function(e) {
    e.preventDefault();
    App.navigate("cancel/" + this.model.id, {
      trigger: false
    });
    return msgBus.reqres.request("schedule:cancel", this.model.id);
  }
});



},{"../../../templates/create/confirmation.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/create/confirmation.hbs","../../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/create/review.coffee":[function(require,module,exports){

/**
  * Create Review Module
 */
var Marionette, moment, msgBus;

Marionette = require("backbone.marionette");

moment = require("moment");

msgBus = require("../../msgbus.coffee");

module.exports = Marionette.ItemView.extend({
  template: require("../../../templates/create/review.hbs"),
  events: {
    "click .schedule": "schedule",
    "click .add-message": "addMessage",
    "keyup textarea": "countLimit"
  },
  initialize: function() {
    return msgBus.commands.execute("scroll:top");
  },
  ui: {
    textarea: "textarea"
  },
  onBeforeRender: function() {
    var date, endTime, meridiemIndicator, shortMonth, startTime, weekDay;
    weekDay = moment(this.model.get("startDate")).format("dddd");
    shortMonth = moment(this.model.get("startDate")).format("MMM");
    date = moment(this.model.get("startDate")).format("DD");
    startTime = moment(this.model.get("startDate")).format("hh:mm");
    endTime = moment(this.model.get("endDate")).format("hh:mm");
    meridiemIndicator = moment(this.model.get("endDate")).format("A");
    return this.model.set({
      shortMonth: shortMonth,
      appointmentDate: weekDay + ", " + shortMonth + " " + date,
      appointmentTime: startTime + " - " + endTime + " " + meridiemIndicator
    });
  },
  schedule: function(e) {
    e.preventDefault();
    if (!_.isEmpty(this.ui.textarea.val())) {
      this.model.set({
        message: this.ui.textarea.val()
      });
    }
    return msgBus.reqres.request("schedule:create:confirmation", this.model);
  },
  countLimit: function(e) {
    var count;
    e.preventDefault();
    count = 300 - this.ui.textarea.val().length;
    return this.ui.textarea.next(".char-counter").text(count);
  },
  addMessage: function(e) {
    e.preventDefault();
    return this.$(".add-message-container").toggleClass("hidden");
  }
});



},{"../../../templates/create/review.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/create/review.hbs","../../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/detail/index.coffee":[function(require,module,exports){

/**
  * View Detail Module
 */
var App, Marionette, moment, msgBus;

moment = require("moment");

Marionette = require("backbone.marionette");

App = require("../../app.coffee");

msgBus = require("../../msgbus.coffee");

module.exports = Marionette.ItemView.extend({
  template: require("../../../templates/detail/index.hbs"),
  events: {
    "click .cancel-all": "cancelAll",
    "click .cancel": "cancel",
    "click .reschedule": "reschedule"
  },
  initialize: function() {
    return msgBus.commands.execute("scroll:top");
  },
  onBeforeRender: function() {
    var date, endTime, meridiemIndicator, shortMonth, startTime, weekDay;
    weekDay = moment(this.model.get("startDate")).format("dddd");
    shortMonth = moment(this.model.get("startDate")).format("MMM");
    date = moment(this.model.get("startDate")).format("DD");
    startTime = moment(this.model.get("startDate")).format("hh:mm");
    endTime = moment(this.model.get("endDate")).format("hh:mm");
    meridiemIndicator = moment(this.model.get("endDate")).format("A");
    this.model.set({
      shortMonth: shortMonth,
      appointmentDate: weekDay + ", " + shortMonth + " " + date,
      appointmentTime: startTime + " - " + endTime + " " + meridiemIndicator
    });
    ({
      cancelAll: function(e) {
        e.preventDefault();
        this.model.set({
          cancelAll: true
        });
        App.navigate("cancel/" + this.model.id);
        return msgBus.reqres.request("schedule:cancel:review", this.model);
      },
      cancel: function(e) {}
    });
    e.preventDefault();
    this.model.set({
      cancelAll: false
    });
    App.navigate("cancel/" + this.model.id);
    msgBus.reqres.request("schedule:cancel:review", this.model);
    ({
      reschedule: function(e) {}
    });
    e.preventDefault();
    App.navigate("update/" + this.model.id);
    return msgBus.reqres.request("schedule:update", this.model.id);
  }
});



},{"../../../templates/detail/index.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/detail/index.hbs","../../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/error.coffee":[function(require,module,exports){

/**
  * View Error Module
 */
var Marionette, msgBus;

Marionette = require("backbone.marionette");

msgBus = require("../msgbus.coffee");

module.exports = Marionette.ItemView.extend({
  className: "error",
  template: require("../../templates/error.hbs"),
  initialize: function() {
    return msgBus.commands.execute("scroll:top");
  }
});



},{"../../templates/error.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/error.hbs","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/filter/trainer.coffee":[function(require,module,exports){

/**
  * Views Filter Trainer Module
 */
var App, Marionette;

Marionette = require("backbone.marionette");

App = require("../../app.coffee");

module.exports = Marionette.ItemView.extend({
  template: require("../../../templates/filter/trainer.hbs"),
  events: {
    "change .select-duration": "selectDuration",
    "change .select-trainer": "selectTrainer"
  },
  onBeforeRender: function() {
    this.model.set({
      defaultTrainer: App.filterCriteria.get("trainerName")
    });
    return this.model.set({
      defaultDuration: App.filterCriteria.get("duration")
    });
  },
  onRender: function() {
    if (_.isEqual(1, _.size(this.model.get("trainers")))) {
      this.ui.selectTrainer.closest("div").hide();
      return this.ui.selectDuration.closest("div").css({
        "float": "none",
        "margin": "0 auto"
      });
    }
  },
  ui: {
    selectDuration: "select.select-duration",
    selectTrainer: "select.select-trainer"
  },
  selectTrainer: function() {
    this.ui.selectTrainer.prev(".option").text($("option:selected", this.ui.selectTrainer).text());
    return App.filterCriteria.set({
      trainerId: $("option:selected", this.ui.selectTrainer).val()
    });
  },
  selectDuration: function() {
    this.ui.selectDuration.prev(".option").text($("option:selected", this.ui.selectDuration).text());
    return App.filterCriteria.set({
      sessionTypeId: $("option:selected", this.ui.selectDuration).val()
    });
  }
});



},{"../../../templates/filter/trainer.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/filter/trainer.hbs","../../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/header.coffee":[function(require,module,exports){

/**
  * Views Header Module
 */
var Marionette;

Marionette = require("backbone.marionette");

module.exports = Marionette.ItemView.extend({
  template: require("../../templates/header.hbs")
});



},{"../../templates/header.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/header.hbs","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/layout.coffee":[function(require,module,exports){

/**
  * Layout Module
 */
var Marionette, _;

Marionette = require("backbone.marionette");

_ = require("underscore");

module.exports = Marionette.Layout.extend({
  template: require("../../templates/layout.hbs"),
  regions: {
    header: ".header",
    filter: ".trainer-filter",
    navigation: ".navigation",
    content: ".content"
  }
});



},{"../../templates/layout.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/layout.hbs","backbone.marionette":"backbone.marionette","underscore":"underscore"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/spinner.coffee":[function(require,module,exports){
var Marionette, Spinner, target;

Marionette = require("backbone.marionette");

Spinner = require("spinner");

module.exports = Marionette.ItemView.extend({
  template: require("../../templates/spinner.hbs"),
  id: "spinner",
  initialize: function(options) {
    options = options || {};
    this.title = options.title || null;
    return this.message = options.message || null;
  },
  serializeData: function() {
    return {
      title: this.title,
      message: this.message
    };
  },
  onShow: function() {
    var opts;
    return opts = {
      lines: 13,
      length: 7,
      width: 2,
      radius: 10,
      corners: 0,
      rotate: 0,
      color: "#000",
      speed: 1,
      trail: 52,
      shadow: false,
      hwaccel: false,
      className: "spinner",
      zIndex: 2e9,
      top: "50%",
      left: "50%"
    };
  }
}, target = document.getElementById(this.el.id), new Spinner(opts).spin(target));



},{"../../templates/spinner.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/spinner.hbs","backbone.marionette":"backbone.marionette","spinner":"spinner"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/update/confirmation.coffee":[function(require,module,exports){

/**
  * View Update Confirmation Module
 */
var App, Marionette, msgBus;

Marionette = require("backbone.marionette");

App = require("../../app.coffee");

msgBus = require("../../msgbus.coffee");

module.exports = Marionette.ItemView.extend({
  template: require("../../../templates/update/confirmation.hbs"),
  initialize: function() {
    return msgBus.commands.execute("scroll:top");
  },
  events: {
    "click .cancel": "cancelAppointment"
  },
  cancelAppointment: function(e) {
    e.preventDefault();
    App.navigate("cancel/" + this.options.original.id, {
      trigger: false
    });
    return msgBus.reqres.request("schedule:cancel", this.options.original.id);
  }
});



},{"../../../templates/update/confirmation.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/update/confirmation.hbs","../../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/update/review.coffee":[function(require,module,exports){

/**
  * View Update Review Module
 */
var App, Marionette, moment, msgBus;

Marionette = require("backbone.marionette");

moment = require("moment");

App = require("../../app.coffee");

msgBus = require("../../msgbus.coffee");

module.exports = Marionette.ItemView.extend({
  template: require("../../../templates/update/review.hbs"),
  events: {
    "click .schedule": "schedule",
    "click .update": "update",
    "click .add-message": "addMessage",
    "keyup textarea": "countLimit"
  },
  initialize: function() {
    return msgBus.commands.execute("scroll:top");
  },
  ui: {
    textarea: "textarea"
  },
  onBeforeRender: function() {
    var date, endTime, meridiemIndicator, originalDate, originalEndTime, originalMeridiemIndicator, originalShortMonth, originalStartTime, originalWeekDay, shortMonth, startTime, weekDay;
    weekDay = moment(this.model.get("startDate")).format("dddd");
    shortMonth = moment(this.model.get("startDate")).format("MMM");
    date = moment(this.model.get("startDate")).format("DD");
    startTime = moment(this.model.get("startDate")).format("hh:mm");
    endTime = moment(this.model.get("endDate")).format("hh:mm");
    meridiemIndicator = moment(this.model.get("endDate")).format("A");
    originalWeekDay = moment(this.options.original.get("startDate")).format("dddd");
    originalShortMonth = moment(this.options.original.get("startDate")).format("MMM");
    originalDate = moment(this.options.original.get("startDate")).format("DD");
    originalStartTime = moment(this.options.original.get("startDate")).format("hh:mm");
    originalEndTime = moment(this.options.original.get("endDate")).format("hh:mm");
    originalMeridiemIndicator = moment(this.options.original.get("endDate")).format("A");
    this.model.set({
      shortMonth: shortMonth,
      appointmentDate: weekDay + ", " + shortMonth + " " + date,
      appointmentTime: startTime + " - " + endTime + " " + meridiemIndicator,
      originalShortMonth: originalShortMonth,
      originalAppointmentDate: originalWeekDay + ", " + originalShortMonth + " " + originalDate,
      originalAppointmentTime: originalStartTime + " - " + originalEndTime + " " + originalMeridiemIndicator
    });
    return {
      schedule: function(e) {
        e.preventDefault();
        if (!_.isEmpty(this.ui.textarea.val())) {
          this.model.set({
            message: this.ui.textarea.val()
          });
        }
        return msgBus.reqres.request("schedule:update:confirmation", this.model);
      },
      update: function(e) {
        e.preventDefault();
        App.navigate("update/" + this.options.original.id, {
          trigger: false
        });
        return msgBus.reqres.request("schedule:update", this.options.original.id);
      },
      countLimit: function(e) {
        var count;
        e.preventDefault();
        count = 300 - this.ui.textarea.val().length;
        return this.ui.textarea.next(".char-counter").text(count);
      },
      addMessage: function(e) {
        e.preventDefault();
        return this.$(".add-message-container").toggleClass("hidden");
      }
    };
  }
});



},{"../../../templates/update/review.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/update/review.hbs","../../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/empty_item.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"wrapper reserved\">\n    <p><strong>Reserved</strong></p>\n</div>\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/header_item.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div>\n    <p><%= date %></p>\n    <span><%= month %> <%= day %></span>\n</div>\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/index.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"appointments-list\">\n    <div class=\"appointments-header is-desktop is-tablet\"></div>\n\n    <div class=\"appointments-container active\">\n        <a href=\"#\" class=\"toggle-day is-desktop is-tablet\">Morning <span class=\"icon-dropdown\"></span></a>\n        <div class=\"morning\"></div>\n    </div>\n\n    <div class=\"appointments-container active\">\n        <a href=\"#\" class=\"toggle-day is-desktop is-tablet\">Afternoon <span class=\"icon-dropdown\"></span></a>\n        <div class=\"afternoon\"></div>\n    </div>\n\n    <div class=\"appointments-container active\">\n        <a href=\"#\" class=\"toggle-day is-desktop is-tablet\">Evening <span class=\"icon-dropdown\"></span></a>\n        <div class=\"evening\"></div>\n    </div>\n</div>\n\n<section class=\"paragraph\">\n    <p>Can't find a desired time to work out with your trainer?</p>\n    <p>Please contact them directly.</p>\n</section>\n\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/item.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"wrapper <%= className %>\" data-id=\"<%= cid %>\">\n    <p><strong><%= appointment %></strong></p>\n    <p><%= trainerFirstName %> <%= trainerLastName %></p>\n    <p><%= facilityName %></p>\n    <% scheduled && print('<p>Your reservation</p>') %>\n    <% !scheduled && print('<div class=\"add-appointment\"><div class=\"add\">+</div></div>') %>\n</div>";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/navigation.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"calendar-list-container\">\n    <div class=\"nav-arrows\">\n        <a href=\"#\" class=\"icon-left-arrow\"></a>\n        <a href=\"#\" class=\"icon-right-arrow\"></a>\n        <div class=\"current-week is-mobile\"></div>\n    </div>\n\n    <div class=\"is-desktop is-tablet\">\n        <ul></ul>\n    </div>\n\n    <div class=\"is-mobile\">\n        <ul></ul>\n    </div>\n</div>";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/navigation_item.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<a href=\"#\" data-date=\"<%= dataDate %>\" class=\"<%= current %>\">\n    <p class=\"is-tablet is-desktop\"><%= date %></p>\n    <p class=\"is-mobile\"><%= dateShort %></p>\n    <small class=\"is-tablet is-desktop\"><%= month %> <%= day %></small>\n</a>\n<div class=\"classes-timeline\"></div>\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/cancel/confirmation.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<section class=\"class-module no-padding-bottom\">\n    <h3>you're all set.</h3>\n\n    <p>your trainer has been notified of the cancellation</p>\n\n    <nav class=\"buttons\">\n        <a href=\"/personal-training/schedule\" class=\"button black small inline box half-button\">Schedule Session</a>\n    </nav>\n    <p>\n        <a href=\"/calendar\" class=\"underlined-small-link black\">see my calendar</a>\n    </p>\n</section>";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/cancel/index.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<section class=\"class-module no-padding-bottom\">\n    <h3 class=\"tier\"><%= trainerTier %></h3>\n\n    <ul class=\"class-detail\">\n        <li class=\"big-font\"><%= appointmentDate %></li>\n        <li class=\"big-font\"><%= appointmentTime %></li>\n        <li class=\"medium-font\">Personal Training</li>\n        <li class=\"medium-font\">w/<%= trainerFirstName %></li>\n        <li class=\"medium-font\"><%= facilityName %></li>\n    </ul>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <% _.each(notes, function(note){ %>\n    <p><%= note %></p>\n    <% }); %>\n\n    <p>Please confirm the details and cancel your session</p>\n\n    <nav class=\"buttons\">\n        <% canCancelAll && print('<a href=\"#\" class=\"button white small half-button box cancel-all\">Cancel all Sessions</a>') %>\n        <a href=\"#\" class=\"button black small half-button box inline cancel\">Cancel this Session</a>\n    </nav>\n\n    <nav class=\"buttons\">\n        <a href=\"#\" class=\"underlined-small-link black update\">reschedule this session</a><br>\n        <a href=\"/personal-training\" class=\"underlined-small-link black\">Back</a>\n    </nav>\n</section>\n\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/cancel/review.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<section class=\"class-module no-padding-bottom\">\n    <h1 class=\"title\">Are you Sure?</h1>\n    <p><% warningMessage && print(warningMessage); %></p>\n\n    <h3 class=\"tier\"><%= trainerTier %></h3>\n\n    <ul class=\"class-detail\">\n        <li class=\"big-font\"><%= appointmentDate %></li>\n        <li class=\"big-font\"><%= appointmentTime %></li>\n        <li class=\"medium-font\">Personal Training</li>\n        <li class=\"medium-font\">w/<%= trainerFirstName %></li>\n        <li class=\"medium-font\"><%= facilityName %></li>\n    </ul>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <% _.each(notes, function(note){ %>\n    <p><%= note %></p>\n    <% }); %>\n\n\n    <a href=\"#\" class=\"underlined-small-link black add-message\">attach a message</a>\n\n    <div class=\"add-message-container hidden\">\n        <textarea maxlength=\"300\" style=\"resize: none;\"></textarea>\n\n        <div class=\"char-counter\">300</div>\n    </div>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <nav class=\"buttons\">\n        <% cancelAll && print('<a href=\"#\" class=\"button white small half-button box inline cancel\">Cancel all Sessions</a>')%>\n        <% !cancelAll && print('<a href=\"#\" class=\"button black small half-button box inline cancel\">Cancel this Session</a>')%>\n    </nav>\n    <p>\n        <a href=\"/personal-training\" class=\"underlined-small-link black\">Back</a>\n    </p>\n</section>\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/create/confirmation.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<section class=\"class-module no-padding-bottom\">\n    <h3 class=\"tier\"><%= trainerTier %></h3>\n\n    <ul class=\"class-detail\">\n        <li class=\"big-font\"><%= appointmentDate %></li>\n        <li class=\"big-font\"><%= appointmentTime %></li>\n        <li class=\"medium-font\">Personal Training</li>\n        <li class=\"medium-font\">w/<%= trainerFirstName %></li>\n        <li class=\"medium-font\"><%= facilityName %></li>\n    </ul>\n\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <p>your calendar is updated and your trainer has been notified</p>\n\n    <div class=\"export\">\n        <a target=\"_blank\" class=\"export\" href=\"<%= APIEndpoint %>/ME/CALENDAR/EVENTS/<%= id %>/EXPORT/ICS?exportType=AppointmentInstance\">\n            <span class=\"icon-export\"></span>Export to calendar\n        </a>\n    </div>\n\n    <nav class=\"buttons\" data-id=\"<%= id %>\">\n        <a href=\"#\" class=\"underlined-small-link black cancel\">cancel session</a>\n    </nav>\n</section>\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/create/review.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<section class=\"class-module no-padding-bottom\">\n    <h3 class=\"tier\"><%= trainerTier %></h3>\n\n    <ul class=\"class-detail\">\n        <li class=\"big-font\"><%= appointmentDate %></li>\n        <li class=\"big-font\"><%= appointmentTime %></li>\n        <li class=\"medium-font\">Personal Training</li>\n        <li class=\"medium-font\">w/<%= trainerFirstName %></li>\n        <li class=\"medium-font\"><%= facilityName %></li>\n    </ul>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <a href=\"#\" class=\"underlined-small-link black add-message\">attach a message</a>\n\n    <div class=\"add-message-container hidden\">\n        <textarea maxlength=\"300\" style=\"resize: none;\"></textarea>\n\n        <div class=\"char-counter\">300</div>\n    </div>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <nav class=\"buttons\">\n        <a href=\"#\" class=\"button black small box inline half-button schedule\">Schedule Session</a>\n    </nav>\n    <a href=\"/\" class=\"underlined-small-link black\">cancel</a>\n</section>";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/detail/index.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<section class=\"class-module no-padding-bottom\">\n    <h3 class=\"tier\"><%= trainerTier %></h3>\n\n    <ul class=\"class-detail\">\n        <li class=\"big-font\"><%= appointmentDate %></li>\n        <li class=\"big-font\"><%= appointmentTime %></li>\n        <li class=\"medium-font\">Personal Training</li>\n        <li class=\"medium-font\">w/<%= trainerFirstName %></li>\n        <li class=\"medium-font\"><%= facilityName %></li>\n    </ul>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <% _.each(notes, function(note){ %>\n    <p><%= note %></p>\n    <% }); %>\n\n<% if(canCancel) { %>\n    <p>Please confirm the details and cancel your session</p>\n\n    <nav class=\"buttons\">\n        <% canCancelAll && print('<a href=\"#\" class=\"button white small half-button box cancel-all\">Cancel all Sessions</a>') %>\n        <a href=\"#\" class=\"button black small inline half-button box cancel\">Cancel this Session</a>\n    </nav>\n\n    <nav class=\"buttons\">\n        <% canReschedule && print('<a href=\"/personal-training/schedule#update/' + id + '\" class=\"underlined-small-link black reschedule\">reschedule this session</a><br>') %>\n        <a href=\"/personal-training\" class=\"underlined-small-link black\">Back</a>\n    </nav>\n<% } %>\n</section>\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/error.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"class-module no-padding-bottom no-border-top\">\n    <h2 class=\"title\"><%= message %></h2>\n    <!--<p>Code: <%= code %></p>-->\n    <!--<p><%= exception %></p>-->\n</div>\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/filter/trainer.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<form class=\"large white\">\n    <fieldset>\n        <div>\n            <span class=\"dropdown block white\">\n                <span class=\"option\"><%= defaultTrainer %></span>\n                <select id=\"select-trainer\" class=\"select-trainer\" name=\"trainer\">\n                    <% _.each(trainers, function(item){ %>\n                        <option value=\"<%= item.trainerId %>\"><%= item.trainerFirstName %> <%= item.trainerLastName %></option>\n                    <% }); %>\n                </select>\n            </span>\n        </div>\n        <div>\n            <span class=\"dropdown block white\">\n                <span class=\"option\"><%= defaultDuration %></span>\n                <select id=\"select-duration\" class=\"select-duration\" name=\"duration\">\n                    <% _.each(durations, function(item){ %>\n                    <option value=\"<%= item.sessionTypeId %>\"><%= item.duration %></option>\n                    <% }); %>\n                </select>\n            </span>\n        </div>\n    </fieldset>\n</form>\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/header.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<h1>"
    + escapeExpression(((helper = (helper = helpers.pageTitle || (depth0 != null ? depth0.pageTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"pageTitle","hash":{},"data":data}) : helper)))
    + "</h1>\n<div class=\"sub-header\">\n    <a href=\"/personal-training/rules\">see rules</a>\n</div>\n<% subTitle && print('<h3 class=\"title\">' + subTitle + '</h3>') %>\n\n\n\n";
},"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/layout.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<header class=\"header\"></header>\n<div class=\"trainer-filter\"></div>\n<div class=\"navigation\"></div>\n<div class=\"content\"></div>\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/spinner.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<!-- empty view -->\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/update/confirmation.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<section class=\"class-module no-padding-bottom\">\n    <h3 class=\"tier\"><%= trainerTier %></h3>\n\n    <ul class=\"class-detail\">\n        <li class=\"big-font\"><%= appointmentDate %></li>\n        <li class=\"big-font\"><%= appointmentTime %></li>\n        <li class=\"medium-font\">Personal Training</li>\n        <li class=\"medium-font\">w/<%= trainerFirstName %></li>\n        <li class=\"medium-font\"><%= facilityName %></li>\n    </ul>\n\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <p>your calendar is updated and your trainer has been notified</p>\n\n    <div class=\"export\">\n        <a target=\"_blank\" class=\"export\" href=\"<%= APIEndpoint %>/ME/CALENDAR/EVENTS/<%= id %>/EXPORT/ICS?exportType=AppointmentInstance\">\n            <span class=\"icon-export\"></span>Export to calendar\n        </a>\n    </div>\n\n    <nav class=\"buttons\" data-id=\"<%= id %>\">\n        <a href=\"#\" class=\"underlined-small-link black cancel\">cancel\n            session</a>\n    </nav>\n</section>\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/update/review.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<section class=\"class-module no-padding-bottom\">\n    <div class=\"original\">\n        <h4>original:</h4>\n        <ul class=\"class-detail\">\n            <li class=\"medium-font\"><%= originalAppointmentDate %></li>\n            <li class=\"medium-font\"><%= originalAppointmentTime %></li>\n        </ul>\n    </div>\n\n    <div>\n        <h4>new:</h4>\n        <h3 class=\"tier\"><%= trainerTier %></h3>\n        <div>Personal Training</div>\n        <ul class=\"class-detail\">\n            <li class=\"big-font\"><%= appointmentDate %></li>\n            <li class=\"big-font\"><%= appointmentTime %></li>\n            <li class=\"medium-font\">w/<%= trainerFirstName %></li>\n            <li class=\"medium-font\"><%= facilityName %></li>\n        </ul>\n    </div>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <a href=\"#\" class=\"underlined-small-link black add-message\">attach a message</a>\n\n    <div class=\"add-message-container hidden\">\n        <textarea maxlength=\"300\" style=\"resize: none;\"></textarea>\n\n        <div class=\"char-counter\">300</div>\n    </div>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <nav class=\"buttons\">\n        <a href=\"\" class=\"button white small half-button box update\">Edit Session</a>\n        <a href=\"\" class=\"button black small half-button box schedule\">Schedule Session</a>\n    </nav>\n    <a href=\"/personal-training/schedule\" class=\"underlined-small-link black\">Back</a>\n</section>\n\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars.runtime.js":[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var base = require("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = require("./handlebars/safe-string")["default"];
var Exception = require("./handlebars/exception")["default"];
var Utils = require("./handlebars/utils");
var runtime = require("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

Handlebars['default'] = Handlebars;

exports["default"] = Handlebars;
},{"./handlebars/base":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/base.js","./handlebars/exception":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/exception.js","./handlebars/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/runtime.js","./handlebars/safe-string":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/safe-string.js","./handlebars/utils":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/utils.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/base.js":[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];

var VERSION = "2.0.0";
exports.VERSION = VERSION;var COMPILER_REVISION = 6;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn) {
    if (toString.call(name) === objectType) {
      if (fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function(name) {
    delete this.helpers[name];
  },

  registerPartial: function(name, partial) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function(name) {
    delete this.partials[name];
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(/* [args, ]options */) {
    if(arguments.length === 1) {
      // A missing field in a {{foo}} constuct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new Exception("Missing helper: '" + arguments[arguments.length-1].name + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
        options = {data: data};
      }

      return fn(context, options);
    }
  });

  instance.registerHelper('each', function(context, options) {
    if (!options) {
      throw new Exception('Must pass iterator to #each');
    }

    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    var contextPath;
    if (options.data && options.ids) {
      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last  = (i === (context.length-1));

            if (contextPath) {
              data.contextPath = contextPath + i;
            }
          }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) {
              data.key = key;
              data.index = i;
              data.first = (i === 0);

              if (contextPath) {
                data.contextPath = contextPath + key;
              }
            }
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    var fn = options.fn;

    if (!Utils.isEmpty(context)) {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
        options = {data:data};
      }

      return fn(context, options);
    } else {
      return options.inverse(this);
    }
  });

  instance.registerHelper('log', function(message, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, message);
  });

  instance.registerHelper('lookup', function(obj, field) {
    return obj && obj[field];
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 3,

  // can be overridden in the host environment
  log: function(level, message) {
    if (logger.level <= level) {
      var method = logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, message);
      }
    }
  }
};
exports.logger = logger;
var log = logger.log;
exports.log = log;
var createFrame = function(object) {
  var frame = Utils.extend({}, object);
  frame._parent = object;
  return frame;
};
exports.createFrame = createFrame;
},{"./exception":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/exception.js","./utils":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/utils.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/exception.js":[function(require,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var line;
  if (node && node.firstLine) {
    line = node.firstLine;

    message += ' - ' + line + ':' + node.firstColumn;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (line) {
    this.lineNumber = line;
    this.column = node.firstColumn;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/runtime.js":[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];
var COMPILER_REVISION = require("./base").COMPILER_REVISION;
var REVISION_CHANGES = require("./base").REVISION_CHANGES;
var createFrame = require("./base").createFrame;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new Exception("No environment passed to template");
  }
  if (!templateSpec || !templateSpec.main) {
    throw new Exception('Unknown template object: ' + typeof templateSpec);
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  var invokePartialWrapper = function(partial, indent, name, context, hash, helpers, partials, data, depths) {
    if (hash) {
      context = Utils.extend({}, context, hash);
    }

    var result = env.VM.invokePartial.call(this, partial, name, context, helpers, partials, data, depths);

    if (result == null && env.compile) {
      var options = { helpers: helpers, partials: partials, data: data, depths: depths };
      partials[name] = env.compile(partial, { data: data !== undefined, compat: templateSpec.compat }, env);
      result = partials[name](context, options);
    }
    if (result != null) {
      if (indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    lookup: function(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function(i) {
      return templateSpec[i];
    },

    programs: [],
    program: function(i, data, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths) {
        programWrapper = program(this, i, fn, data, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(this, i, fn);
      }
      return programWrapper;
    },

    data: function(data, depth) {
      while (data && depth--) {
        data = data._parent;
      }
      return data;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = Utils.extend({}, common, param);
      }

      return ret;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  var ret = function(context, options) {
    options = options || {};
    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths;
    if (templateSpec.useDepths) {
      depths = options.depths ? [context].concat(options.depths) : [context];
    }

    return templateSpec.main.call(container, context, container.helpers, container.partials, data, depths);
  };
  ret.isTop = true;

  ret._setup = function(options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
    }
  };

  ret._child = function(i, data, depths) {
    if (templateSpec.useDepths && !depths) {
      throw new Exception('must pass parent depths');
    }

    return program(container, i, templateSpec[i], data, depths);
  };
  return ret;
}

exports.template = template;function program(container, i, fn, data, depths) {
  var prog = function(context, options) {
    options = options || {};

    return fn.call(container, context, container.helpers, container.partials, options.data || data, depths && [context].concat(depths));
  };
  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  return prog;
}

exports.program = program;function invokePartial(partial, name, context, helpers, partials, data, depths) {
  var options = { partial: true, helpers: helpers, partials: partials, data: data, depths: depths };

  if(partial === undefined) {
    throw new Exception("The partial " + name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? createFrame(data) : {};
    data.root = context;
  }
  return data;
}
},{"./base":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/base.js","./exception":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/exception.js","./utils":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/utils.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/safe-string.js":[function(require,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/utils.js":[function(require,module,exports){
"use strict";
/*jshint -W004 */
var SafeString = require("./safe-string")["default"];

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
/* istanbul ignore next */
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;

function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string instanceof SafeString) {
    return string.toString();
  } else if (string == null) {
    return "";
  } else if (!string) {
    return string + '';
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

exports.appendContextPath = appendContextPath;
},{"./safe-string":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/safe-string.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/runtime.js":[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime');

},{"./dist/cjs/handlebars.runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars.runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js":[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/runtime.js"}]},{},["/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/main.coffee"]);
