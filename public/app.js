(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee":[function(require,module,exports){

/**
  * app Module
 */
var $, Backbone, FilterCriteriaModel, Layout, Marionette, Router, app, msgBus, _;

$ = require("jquery");

_ = require("underscore");

Backbone = require("backbone");

Backbone.$ = $;

Marionette = require("backbone.marionette");

Layout = require("./views/layout.coffee");

Router = require("./router.coffee");

msgBus = require("./msgbus.coffee");

FilterCriteriaModel = require("./entities/criteria.coffee");

app = new Marionette.Application;

app.addRegions({
  mainRegion: "#app-main"
});

app.layout = new Layout;

app.mainRegion.show(app.layout);

app.filterCriteria = new FilterCriteriaModel;


/**
 * @param route
 * @param {object} options
 */

app.navigate = function(route, options) {
  if (options == null) {
    options = {};
  }
  return Backbone.history.navigate(route, options);
};

app.on("initialize:before", function(options) {
  if (options == null) {
    options = {};
  }
  return console.log("init:before", options);
});

app.on("initialize:after", function() {
  return app.filterCriteria.set({
    sessionTypeId: app.scheduleCriteria.durations[0].sessionTypeId,
    duration: app.scheduleCriteria.durations[0].duration,
    trainerId: app.scheduleCriteria.trainers[0].trainerId,
    trainerName: app.scheduleCriteria.trainers[0].trainerFirstName + " " + app.scheduleCriteria.trainers[0].trainerLastName,
    silent: true
  });
});

app.addInitializer(function(options) {
  _.extend(app, options, {
    appstate: null
  });
  new Router();
  return Backbone.history.start({
    pushState: true,
    root: "/personal-training/schedule"
  });
});

window.app = app;

module.exports = app;



},{"./entities/criteria.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/criteria.coffee","./msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","./router.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/router.coffee","./views/layout.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/layout.coffee","backbone":"backbone","backbone.marionette":"backbone.marionette","jquery":"jquery","underscore":"underscore"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/components/utils.coffee":[function(require,module,exports){

/**
* Utils Module
*
* Useful utilities we will use throughout the app
*
* @name Utils
* @class Utils
 */
var Utils, moment;

moment = require("moment");

Utils = (function() {
  function Utils() {
    this.STARTDATE = moment().add("days", 1).format("YYYY-MM-DD");
    this.ENDDATE = moment().add("days", 30).format("YYYY-MM-DD");
    this.TOMORROW = moment().add("days", 1).format("YYYY-MM-DD");
  }

  Utils.prototype.isValidDate = function(date) {
    var isAfter, isBefore, isEnd, isStart;
    isAfter = moment(date).isAfter(this.STARTDATE);
    isBefore = moment(date).isBefore(this.ENDDATE);
    isStart = moment(date).isSame(this.STARTDATE);
    isEnd = moment(date).isSame(this.ENDDATE);

    /*
      console.log 'Attr: date', date
      console.log 'isAfter ', moment(date).isAfter @STARTDATE
      console.log 'isBefore ', moment(date).isBefore @ENDDATE
      console.log 'isSame as Start ', moment(date).isSame @STARTDATE
      console.log 'isSame as End ', moment(date).isSame @ENDDATE
      console.log 'Return', (isAfter && isBefore) || (isStart || isEnd)
     */
    return (isAfter && isBefore) || (isStart || isEnd);
  };

  return Utils;

})();

module.exports = Utils;



},{"moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/_base-controller.coffee":[function(require,module,exports){

/**
 * _Base Controller Module
 */
var $, Controller, Marionette,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$ = require("jquery");

Marionette = require("backbone.marionette");

Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }


  /**
  * render index page for schedule appointment flow
  * @param {string} [date] - date in 2014-05-31 format
   */

  Controller.prototype.create = function(date) {
    Controller = require("./create.coffee");
    return new Controller().index(date);
  };


  /**
   * render review page for schedule appointment flow
   * @param {object} appointment - Selected appointment model
   */

  Controller.prototype.createReview = function(appointment) {
    Controller = require("./create.coffee");
    return new Controller().review(appointment);
  };


  /**
   * render confirmation page for schedule appointment flow
   * @param {object} appointment - Selected appointment model
   */

  Controller.prototype.createConfirmation = function(appointment) {
    Controller = require("./create.coffee");
    return new Controller().confirmation(appointment);
  };


  /**
  * Create header component
  * @param {object} options - Options object
   */

  Controller.prototype.header = function(options) {
    Controller = require("./header.coffee");
    return new Controller().init(options);
  };


  /**
   * Create filter component, filter by Trainer and Duration
   */

  Controller.prototype.trainerFilter = function() {
    Controller = require("./trainer.coffee");
    return new Controller().init();
  };


  /**
  * Create calendar navigation component
  * @param {object} options - Options object
   */

  Controller.prototype.navigation = function(options) {
    Controller = require("./calendar-navigation.coffee");
    return new Controller(options).index(options);
  };


  /**
   * render calendar component
   */

  Controller.prototype.calendar = function() {
    Controller = require("./calendar.coffee");
    return new Controller().index();
  };


  /**
  * render index page for cancel appointment flow
  * @param {id} id - appointment ID
   */

  Controller.prototype.cancel = function(id) {
    Controller = require("./cancel.coffee");
    return new Controller().index(id);
  };


  /**
  * render index page for update appointment flow
  * @param {string} id - Selected appointment ID
   */

  Controller.prototype.update = function(id) {
    Controller = require("./update.coffee");
    return new Controller().index(id);
  };


  /**
  * render review page for update appointment flow
  * @param {object} appointment - Selected appointment model
   */

  Controller.prototype.updateReview = function(appointment) {
    Controller = require("./update.coffee");
    return new Controller().review(appointment);
  };


  /**
  * render confirmation page for update appointment flow
  * @param {object} appointment - Selected appointment model
   */

  Controller.prototype.updateConfirmation = function(appointment) {
    Controller = require("./update.coffee");
    return new Controller().confirmation(appointment);
  };


  /**
  * render index page for detail appointment flow
  * @param {string} id - Selected appointment ID
   */

  Controller.prototype.detail = function(id) {
    Controller = require("./detail.coffee");
    return new Controller().index(id);
  };


  /**
  * Render an error page
  * @param {object} options - Options object
   */

  Controller.prototype.error = function(options) {
    Controller = require("./error.coffee");
    return new Controller(options).init(options);
  };


  /**
  *   Scroll page to the top.
  *   TODO: move to helper file or marionette behavior
   */

  Controller.prototype.scroll = function() {
    $(document).scrollTop(0);
    return $("#app-main").css({
      opacity: 0
    }).animate({
      opacity: 1
    }, 600);
  };


  /**
  *   Route to default page. Full app reload
   */

  Controller.prototype.defaultPage = function() {
    return Backbone.history.navigate("", {
      trigger: true
    });
  };

  return Controller;

})(Marionette.Controller);

module.exports = Controller;



},{"./calendar-navigation.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/calendar-navigation.coffee","./calendar.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/calendar.coffee","./cancel.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/cancel.coffee","./create.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/create.coffee","./detail.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/detail.coffee","./error.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/error.coffee","./header.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/header.coffee","./trainer.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/trainer.coffee","./update.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/update.coffee","backbone.marionette":"backbone.marionette","jquery":"jquery"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/calendar-navigation.coffee":[function(require,module,exports){

/**
  * Controller Calendar Navigation Module
 */
var Backbone, Controller, Marionette, Model, View, app, collection, createCollection, moment,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require("backbone");

Marionette = require("backbone.marionette");

moment = require("moment");

app = require("../app.coffee");

View = require("../views/calendar-navigation.coffee");

Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  return Model;

})(Backbone.Model);

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

Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.index = function(options) {
    collection.reset();
    collection = createCollection(options.startDate);
    return app.layout.navigation.show(new View({
      collection: collection
    }));
  };

  return Controller;

})(Marionette.Controller);

module.exports = Controller;



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../views/calendar-navigation.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/calendar-navigation.coffee","backbone":"backbone","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/calendar.coffee":[function(require,module,exports){

/**
  * Controller Calendar Module
 */
var Appointments, Backbone, Controller, Marionette, Model, View, app, daysHeader, getDates, moment, msgBus,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require("backbone");

Marionette = require("backbone.marionette");

moment = require("moment");

app = require("../app.coffee");

msgBus = require("../msgbus.coffee");

View = require("../views/calendar.coffee");

Appointments = require("../entities/appointments.coffee");

Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  return Model;

})(Backbone.Model);

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

Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.index = function() {
    var date, promise;
    date = app.filterCriteria.get("startDate");
    promise = msgBus.reqres.request("entities:appointments", date);
    promise.done(function(appointments) {
      daysHeader.reset();
      daysHeader = getDates(date);
      module.exports = new View({
        appointments: appointments,
        dates: daysHeader
      });
    });
    return promise.fail(function(model, jqXHR, textStatus) {
      return msgBus.reqres.request("error", {
        error: [model, jqXHR, textStatus]
      });
    });
  };

  return Controller;

})(Marionette.Controller);

module.exports = Controller;



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../entities/appointments.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/appointments.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/calendar.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/calendar.coffee","backbone":"backbone","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/cancel.coffee":[function(require,module,exports){

/**
  * Controller Cancel Module
 */
var CancelView, ConfirmationView, Marionette, ReviewView, app, msgBus, view;

Marionette = require("backbone.marionette");

app = require("../app.coffee");

msgBus = require("../msgbus.coffee");

CancelView = require("../views/cancel/index.coffee");

ReviewView = require("../views/cancel/review.coffee");

ConfirmationView = require("../views/cancel/confirmation.coffee");

require("../entities/appointment.coffee");

view = null;

app.flow = "cancel";

module.exports = Marionette.Controller.extend({
  index: function(id) {
    var promise;
    msgBus.reqres.request("header:region", {
      pageTitle: "Cancel your session"
    });
    promise = msgBus.reqres.request("entities:appointment", id);
    promise.done(function(appointment) {
      view = new CancelView({
        model: appointment
      });
      app.layout.content.show(view);
      return app.analytics.set({
        action: "delete-start"
      });
    });
    return promise.fail(function(model, jqXHR, textStatus) {
      return msgBus.reqres.request("error", {
        error: [model, jqXHR, textStatus]
      });
    });
  },
  review: function(appointment) {
    msgBus.reqres.request("header:region", {
      pageTitle: "Cancel your session"
    });
    view = new ReviewView({
      model: appointment
    });
    app.layout.content.show(view);
    return app.analytics.set({
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
          APIEndpoint: app.APIEndpoint
        });
        msgBus.reqres.request("header:region", {
          pageTitle: "Your session is canceled"
        });
        view = new ConfirmationView({
          model: appointment
        });
        app.layout.content.show(view);
        return app.analytics.set({
          action: "delete-complete"
        });
      });
      return promise.fail(function(response) {
        return msgBus.reqres.request("error", response.responseJSON);
      });
    });
  }
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../entities/appointment.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/appointment.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/cancel/confirmation.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/cancel/confirmation.coffee","../views/cancel/index.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/cancel/index.coffee","../views/cancel/review.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/cancel/review.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/create.coffee":[function(require,module,exports){

/**
  * Controller Create Module
 */
var ConfirmationView, Controller, Marionette, ReviewView, Utils, app, msgBus, utils, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require("underscore");

Marionette = require("backbone.marionette");

msgBus = require("../msgbus.coffee");

Utils = require("../components/utils.coffee");

app = require("../app.coffee");

require("../entities/create.coffee");

ReviewView = require("../views/create/review.coffee");

ConfirmationView = require("../views/create/confirmation.coffee");

utils = new Utils;

Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.index = function(date) {
    date = utils.isValidDate(date) ? date : utils.TOMORROW;
    msgBus.reqres.request("header:region", {
      pageTitle: "Schedule Training"
    });
    msgBus.reqres.request("trainer:filter");
    msgBus.reqres.request("calendar:navigation", {
      startDate: date
    });
    return app.filterCriteria.set({
      startDate: date
    });
  };

  Controller.prototype.review = function(appointment) {
    var view;
    msgBus.reqres.request("header:region", {
      pageTitle: "Review your session"
    });
    view = new ReviewView({
      model: appointment
    });
    return app.layout.content.show(view);
  };

  Controller.prototype.confirmation = function(appointment) {
    var data, promise;
    data = _.pick(appointment.toJSON(), "id", "sessionTypeId", "trainerId", "startDate", "endDate", "message");
    promise = msgBus.reqres.request("entities:create:appointment", data);
    promise.done(function(response) {
      var view;
      appointment.set({
        id: response.id,
        APIEndpoint: app.APIEndpoint
      });
      msgBus.reqres.request("header:region", {
        pageTitle: "Enjoy your workout."
      });
      view = new ConfirmationView({
        model: appointment
      });
      return app.layout.content.show(view);
    });
    return promise.fail(function(response) {
      return msgBus.reqres.request("error", response.responseJSON);
    });
  };

  return Controller;

})(Marionette.Controller);

module.exports = Controller;



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../components/utils.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/components/utils.coffee","../entities/create.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/create.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/create/confirmation.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/create/confirmation.coffee","../views/create/review.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/create/review.coffee","backbone.marionette":"backbone.marionette","underscore":"underscore"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/detail.coffee":[function(require,module,exports){

/**
  * Controller Detail Module
 */
var Controller, Marionette, View, app, msgBus, view,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Marionette = require("backbone.marionette");

app = require("../app.coffee");

msgBus = require("../msgbus.coffee");

View = require("../views/detail/index.coffee");

require("../entities/appointment.coffee");

view = null;

app.flow = "detail";

Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.index = function(id) {
    var promise;
    msgBus.reqres.request("header:region", {
      pageTitle: "Session Detail"
    });
    promise = msgBus.reqres.request("entities:appointment", id);
    promise.done(function(appointment) {
      view = new View({
        model: appointment
      });
      return app.layout.content.show(view);
    });
    return promise.fail(function(model, jqXHR, textStatus) {
      return msgBus.reqres.request("error", {
        error: [model, jqXHR, textStatus]
      });
    });
  };

  return Controller;

})(Marionette.Controller);

module.exports = Controller;



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../entities/appointment.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/appointment.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/detail/index.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/detail/index.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/error.coffee":[function(require,module,exports){

/**
  * Controller Error Module
 */
var Controller, Marionette, Model, View, app, model, msgBus,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Marionette = require("backbone.marionette");

app = require("../app.coffee");

msgBus = require("../msgbus.coffee");

Model = require("../entities/error.coffee");

View = require("../views/error.coffee");

model = new Model;

Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.init = function(options) {
    msgBus.reqres.request("header:region", {
      pageTitle: "Error",
      subTitle: null
    });
    app.layout.filter.close();
    app.layout.navigation.close();
    model.set(options.error);
    return app.layout.content.show(new View({
      model: model
    }));
  };

  module.exports = Controller;

  return Controller;

})(Marionette.Controller);



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../entities/error.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/error.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/error.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/error.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/header.coffee":[function(require,module,exports){

/**
  * Controller Header Module
 */
var Controller, Marionette, Model, View, app, model, view,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Marionette = require("backbone.marionette");

app = require("../app.coffee");

Model = require("../entities/header.coffee");

View = require("../views/header.coffee");

model = new Model;

view = new View({
  model: model
});

Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.init = function(options) {
    model.set(options);
    return app.layout.header.show(view);
  };

  return Controller;

})(Marionette.Controller);

module.exports = Controller;



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../entities/header.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/header.coffee","../views/header.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/header.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/trainer.coffee":[function(require,module,exports){

/**
  * Controller Trainer Module
 */
var Backbone, Controller, Marionette, Model, View, app, model, view,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Marionette = require("backbone.marionette");

Backbone = require("backbone");

app = require("../app.coffee");

View = require("../views/filter/trainer.coffee");

Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  Model.prototype.defaults = {
    durations: null,
    trainers: null
  };

  return Model;

})(Backbone.Model);

model = new Model;

view = new View({
  model: model
});

Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.init = function() {
    model.set({
      trainers: app.scheduleCriteria.trainers,
      durations: app.scheduleCriteria.durations
    });
    return app.layout.filter.show(view);
  };

  return Controller;

})(Marionette.Controller);

module.exports = Controller;



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../views/filter/trainer.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/filter/trainer.coffee","backbone":"backbone","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/update.coffee":[function(require,module,exports){

/**
  * Controller Update Module
 */
var ConfirmationView, Marionette, ReviewView, app, moment, msgBus, originalappointment, view;

Marionette = require("backbone.marionette");

moment = require("moment");

app = require("../app.coffee");

msgBus = require("../msgbus.coffee");

ReviewView = require("../views/update/review.coffee");

ConfirmationView = require("../views/update/confirmation.coffee");

view = null;

originalappointment = null;

app.flow = "update";

module.exports = Marionette.Controller.extend({
  index: function(id) {
    return require("../entities/appointment.coffee", function() {
      var promise;
      promise = msgBus.reqres.request("entities:appointment", id);
      promise.done(function(appointment) {
        var date, startDate, uiDate;
        originalappointment = appointment;
        date = appointment.get("startDate");
        startDate = moment(date).format("YYYY-MM-DD");
        uiDate = moment(date).format("MMM D @ H A");
        msgBus.reqres.request("header:region", {
          pageTitle: "Reschedule Training",
          subTitle: "edit the time for <strong>" + uiDate + "</strong> and notify your trainer"
        });
        msgBus.reqres.request("schedule:calendar:navigation", {
          startDate: startDate
        });
        app.filterCriteria.set({
          startDate: startDate,
          trainerId: appointment.get("trainerId"),
          trainerName: appointment.get("trainerFirstName" + " " + appointment.get("trainerLastName")),
          sessionTypeId: appointment.get("sessionTypeId"),
          duration: appointment.get("duration")
        });
        app.filterCriteria.trigger("change");
        return app.analytics.set({
          action: "edit-start"
        });
      });
      promise.fail(function(model, jqXHR, textStatus) {});
      return msgBus.reqres.request("error", {
        error: [model, jqXHR, textStatus]
      });
    });
  },
  review: function(appointment) {
    msgBus.reqres.request("header:region", {
      pageTitle: "Review your session",
      subTitle: null
    });
    view = new ReviewView({
      model: appointment,
      original: originalappointment
    });
    app.layout.navigation.close();
    app.layout.content.show(view);
    return app.analytics.set({
      action: "edit-review"
    });
  },
  confirmation: function(appointment) {
    var data;
    appointment.set({
      id: originalappointment.id
    });
    data = _.pick(appointment.toJSON(), "id", "sessionTypeId", "trainerId", "startDate", "endDate", "message");
    require("../entities/update.coffee", function() {
      var promise;
      promise = msgBus.reqres.request("entities:update:appointment", data);
      promise.done(function(response) {});
      appointment.set({
        id: response.id,
        APIEndpoint: app.APIEndpoint
      });
      msgBus.reqres.request("header:region", {
        pageTitle: "Enjoy your workout.",
        subTitle: null
      });
      view = new ConfirmationView({
        model: appointment,
        original: originalappointment
      });
      app.layout.navigation.close();
      app.layout.content.show(view);
      return app.analytics.set({
        action: "edit-complete"
      });
    });
    return promise.fail(function(response) {
      return msgBus.reqres.request("error", response.responseJSON);
    });
  }
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../entities/appointment.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/appointment.coffee","../entities/update.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/update.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/update/confirmation.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/update/confirmation.coffee","../views/update/review.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/update/review.coffee","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/appointment.coffee":[function(require,module,exports){

/**
* Entities Appointment Module
 */
var $, API, Backbone, Loading, app, appointment, loadingView, msgBus;

$ = require("jquery");

Backbone = require("backbone");

app = require("../app.coffee");

msgBus = require("../msgbus.coffee");

Loading = require("../views/spinner.coffee");

loadingView = new Loading;

appointment = Backbone.Model.extend();

API = {

  /**
     * @name getappointment
     * @function
     * @returns {object} promise object
   */
  getAppointment: function(id) {
    var deferred;
    appointment = new appointment({
      id: id
    });
    deferred = $.Deferred();
    app.layout.content.show(loadingView);
    appointment.urlRoot = function() {
      return app.APIEndpoint + "/personal-training-schedule/appointments";
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



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/spinner.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/spinner.coffee","backbone":"backbone","jquery":"jquery"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/appointments.coffee":[function(require,module,exports){

/**
 * Entities Appointments
 * @module entities/appointments
 */
var $, API, Appointments, Backbone, DayPart, Loading, app, loadingView, msgBus,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$ = require("jquery");

Backbone = require("backbone");

app = require("../app.coffee");

msgBus = require('../msgbus.coffee');

Loading = require('../views/spinner.coffee');

loadingView = new Loading();

DayPart = (function(_super) {
  __extends(DayPart, _super);

  function DayPart() {
    return DayPart.__super__.constructor.apply(this, arguments);
  }

  DayPart.prototype.defaults = {
    morning: null,
    afternoon: null,
    evening: null
  };

  return DayPart;

})(Backbone.Model);

Appointments = (function(_super) {
  __extends(Appointments, _super);

  function Appointments() {
    return Appointments.__super__.constructor.apply(this, arguments);
  }

  Appointments.prototype.model = DayPart;

  return Appointments;

})(Backbone.Collection);

API = {

  /**
   * @name getappointments
   * @function
   * @returns {object} promise object
   */
  getAppointments: function() {
    var appointments, deferred;
    appointments = new Appointments();
    deferred = $.Deferred();
    app.layout.content.show(loadingView);
    appointments.url = function() {
      var query;
      query = '?startDate=' + app.filterCriteria.get('startDate') + '&sessionTypeId=' + app.filterCriteria.get('sessionTypeId') + '&trainerId=' + app.filterCriteria.get('trainerId');
      return app.APIEndpoint + '/personal-training-schedule/appointments' + query;
    };
    appointments.fetch({
      success: deferred.resolve,
      error: deferred.reject
    });
    return deferred.promise();
  }
};

msgBus.reqres.setHandler('entities:appointments', function() {
  return API.getAppointments();
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/spinner.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/spinner.coffee","backbone":"backbone","jquery":"jquery"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/create.coffee":[function(require,module,exports){

/**
 * Entities Create Appointment
 * @module entities/create
 */
var $, API, Backbone, Loading, Model, app, loadingView, msgBus,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$ = require("jquery");

Backbone = require("backbone");

app = require("../app.coffee");

msgBus = require("../msgbus.coffee");

Loading = require("../views/spinner.coffee");

loadingView = new Loading();

Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  Model.prototype.defaults = {
    trainerId: null,
    sessionTypeId: null,
    startDate: null,
    endDate: null,
    message: null
  };

  Model.prototype.url = function() {
    return app.APIEndpoint + "/personal-training-schedule/create";
  };

  return Model;

})(Backbone.Model);

API = {

  /**
  * @name createAppointment
  * @function
  * @returns {object} promise object
   */
  createAppointment: function(data) {
    var deferred, model;
    model = new Model;
    deferred = $.Deferred();
    app.layout.content.show(loadingView);
    model.save(data, {
      success: deferred.resolve,
      error: deferred.reject
    });
    return deferred.promise();
  }
};

msgBus.reqres.setHandler("entities:create:appointment", function(data) {
  return API.createAppointment(data);
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/spinner.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/spinner.coffee","backbone":"backbone","jquery":"jquery"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/criteria.coffee":[function(require,module,exports){

/**
* Criteria Module
 */
var Backbone, Model, msgBus,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require("backbone");

msgBus = require("../msgbus.coffee");

Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  Model.prototype.defaults = {
    trainerId: null,
    trainerName: null,
    sessionTypeId: null,
    duration: null,
    startDate: null
  };

  Model.prototype.initialize = function() {
    console.log("criteria model");
    return this.on("change", this.updateCalendar);
  };

  Model.prototype.updateCalendar = function() {
    console.log("criteria model change");
    return msgBus.reqres.request("calendar:show", {
      startDate: this.get("startDate"),
      trainerId: this.get("trainerId"),
      sessionTypeId: this.get("sessionTypeId")
    });
  };

  return Model;

})(Backbone.Model);

module.exports = Model;



},{"../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone":"backbone"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/error.coffee":[function(require,module,exports){

/**
* Entities Error Module
 */
var Backbone, Model,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require("backbone");

Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  Model.prototype.defaults = {
    message: "Please try again later.",
    code: null,
    exception: null,
    data: null
  };

  return Model;

})(Backbone.Model);

module.exports = Model;



},{"backbone":"backbone"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/header.coffee":[function(require,module,exports){

/**
  * Entities Header Module
 */
var Backbone, Model,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require("backbone");

Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  Model.prototype.defaults = {
    pageTitle: null,
    subTitle: null
  };

  return Model;

})(Backbone.Model);

module.exports = Model;



},{"backbone":"backbone"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/entities/update.coffee":[function(require,module,exports){
define(function(require) {
  var API, Loading, Model, app, loadingView, msgBus;
  app = require("../app.coffee");
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
      return app.APIEndpoint + 'update';
    }
  }, API = {

    /**
    * @name updateappointment
    * @function
    * @returns {object} promise object
     */
    updateappointment: function(data) {
      var deferred, model;
      model = new Model();
      deferred = $.Deferred();
      app.layout.content.show(loadingView);
      model.save(data, {
        success: deferred.resolve,
        error: deferred.reject
      });
      return deferred.promise();
    }
  }, msgBus.reqres.setHandler('entities:update:appointment', function(data) {
    return API.updateappointment(data);
  }));
});



},{"../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","../views/spinner.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/spinner.coffee"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/main.coffee":[function(require,module,exports){

/**
  * Main Module
 */
var app, options;

app = require("./app.coffee");

options = {
  scheduleCriteria: window.scheduleCriteria || {},
  APIEndpoint: window.APIEndpoint || null,
  MainDomain: window.MainDomain || null
};

app.start(options);



},{"./app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee":[function(require,module,exports){

/**
 * MsgBus Module
 */
var Controller, Wreqr, controller, msgBus;

Wreqr = require("backbone.wreqr");

Controller = require("./controllers/_base-controller.coffee");

controller = new Controller();

msgBus = {
  reqres: new Wreqr.RequestResponse(),
  commands: new Wreqr.Commands(),
  events: new Wreqr.EventAggregator()
};

msgBus.commands.setHandler("scroll:top", function() {
  return controller.scroll();
});

msgBus.reqres.setHandler("header:region", function(options) {
  return controller.header(options);
});

msgBus.reqres.setHandler("trainer:filter", function() {
  return controller.trainerFilter();
});

msgBus.reqres.setHandler("calendar:navigation", function(options) {
  return controller.navigation(options);
});

msgBus.reqres.setHandler("calendar:show", function() {
  return controller.calendar();
});

msgBus.reqres.setHandler("create:review", function(id) {
  return controller.createReview(id);
});

msgBus.reqres.setHandler("create:confirmation", function(model) {
  return controller.createConfirmation(model);
});

module.exports = msgBus;



},{"./controllers/_base-controller.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/_base-controller.coffee","backbone.wreqr":"backbone.wreqr"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/router.coffee":[function(require,module,exports){

/**
  * Router Module
 */
var Controller, Marionette, Router,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Marionette = require("backbone.marionette");

Controller = require("./controllers/_base-controller.coffee");

Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.controller = new Controller();

  Router.prototype.appRoutes = {
    "": "create",
    "create/:date": "create",
    "cancel/:id": "cancel",
    "update/:id": "update",
    "detail/:id": "detail",
    "error": "error",
    "*allOthers": "defaultPage"
  };

  return Router;

})(Marionette.AppRouter);

module.exports = Router;



},{"./controllers/_base-controller.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/controllers/_base-controller.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/calendar-navigation.coffee":[function(require,module,exports){

/**
  * View Calendar Navigation Module
 */
var ChildView, Marionette, Utils, View, app, moment, msgBus, utils,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Marionette = require("backbone.marionette");

moment = require("moment");

app = require("../app.coffee");

msgBus = require("../msgbus.coffee");

Utils = require("../components/utils.coffee");

utils = new Utils;

ChildView = (function(_super) {
  __extends(ChildView, _super);

  function ChildView() {
    return ChildView.__super__.constructor.apply(this, arguments);
  }

  ChildView.prototype.tagName = "li";

  ChildView.prototype.template = require("../../templates/calendar/navigation_item.hbs");

  ChildView.prototype.events = {
    "click": "updateCalendar"
  };

  ChildView.prototype.onRender = function() {
    var date;
    date = this.model.get("dataDate");
    if (!utils.isValidDate(date)) {
      return this.$el.addClass("disabled");
    }
  };

  ChildView.prototype.updateCalendar = function(e) {
    var date;
    e.preventDefault();
    date = this.model.get("dataDate");
    if (utils.isValidDate(date)) {
      app.filterCriteria.set({
        startDate: date
      });
      return msgBus.reqres.request("calendar:navigation", {
        startDate: date
      });
    }
  };

  return ChildView;

})(Marionette.ItemView);

View = (function(_super) {
  __extends(View, _super);

  function View() {
    return View.__super__.constructor.apply(this, arguments);
  }

  View.prototype.childView = ChildView;

  View.prototype.className = "classes-calendar";

  View.prototype.template = require("../../templates/calendar/navigation.hbs");

  View.prototype.childViewContainer = "ul";

  View.prototype.initialize = function() {
    var first, last;
    this.first = moment(this.collection.at(0).get("dataDate"));
    this.last = moment(this.collection.at(6).get("dataDate"));
    first = moment(this.first);
    last = moment(this.last);
    this.prevWeek = first.subtract("days", 7).format("YYYY-MM-DD");
    return this.nextWeek = last.add("days", 1).format("YYYY-MM-DD");
  };

  View.prototype.events = {
    "click .icon-left-arrow": "updateCalendarPrevWeek",
    "click .icon-right-arrow": "updateCalendarNextWeek"
  };

  View.prototype.ui = {
    leftArrow: ".icon-left-arrow",
    rightArrow: ".icon-right-arrow",
    currentWeek: ".current-week"
  };

  View.prototype.onRender = function() {
    this.ui.currentWeek.text(moment(this.first).format("MMM DD") + " - " + moment(this.last).format("MMM DD"));
    if (moment().add("days", 1).format("W") < this.first.format("W")) {
      this.ui.leftArrow.show();
    } else {
      this.ui.leftArrow.hide();
    }
    if (utils.isValidDate(this.nextWeek)) {
      return this.ui.rightArrow.show();
    } else {
      return this.ui.rightArrow.hide();
    }
  };

  View.prototype.updateCalendarPrevWeek = function(e) {
    var date;
    e.preventDefault();
    date = this.prevWeek;
    app.filterCriteria.set({
      startDate: date
    });
    return msgBus.reqres.request("calendar:navigation", {
      startDate: date
    });
  };

  View.prototype.updateCalendarNextWeek = function(e) {
    var date;
    e.preventDefault();
    date = this.nextWeek;
    app.filterCriteria.set({
      startDate: date
    });
    return msgBus.reqres.request("calendar:navigation", {
      startDate: date
    });
  };

  return View;

})(Marionette.CompositeView);

module.exports = View;



},{"../../templates/calendar/navigation.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/navigation.hbs","../../templates/calendar/navigation_item.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/navigation_item.hbs","../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../components/utils.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/components/utils.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/calendar.coffee":[function(require,module,exports){

/**
  * Views Calendar Module
 */
var AppointmentsLayout, Backbone, CalendarHeaderItem, CalendarHeaderView, DayPartView, EmptyItem, Item, Marionette, app, moment, msgBus,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require("backbone");

Marionette = require("backbone.marionette");

moment = require("moment");

app = require("../app.coffee");

msgBus = require("../msgbus.coffee");

Item = (function(_super) {
  __extends(Item, _super);

  function Item() {
    return Item.__super__.constructor.apply(this, arguments);
  }

  Item.prototype.tagName = "li";

  Item.prototype.template = require("../../templates/calendar/item.hbs");

  Item.prototype.events = {
    "click .available": "selectAppointment"
  };

  Item.prototype.initialize = function() {
    this.addAttribute("data-item", this.model.get("indexOfWeek"));
    return this.addAttribute("data-date", this.model.get("startDate"));
  };

  Item.prototype.onBeforeRender = function() {
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
  };

  Item.prototype.addAttribute = function(attrName, attrValue) {
    return this.$el.attr(attrName, attrValue);
  };

  Item.prototype.selectAppointment = function(e) {
    e.preventDefault();
    console.log("select");
    return msgBus.reqres.request("create:review", this.options.model);
  };

  return Item;

})(Marionette.ItemView);

EmptyItem = (function(_super) {
  __extends(EmptyItem, _super);

  function EmptyItem() {
    return EmptyItem.__super__.constructor.apply(this, arguments);
  }

  EmptyItem.prototype.tagName = "li";

  EmptyItem.prototype.className = "empty";

  EmptyItem.prototype.template = require("../../templates/calendar/empty_item.hbs");

  EmptyItem.prototype.initialize = function() {
    return this.addClass("item-" + this.model.get("indexOfWeek"));
  };

  EmptyItem.prototype.addClass = function(className) {
    return this.$el.addClass(className);
  };

  return EmptyItem;

})(Marionette.ItemView);

DayPartView = (function(_super) {
  __extends(DayPartView, _super);

  function DayPartView() {
    return DayPartView.__super__.constructor.apply(this, arguments);
  }

  DayPartView.prototype.tagName = "ul";

  DayPartView.prototype.childViewOptions = function(model, index) {
    return {
      itemIndex: index
    };
  };

  DayPartView.prototype.getChildView = function(item) {
    if (item.get("isAvailable")) {
      return Item;
    } else {
      return EmptyItem;
    }
  };

  return DayPartView;

})(Marionette.CollectionView);

CalendarHeaderItem = (function(_super) {
  __extends(CalendarHeaderItem, _super);

  function CalendarHeaderItem() {
    return CalendarHeaderItem.__super__.constructor.apply(this, arguments);
  }

  CalendarHeaderItem.prototype.tagName = "li";

  CalendarHeaderItem.prototype.template = require("../../templates/calendar/header_item.hbs");

  CalendarHeaderItem.prototype.initialize = function() {
    if (this.model.get("selected")) {
      return this.$el.addClass("selected");
    }
  };

  return CalendarHeaderItem;

})(Marionette.ItemView);

CalendarHeaderView = (function(_super) {
  __extends(CalendarHeaderView, _super);

  function CalendarHeaderView() {
    return CalendarHeaderView.__super__.constructor.apply(this, arguments);
  }

  CalendarHeaderView.prototype.tagName = "ul";

  CalendarHeaderView.prototype.className = "day-dates";

  CalendarHeaderView.prototype.childView = CalendarHeaderItem;

  return CalendarHeaderView;

})(Marionette.CollectionView);

AppointmentsLayout = (function(_super) {
  __extends(AppointmentsLayout, _super);

  function AppointmentsLayout() {
    return AppointmentsLayout.__super__.constructor.apply(this, arguments);
  }

  AppointmentsLayout.prototype.template = require("../../templates/calendar/index.hbs");

  AppointmentsLayout.prototype.regions = {
    header: ".appointments-header",
    morning: ".morning",
    afternoon: ".afternoon",
    evening: ".evening"
  };

  AppointmentsLayout.prototype.events = {
    "click .toggle-day": "toggleDayPart"
  };

  AppointmentsLayout.prototype.toggleDayPart = function(e) {
    e.preventDefault();
    return $(e.currentTarget).next().toggle();
  };

  return AppointmentsLayout;

})(Marionette.LayoutView);

module.exports = function(options) {
  var appointmentsLayout;
  appointmentsLayout = new AppointmentsLayout();
  app.layout.content.show(appointmentsLayout);
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



},{"../../templates/calendar/empty_item.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/empty_item.hbs","../../templates/calendar/header_item.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/header_item.hbs","../../templates/calendar/index.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/index.hbs","../../templates/calendar/item.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/calendar/item.hbs","../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone":"backbone","backbone.marionette":"backbone.marionette","moment":"moment"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/cancel/confirmation.coffee":[function(require,module,exports){

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
var Marionette, app, moment, msgBus;

Marionette = require("backbone.marionette");

moment = require("moment");

app = require("../../app.coffee");

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
    app.navigate("update/" + this.model.id, {
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
  * View Create Confirmation Module
 */
var Marionette, app, msgBus;

Marionette = require("backbone.marionette");

app = require("../../app.coffee");

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
    app.navigate("cancel/" + this.model.id, {
      trigger: false
    });
    return msgBus.reqres.request("schedule:cancel", this.model.id);
  }
});



},{"../../../templates/create/confirmation.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/create/confirmation.hbs","../../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/create/review.coffee":[function(require,module,exports){

/**
  * Create Review Module
 */
var Marionette, View, moment, msgBus, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require("underscore");

Marionette = require("backbone.marionette");

moment = require("moment");

msgBus = require("../../msgbus.coffee");

View = (function(_super) {
  __extends(View, _super);

  function View() {
    return View.__super__.constructor.apply(this, arguments);
  }

  View.prototype.template = require("../../../templates/create/review.hbs");

  View.prototype.events = {
    "click .schedule": "schedule",
    "click .add-message": "addMessage",
    "keyup textarea": "countLimit"
  };

  View.prototype.initialize = function() {
    return msgBus.commands.execute("scroll:top");
  };

  View.prototype.ui = {
    textarea: "textarea"
  };

  View.prototype.onBeforeRender = function() {
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
  };

  View.prototype.schedule = function(e) {
    e.preventDefault();
    if (!_.isEmpty(this.ui.textarea.val())) {
      this.model.set({
        message: this.ui.textarea.val()
      });
    }
    return msgBus.reqres.request("create:confirmation", this.model);
  };

  View.prototype.countLimit = function(e) {
    var count;
    e.preventDefault();
    count = 300 - this.ui.textarea.val().length;
    return this.ui.textarea.next(".char-counter").text(count);
  };

  View.prototype.addMessage = function(e) {
    e.preventDefault();
    return this.$(".add-message-container").toggleClass("hidden");
  };

  return View;

})(Marionette.ItemView);

module.exports = View;



},{"../../../templates/create/review.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/create/review.hbs","../../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette","moment":"moment","underscore":"underscore"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/detail/index.coffee":[function(require,module,exports){

/**
  * View Detail Module
 */
var Marionette, app, moment, msgBus;

moment = require("moment");

Marionette = require("backbone.marionette");

app = require("../../app.coffee");

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
        app.navigate("cancel/" + this.model.id);
        return msgBus.reqres.request("schedule:cancel:review", this.model);
      },
      cancel: function(e) {}
    });
    e.preventDefault();
    this.model.set({
      cancelAll: false
    });
    app.navigate("cancel/" + this.model.id);
    msgBus.reqres.request("schedule:cancel:review", this.model);
    ({
      reschedule: function(e) {}
    });
    e.preventDefault();
    app.navigate("update/" + this.model.id);
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
var $, Marionette, View, app, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$ = require("jquery");

_ = require("underscore");

Marionette = require("backbone.marionette");

app = require("../../app.coffee");

View = (function(_super) {
  __extends(View, _super);

  function View() {
    return View.__super__.constructor.apply(this, arguments);
  }

  View.prototype.template = require("../../../templates/filter/trainer.hbs");

  View.prototype.events = {
    "change .select-duration": "selectDuration",
    "change .select-trainer": "selectTrainer"
  };

  View.prototype.onBeforeRender = function() {
    this.model.set({
      defaultTrainer: app.filterCriteria.get("trainerName")
    });
    return this.model.set({
      defaultDuration: app.filterCriteria.get("duration")
    });
  };

  View.prototype.onRender = function() {
    if (_.isEqual(1, _.size(this.model.get("trainers")))) {
      this.ui.selectTrainer.closest("div").hide();
      return this.ui.selectDuration.closest("div").css({
        "float": "none",
        "margin": "0 auto"
      });
    }
  };

  View.prototype.ui = {
    selectDuration: "select.select-duration",
    selectTrainer: "select.select-trainer"
  };

  View.prototype.selectTrainer = function() {
    this.ui.selectTrainer.prev(".option").text($("option:selected", this.ui.selectTrainer).text());
    return app.filterCriteria.set({
      trainerId: $("option:selected", this.ui.selectTrainer).val()
    });
  };

  View.prototype.selectDuration = function() {
    this.ui.selectDuration.prev(".option").text($("option:selected", this.ui.selectDuration).text());
    return app.filterCriteria.set({
      sessionTypeId: $("option:selected", this.ui.selectDuration).val()
    });
  };

  return View;

})(Marionette.ItemView);

module.exports = View;



},{"../../../templates/filter/trainer.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/filter/trainer.hbs","../../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","backbone.marionette":"backbone.marionette","jquery":"jquery","underscore":"underscore"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/header.coffee":[function(require,module,exports){

/**
  * Views Header Module
 */
var Marionette, View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Marionette = require("backbone.marionette");

View = (function(_super) {
  __extends(View, _super);

  function View() {
    return View.__super__.constructor.apply(this, arguments);
  }

  View.prototype.template = require("../../templates/header.hbs");

  return View;

})(Marionette.ItemView);

module.exports = View;



},{"../../templates/header.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/header.hbs","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/layout.coffee":[function(require,module,exports){

/**
  * Layout Module
 */
var Layout, Marionette,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Marionette = require("backbone.marionette");

Layout = (function(_super) {
  __extends(Layout, _super);

  function Layout() {
    return Layout.__super__.constructor.apply(this, arguments);
  }

  Layout.prototype.template = require("../../templates/layout.hbs");

  Layout.prototype.regions = {
    header: ".header",
    filter: ".trainer-filter",
    navigation: ".navigation",
    content: ".content"
  };

  return Layout;

})(Marionette.LayoutView);

module.exports = Layout;



},{"../../templates/layout.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/layout.hbs","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/spinner.coffee":[function(require,module,exports){

/**
 * View Spinner
 * @module views/spinner
 */
var Marionette, Spinner, View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Marionette = require("backbone.marionette");

Spinner = require("spinner");

View = (function(_super) {
  __extends(View, _super);

  function View() {
    return View.__super__.constructor.apply(this, arguments);
  }

  View.prototype.template = require("../../templates/spinner.hbs");

  View.prototype.id = "spinner";

  View.prototype.initialize = function(options) {
    options = options || {};
    this.title = options.title || null;
    return this.message = options.message || null;
  };

  View.prototype.serializeData = function() {
    return {
      title: this.title,
      message: this.message
    };
  };

  View.prototype.onShow = function() {
    var opts, target;
    opts = {
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
    target = document.getElementById(this.el.id);
    return new Spinner(opts).spin(target);
  };

  return View;

})(Marionette.ItemView);

module.exports = View;



},{"../../templates/spinner.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/spinner.hbs","backbone.marionette":"backbone.marionette","spinner":"spinner"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/update/confirmation.coffee":[function(require,module,exports){

/**
  * View Update Confirmation Module
 */
var Marionette, app, msgBus;

Marionette = require("backbone.marionette");

app = require("../../app.coffee");

msgBus = require("../../msgbus.coffee");

module.exports = Marionette.ItemView.extend({
  template: require("../../../templates/update/confirmation.hbs"),
  initialize: function() {
    return msgBus.commands.execute("scroll:top");
  },
  events: {
    "click .cancel": "cancelappointment"
  },
  cancelappointment: function(e) {
    e.preventDefault();
    app.navigate("cancel/" + this.options.original.id, {
      trigger: false
    });
    return msgBus.reqres.request("schedule:cancel", this.options.original.id);
  }
});



},{"../../../templates/update/confirmation.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/update/confirmation.hbs","../../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","../../msgbus.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/msgbus.coffee","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/views/update/review.coffee":[function(require,module,exports){

/**
  * View Update Review Module
 */
var Marionette, app, moment, msgBus;

Marionette = require("backbone.marionette");

moment = require("moment");

app = require("../../app.coffee");

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
      originalappointmentDate: originalWeekDay + ", " + originalShortMonth + " " + originalDate,
      originalappointmentTime: originalStartTime + " - " + originalEndTime + " " + originalMeridiemIndicator
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
        app.navigate("update/" + this.options.original.id, {
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
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div>\n    <p>"
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + "</p>\n    <span>"
    + escapeExpression(((helper = (helper = helpers.month || (depth0 != null ? depth0.month : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"month","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.day || (depth0 != null ? depth0.day : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"day","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n";
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
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
  return "        <p>Your reservation</p>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "        <div class=\"add-appointment\"><div class=\"add\">+</div></div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"wrapper "
    + escapeExpression(((helper = (helper = helpers.className || (depth0 != null ? depth0.className : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"className","hash":{},"data":data}) : helper)))
    + "\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.cid || (depth0 != null ? depth0.cid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cid","hash":{},"data":data}) : helper)))
    + "\">\n    <p><strong>"
    + escapeExpression(((helper = (helper = helpers.appointment || (depth0 != null ? depth0.appointment : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointment","hash":{},"data":data}) : helper)))
    + "</strong></p>\n    <p>"
    + escapeExpression(((helper = (helper = helpers.trainerFirstName || (depth0 != null ? depth0.trainerFirstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerFirstName","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.trainerLastName || (depth0 != null ? depth0.trainerLastName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerLastName","hash":{},"data":data}) : helper)))
    + "</p>\n    <p>"
    + escapeExpression(((helper = (helper = helpers.facilityName || (depth0 != null ? depth0.facilityName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"facilityName","hash":{},"data":data}) : helper)))
    + "</p>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.scheduled : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>";
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
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<a href=\"#\" data-date=\""
    + escapeExpression(((helper = (helper = helpers.dataDate || (depth0 != null ? depth0.dataDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dataDate","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + escapeExpression(((helper = (helper = helpers.current || (depth0 != null ? depth0.current : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"current","hash":{},"data":data}) : helper)))
    + "\">\n    <p class=\"is-tablet is-desktop\">"
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + "</p>\n    <p class=\"is-mobile\">"
    + escapeExpression(((helper = (helper = helpers.dateShort || (depth0 != null ? depth0.dateShort : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dateShort","hash":{},"data":data}) : helper)))
    + "</p>\n    <small class=\"is-tablet is-desktop\">"
    + escapeExpression(((helper = (helper = helpers.month || (depth0 != null ? depth0.month : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"month","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.day || (depth0 != null ? depth0.day : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"day","hash":{},"data":data}) : helper)))
    + "</small>\n</a>\n<div class=\"classes-timeline\"></div>\n";
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
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <p>"
    + escapeExpression(((helper = (helper = helpers.note || (depth0 != null ? depth0.note : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"note","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"3":function(depth0,helpers,partials,data) {
  return "        <a href=\"#\" class=\"button white small half-button box cancel-all\">Cancel all Sessions</a>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<section class=\"class-module no-padding-bottom\">\n    <h3 class=\"tier\">"
    + escapeExpression(((helper = (helper = helpers.trainerTier || (depth0 != null ? depth0.trainerTier : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerTier","hash":{},"data":data}) : helper)))
    + "</h3>\n\n    <ul class=\"class-detail\">\n        <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentDate || (depth0 != null ? depth0.appointmentDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentDate","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentTime || (depth0 != null ? depth0.appointmentTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentTime","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"medium-font\">Personal Training</li>\n        <li class=\"medium-font\">w/"
    + escapeExpression(((helper = (helper = helpers.trainerFirstName || (depth0 != null ? depth0.trainerFirstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerFirstName","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"medium-font\">"
    + escapeExpression(((helper = (helper = helpers.facilityName || (depth0 != null ? depth0.facilityName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"facilityName","hash":{},"data":data}) : helper)))
    + "</li>\n    </ul>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.notes : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    <p>Please confirm the details and cancel your session</p>\n\n    <nav class=\"buttons\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.canCancelAll : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        <a href=\"#\" class=\"button black small half-button box inline cancel\">Cancel this Session</a>\n    </nav>\n\n    <nav class=\"buttons\">\n        <a href=\"#\" class=\"underlined-small-link black update\">reschedule this session</a><br>\n        <a href=\"/personal-training\" class=\"underlined-small-link black\">Back</a>\n    </nav>\n</section>\n\n";
},"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/cancel/review.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <p>"
    + escapeExpression(((helper = (helper = helpers.warningMessage || (depth0 != null ? depth0.warningMessage : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"warningMessage","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <p>"
    + escapeExpression(((helper = (helper = helpers.note || (depth0 != null ? depth0.note : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"note","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"5":function(depth0,helpers,partials,data) {
  return "            <a href=\"#\" class=\"button white small half-button box inline cancel\">Cancel all Sessions</a>\n";
  },"7":function(depth0,helpers,partials,data) {
  return "            <a href=\"#\" class=\"button black small half-button box inline cancel\">Cancel this Session</a>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<section class=\"class-module no-padding-bottom\">\n    <h1 class=\"title\">Are you Sure?</h1>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.warningMessage : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    <h3 class=\"tier\">"
    + escapeExpression(((helper = (helper = helpers.trainerTier || (depth0 != null ? depth0.trainerTier : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerTier","hash":{},"data":data}) : helper)))
    + "</h3>\n\n    <ul class=\"class-detail\">\n        <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentDate || (depth0 != null ? depth0.appointmentDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentDate","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentTime || (depth0 != null ? depth0.appointmentTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentTime","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"medium-font\">Personal Training</li>\n        <li class=\"medium-font\">w/"
    + escapeExpression(((helper = (helper = helpers.trainerFirstName || (depth0 != null ? depth0.trainerFirstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerFirstName","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"medium-font\">"
    + escapeExpression(((helper = (helper = helpers.facilityName || (depth0 != null ? depth0.facilityName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"facilityName","hash":{},"data":data}) : helper)))
    + "</li>\n    </ul>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.notes : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    <a href=\"#\" class=\"underlined-small-link black add-message\">attach a message</a>\n    <div class=\"add-message-container hidden\">\n        <textarea maxlength=\"300\" style=\"resize: none;\"></textarea>\n\n        <div class=\"char-counter\">300</div>\n    </div>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <nav class=\"buttons\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.cancelAll : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </nav>\n    <p>\n        <a href=\"/personal-training\" class=\"underlined-small-link black\">Back</a>\n    </p>\n</section>\n";
},"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/create/confirmation.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<section class=\"class-module no-padding-bottom\">\n    <h3 class=\"tier\">"
    + escapeExpression(((helper = (helper = helpers.trainerTier || (depth0 != null ? depth0.trainerTier : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerTier","hash":{},"data":data}) : helper)))
    + "</h3>\n\n    <ul class=\"class-detail\">\n        <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentDate || (depth0 != null ? depth0.appointmentDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentDate","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentTime || (depth0 != null ? depth0.appointmentTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentTime","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"medium-font\">Personal Training</li>\n        <li class=\"medium-font\">w/"
    + escapeExpression(((helper = (helper = helpers.trainerFirstName || (depth0 != null ? depth0.trainerFirstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerFirstName","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"medium-font\">"
    + escapeExpression(((helper = (helper = helpers.facilityName || (depth0 != null ? depth0.facilityName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"facilityName","hash":{},"data":data}) : helper)))
    + "</li>\n    </ul>\n\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <p>your calendar is updated and your trainer has been notified</p>\n\n    <div class=\"export\">\n        <a target=\"_blank\" class=\"export\" href=\""
    + escapeExpression(((helper = (helper = helpers.APIEndpoint || (depth0 != null ? depth0.APIEndpoint : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"APIEndpoint","hash":{},"data":data}) : helper)))
    + "/ME/CALENDAR/EVENTS/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "/EXPORT/ICS?exportType=AppointmentInstance\">\n            <span class=\"icon-export\"></span>Export to calendar\n        </a>\n    </div>\n\n    <nav class=\"buttons\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n        <a href=\"#\" class=\"underlined-small-link black cancel\">cancel session</a>\n    </nav>\n</section>\n";
},"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/create/review.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<section class=\"class-module no-padding-bottom\">\n    <h3 class=\"tier\">"
    + escapeExpression(((helper = (helper = helpers.trainerTier || (depth0 != null ? depth0.trainerTier : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerTier","hash":{},"data":data}) : helper)))
    + "</h3>\n\n    <ul class=\"class-detail\">\n        <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentDate || (depth0 != null ? depth0.appointmentDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentDate","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentTime || (depth0 != null ? depth0.appointmentTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentTime","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"medium-font\">Personal Training</li>\n        <li class=\"medium-font\">w/"
    + escapeExpression(((helper = (helper = helpers.trainerFirstName || (depth0 != null ? depth0.trainerFirstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerFirstName","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"medium-font\">"
    + escapeExpression(((helper = (helper = helpers.facilityName || (depth0 != null ? depth0.facilityName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"facilityName","hash":{},"data":data}) : helper)))
    + "</li>\n    </ul>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <a href=\"#\" class=\"underlined-small-link black add-message\">attach a message</a>\n\n    <div class=\"add-message-container hidden\">\n        <textarea maxlength=\"300\" style=\"resize: none;\"></textarea>\n\n        <div class=\"char-counter\">300</div>\n    </div>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <nav class=\"buttons\">\n        <a href=\"#\" class=\"button black small box inline half-button schedule\">Schedule Session</a>\n    </nav>\n    <a href=\"/\" class=\"underlined-small-link black\">cancel</a>\n</section>";
},"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/detail/index.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <p>"
    + escapeExpression(((helper = (helper = helpers.note || (depth0 != null ? depth0.note : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"note","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, buffer = "    <p>Please confirm the details and cancel your session</p>\n    <nav class=\"buttons\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.canCancelAll : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        <a href=\"#\" class=\"button black small inline half-button box cancel\">Cancel this Session</a>\n    </nav>\n\n    <nav class=\"buttons\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.canReschedule : depth0), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        <a href=\"/personal-training\" class=\"underlined-small-link black\">Back</a>\n    </nav>\n";
},"4":function(depth0,helpers,partials,data) {
  return "            <a href=\"#\" class=\"button white small half-button box cancel-all\">Cancel all Sessions</a>\n";
  },"6":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <a href=\"/personal-training/schedule#update/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"underlined-small-link black reschedule\">reschedule this session</a><br>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<section class=\"class-module no-padding-bottom\">\n    <h3 class=\"tier\">"
    + escapeExpression(((helper = (helper = helpers.trainerTier || (depth0 != null ? depth0.trainerTier : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerTier","hash":{},"data":data}) : helper)))
    + "</h3>\n\n    <ul class=\"class-detail\">\n        <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentDate || (depth0 != null ? depth0.appointmentDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentDate","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentTime || (depth0 != null ? depth0.appointmentTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentTime","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"medium-font\">Personal Training</li>\n        <li class=\"medium-font\">w/"
    + escapeExpression(((helper = (helper = helpers.trainerFirstName || (depth0 != null ? depth0.trainerFirstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerFirstName","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"medium-font\">"
    + escapeExpression(((helper = (helper = helpers.facilityName || (depth0 != null ? depth0.facilityName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"facilityName","hash":{},"data":data}) : helper)))
    + "</li>\n    </ul>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.notes : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.canCancel : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</section>\n";
},"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/error.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"class-module no-padding-bottom no-border-top\">\n    <h2 class=\"title\">"
    + escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)))
    + "</h2>\n    <!--<p>Code: <%= code %></p>-->\n    <!--<p><%= exception %></p>-->\n</div>\n";
},"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/filter/trainer.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    <option value=\""
    + escapeExpression(((helper = (helper = helpers.trainerId || (depth0 != null ? depth0.trainerId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerId","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.trainerFirstName || (depth0 != null ? depth0.trainerFirstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerFirstName","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.trainerLastName || (depth0 != null ? depth0.trainerLastName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerLastName","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    <option value=\""
    + escapeExpression(((helper = (helper = helpers.sessionTypeId || (depth0 != null ? depth0.sessionTypeId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"sessionTypeId","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"duration","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<form class=\"large white\">\n    <fieldset>\n        <div>\n            <span class=\"dropdown block white\">\n                <span class=\"option\">"
    + escapeExpression(((helper = (helper = helpers.defaultTrainer || (depth0 != null ? depth0.defaultTrainer : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"defaultTrainer","hash":{},"data":data}) : helper)))
    + "</span>\n                <select id=\"select-trainer\" class=\"select-trainer\" name=\"trainer\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.trainers : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </select>\n            </span>\n        </div>\n        <div>\n            <span class=\"dropdown block white\">\n                <span class=\"option\">"
    + escapeExpression(((helper = (helper = helpers.defaultDuration || (depth0 != null ? depth0.defaultDuration : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"defaultDuration","hash":{},"data":data}) : helper)))
    + "</span>\n                <select id=\"select-duration\" class=\"select-duration\" name=\"duration\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.durations : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </select>\n            </span>\n        </div>\n    </fieldset>\n</form>\n";
},"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/header.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<h1>"
    + escapeExpression(((helper = (helper = helpers.pageTitle || (depth0 != null ? depth0.pageTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"pageTitle","hash":{},"data":data}) : helper)))
    + "</h1>\n<div class=\"sub-header\">\n    <a href=\"/personal-training/rules\">see rules</a>\n</div>\n<h3 class=\"title\">"
    + escapeExpression(((helper = (helper = helpers.subTitle || (depth0 != null ? depth0.subTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"subTitle","hash":{},"data":data}) : helper)))
    + "</h3>\n\n\n\n";
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
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<section class=\"class-module no-padding-bottom\">\n    <h3 class=\"tier\">"
    + escapeExpression(((helper = (helper = helpers.trainerTier || (depth0 != null ? depth0.trainerTier : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerTier","hash":{},"data":data}) : helper)))
    + "</h3>\n\n    <ul class=\"class-detail\">\n        <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentDate || (depth0 != null ? depth0.appointmentDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentDate","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentTime || (depth0 != null ? depth0.appointmentTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentTime","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"medium-font\">Personal Training</li>\n        <li class=\"medium-font\">w/"
    + escapeExpression(((helper = (helper = helpers.trainerFirstName || (depth0 != null ? depth0.trainerFirstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerFirstName","hash":{},"data":data}) : helper)))
    + "</li>\n        <li class=\"medium-font\">"
    + escapeExpression(((helper = (helper = helpers.facilityName || (depth0 != null ? depth0.facilityName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"facilityName","hash":{},"data":data}) : helper)))
    + "</li>\n    </ul>\n\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <p>your calendar is updated and your trainer has been notified</p>\n\n    <div class=\"export\">\n        <a target=\"_blank\" class=\"export\" href=\""
    + escapeExpression(((helper = (helper = helpers.APIEndpoint || (depth0 != null ? depth0.APIEndpoint : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"APIEndpoint","hash":{},"data":data}) : helper)))
    + "/ME/CALENDAR/EVENTS/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "/EXPORT/ICS?exportType=AppointmentInstance\">\n            <span class=\"icon-export\"></span>Export to calendar\n        </a>\n    </div>\n\n    <nav class=\"buttons\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n        <a href=\"#\" class=\"underlined-small-link black cancel\">cancel\n            session</a>\n    </nav>\n</section>\n";
},"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/templates/update/review.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<section class=\"class-module no-padding-bottom\">\n    <div class=\"original\">\n        <h4>original:</h4>\n        <ul class=\"class-detail\">\n            <li class=\"medium-font\">"
    + escapeExpression(((helper = (helper = helpers.originalAppointmentDate || (depth0 != null ? depth0.originalAppointmentDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"originalAppointmentDate","hash":{},"data":data}) : helper)))
    + "</li>\n            <li class=\"medium-font\">"
    + escapeExpression(((helper = (helper = helpers.originalAppointmentTime || (depth0 != null ? depth0.originalAppointmentTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"originalAppointmentTime","hash":{},"data":data}) : helper)))
    + "</li>\n        </ul>\n    </div>\n\n    <div>\n        <h4>new:</h4>\n        <h3 class=\"tier\">"
    + escapeExpression(((helper = (helper = helpers.trainerTier || (depth0 != null ? depth0.trainerTier : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerTier","hash":{},"data":data}) : helper)))
    + "</h3>\n        <div>Personal Training</div>\n        <ul class=\"class-detail\">\n            <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentDate || (depth0 != null ? depth0.appointmentDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentDate","hash":{},"data":data}) : helper)))
    + "</li>\n            <li class=\"big-font\">"
    + escapeExpression(((helper = (helper = helpers.appointmentTime || (depth0 != null ? depth0.appointmentTime : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"appointmentTime","hash":{},"data":data}) : helper)))
    + "</li>\n            <li class=\"medium-font\">w/"
    + escapeExpression(((helper = (helper = helpers.trainerFirstName || (depth0 != null ? depth0.trainerFirstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"trainerFirstName","hash":{},"data":data}) : helper)))
    + "</li>\n            <li class=\"medium-font\">"
    + escapeExpression(((helper = (helper = helpers.facilityName || (depth0 != null ? depth0.facilityName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"facilityName","hash":{},"data":data}) : helper)))
    + "</li>\n        </ul>\n    </div>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <a href=\"#\" class=\"underlined-small-link black add-message\">attach a message</a>\n\n    <div class=\"add-message-container hidden\">\n        <textarea maxlength=\"300\" style=\"resize: none;\"></textarea>\n\n        <div class=\"char-counter\">300</div>\n    </div>\n</section>\n\n<section class=\"class-module no-padding-bottom\">\n    <nav class=\"buttons\">\n        <a href=\"\" class=\"button white small half-button box update\">Edit Session</a>\n        <a href=\"\" class=\"button black small half-button box schedule\">Schedule Session</a>\n    </nav>\n    <a href=\"/personal-training/schedule\" class=\"underlined-small-link black\">Back</a>\n</section>\n\n";
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
