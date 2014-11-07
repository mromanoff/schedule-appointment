(function() {
  define(function(require, exports, module) {
    var Analytics, App, FilterCriteriaModel, Layout, Marionette, Utils;
    Marionette = require('marionette');
    Layout = require('views/layout');
    Utils = require('components/utils');
    FilterCriteriaModel = require('entities/criteria');
    Analytics = require('entities/analytics');
    App = new Marionette.Application();
    App.layout = new Layout();
    App.utils = new Utils();
    App.filterCriteria = new FilterCriteriaModel();
    App.analytics = new Analytics();
    App.el = '#app-main';

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
    App.on('initialize:after', function() {
      if (_.isEmpty(App.scheduleCriteria.trainers)) {
        window.location.href = '/personal-training/schedule-equifit';
        return false;
      }
      window.App = {
        Components: {}
      };
      App.filterCriteria.set({
        sessionTypeId: App.scheduleCriteria.durations[0].sessionTypeId,
        duration: App.scheduleCriteria.durations[0].duration,
        trainerId: App.scheduleCriteria.trainers[0].trainerId,
        trainerName: App.scheduleCriteria.trainers[0].trainerFirstName + ' ' + App.scheduleCriteria.trainers[0].trainerLastName
      }, {
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
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var Utils, moment;
    moment = require('moment');

    /**
    * Utilities
    *
    * Useful utilities we will use throughout the app
    *
    * @name Utils
    * @class Utils
     */
    Utils = function() {
      this.STARTDATE = moment().add('days', 1).format('YYYY-MM-DD');
      this.ENDDATE = moment().add('days', 30).format('YYYY-MM-DD');
      this.TOMORROW = moment().add('days', 1).format('YYYY-MM-DD');
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
  });

}).call(this);

(function() {
  requirejs.config({
    paths: {
      vendor: '../vendor',
      jquery: '../vendor/bower_components/jquery/jquery',
      underscore: '../vendor/bower_components/lodash/dist/lodash.underscore',
      backbone: '../vendor/bower_components/backbone/backbone',
      marionette: '../vendor/bower_components/backbone.marionette/lib/backbone.marionette',
      'backbone.wreqr': '../vendor/bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
      spin: '../vendor/bower_components/spin.js/spin',
      text: '../vendor/bower_components/requirejs-text/text',
      moment: '../vendor/bower_components/momentjs/moment',
      debug: '../vendor/_console'
    },
    shim: {
      backbone: {
        deps: ['jquery', 'underscore'],
        exports: 'Backbone'
      },
      marionette: {
        deps: ['backbone'],
        exports: 'Marionette'
      }
    }
  });

}).call(this);


/**
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
 */

(function() {
  define(function(require, exports, module) {
    var Marionette;
    Marionette = require('marionette');
    module.exports = Marionette.Controller.extend({

      /**
      * render index page for schedule appointment flow
      * @param {string} [date] - date in 2014-05-31 format
       */
      create: function(date) {
        return require(['controllers/create'], function(Controller) {
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
        return require(['controllers/create'], function(Controller) {
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
        return require(['controllers/create'], function(Controller) {
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
        return require(['controllers/cancel'], function(Controller) {
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
        require(['controllers/cancel'], function(Controller) {});
        controller = new Controller();
        return controller.review(appointment);
      },

      /**
      * render confirmation page for cancel appointment flow
      * @param {object} appointment - Selected Appointment model
       */
      cancelConfirmation: function(appointment) {
        return require(['controllers/cancel'], function(Controller) {
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
        return require(['controllers/update'], function(Controller) {
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
        return require(['controllers/update'], function(Controller) {
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
        return require(['controllers/update'], function(Controller) {
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
        return require(['controllers/detail'], function(Controller) {
          var controller;
          controller = new Controller(id);
          return controller.index(id);
        });
      },

      /**
       * render calendar component
       */
      calendar: function() {
        return require(['controllers/calendar'], function(Controller) {
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
        return require(['controllers/calendar-navigation'], function(Controller) {
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
        return require(['controllers/header'], function(Controller) {
          var controller;
          controller = new Controller(options);
          return controller.initialize(options);
        });
      },

      /**
       * Create filter component, filter by Trainer and Duration
       */
      trainerFilter: function() {
        return require(['controllers/trainer'], function(Controller) {
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
        return require(['controllers/error'], function(Controller) {
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
        $('#app-main').css({
          opacity: 0
        }).animate({
          opacity: 1
        }, 600);
      },

      /**
      *   Route to default page. Full app reload
       */
      defaultPage: function() {
        return Backbone.history.navigate('', {
          trigger: true
        });
      }
    });
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var App, Marionette, Model, View, collection, createCollection, moment;
    Marionette = require('marionette');
    App = require('app');
    moment = require('moment');
    View = require('views/calendar/navigation');
    Model = Backbone.Model.extend();
    collection = new Backbone.Collection();
    createCollection = function(startDate) {
      var date, i, model, _i;
      date = moment(startDate);
      model;
      for (i = _i = 0; _i <= 6; i = _i += 1) {
        model = new Model({
          dataDate: date.format('YYYY-MM-DD'),
          date: date.format('ddd'),
          dateShort: date.format('dd'),
          month: date.format('MMM'),
          day: date.format('DD'),
          current: i === 0 ? 'mobile-current current' : ''
        });
        collection.add(model);
        date.add('days', 1);
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
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var App, Marionette, Model, View, daysHeader, getDates, moment, msgBus;
    Marionette = require('marionette');
    App = require('app');
    msgBus = require('msgbus');
    moment = require('moment');
    View = require('views/calendar');
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
          date: date.format('ddd'),
          day: date.format('DD'),
          month: date.format('MMM'),
          selected: i === 0 ? 'selected' : null
        });
        daysHeader.add(model);
        date.add('days', 1);
      }
      return daysHeader;
    };
    return module.exports = Marionette.Controller.extend({
      index: function() {
        var date;
        date = App.filterCriteria.get('startDate');
        require(['entities/appointments'], function() {
          var promise;
          promise = msgBus.reqres.request('entities:appointments', date);
          promise.done(function(appointments) {
            daysHeader.reset();
            daysHeader = getDates(date);
            module.exports = new View({
              appointments: appointments,
              dates: daysHeader
            });
          });
          promise.fail(function(model, jqXHR, textStatus) {
            return msgBus.reqres.request('schedule:error', {
              error: [model, jqXHR, textStatus]
            });
          });
        });
      }
    });
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var App, CancelView, ConfirmationView, Marionette, ReviewView, msgBus, view;
    Marionette = require('marionette');
    App = require('app');
    msgBus = require('msgbus');
    CancelView = require('views/cancel/index');
    ReviewView = require('views/cancel/review');
    ConfirmationView = require('views/cancel/confirmation');
    view = null;
    App.flow = 'cancel';
    return module.exports = Marionette.Controller.extend({
      index: function(id) {
        msgBus.reqres.request('schedule:header', {
          pageTitle: 'Cancel your session'
        });
        return require(['entities/appointment'], function() {
          var promise;
          promise = msgBus.reqres.request('entities:appointment', id);
          promise.done(function(appointment) {
            view = new CancelView({
              model: appointment
            });
            App.layout.content.show(view);
            return App.analytics.set({
              action: 'delete-start'
            });
          });
          return promise.fail(function(model, jqXHR, textStatus) {
            return msgBus.reqres.request('schedule:error', {
              error: [model, jqXHR, textStatus]
            });
          });
        });
      },
      review: function(appointment) {
        msgBus.reqres.request('schedule:header', {
          pageTitle: 'Cancel your session'
        });
        view = new ReviewView({
          model: appointment
        });
        App.layout.content.show(view);
        return App.analytics.set({
          action: 'delete-review'
        });
      },
      confirmation: function(appointment) {
        var data;
        data = _.pick(appointment.toJSON(), 'id', 'cancelAll', 'message');
        return require(['entities/cancel'], function() {
          var promise;
          promise = msgBus.reqres.request('entities:cancel:appointment', data);
          promise.done(function(response) {
            appointment.set({
              id: response.id,
              APIEndpoint: App.APIEndpoint
            });
            msgBus.reqres.request('schedule:header', {
              pageTitle: 'Your session is canceled'
            });
            view = new ConfirmationView({
              model: appointment
            });
            App.layout.content.show(view);
            return App.analytics.set({
              action: 'delete-complete'
            });
          });
          return promise.fail(function(response) {
            return msgBus.reqres.request('schedule:error', response.responseJSON);
          });
        });
      }
    });
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var App, ConfirmationView, Marionette, ReviewView, msgBus, view;
    Marionette = require('marionette');
    App = require('app');
    msgBus = require('msgbus');
    ReviewView = require('views/create/review');
    ConfirmationView = require('views/create/confirmation');
    view = null;
    App.flow = 'create';
    module.exports = Marionette.Controller.extend({
      index: function(date) {
        console.log('Create: date attr', date);
        date = App.utils.isValidDate(date) ? date : App.utils.TOMORROW;
        msgBus.reqres.request('schedule:header', {
          pageTitle: 'Schedule Training'
        });
        msgBus.reqres.request('schedule:trainer:filter');
        msgBus.reqres.request('schedule:calendar:navigation', {
          startDate: date
        });
        App.filterCriteria.set({
          startDate: date
        });
        return App.analytics.set({
          action: 'add-start'
        });
      },
      review: function(appointment) {
        msgBus.reqres.request('schedule:header', {
          pageTitle: 'Review your session'
        });
        view = new ReviewView({
          model: appointment
        });
        App.layout.filter.close();
        App.layout.navigation.close();
        App.layout.content.show(view);
        return App.analytics.set({
          action: 'add-review'
        });
      },
      confirmation: function(appointment) {
        var data;
        data = _.pick(appointment.toJSON(), 'id', 'sessionTypeId', 'trainerId', 'startDate', 'endDate', 'message');
        return require(['entities/create'], function() {
          var promise;
          promise = msgBus.reqres.request('entities:create:appointment', data);
          promise.done(function(response) {
            appointment.set({
              id: response.id,
              APIEndpoint: App.APIEndpoint
            });
            msgBus.reqres.request('schedule:header', {
              pageTitle: 'Enjoy your workout.'
            });
            view = new ConfirmationView({
              model: appointment
            });
            App.layout.navigation.close();
            App.layout.content.show(view);
            return App.analytics.set({
              action: 'add-complete'
            });
          });
          return promise.fail(function(response) {
            return msgBus.reqres.request('schedule:error', response.responseJSON);
          });
        });
      }
    });
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var App, Marionette, View, msgBus, view;
    Marionette = require('marionette');
    App = require('app');
    msgBus = require('msgbus');
    View = require('views/detail/index');
    view = null;
    App.flow = 'detail';
    module.exports = Marionette.Controller.extend({
      index: function(id) {
        msgBus.reqres.request('schedule:header', {
          pageTitle: 'Session Detail'
        });
        return require(['entities/appointment'], function() {
          var promise;
          promise = msgBus.reqres.request('entities:appointment', id);
          promise.done(function(appointment) {
            view = new View({
              model: appointment
            });
            return App.layout.content.show(view);
          });
          return promise.fail(function(model, jqXHR, textStatus) {
            return msgBus.reqres.request('schedule:error', {
              error: [model, jqXHR, textStatus]
            });
          });
        });
      }
    });
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var App, Marionette, Model, View, model, msgBus;
    Marionette = require('marionette');
    App = require('app');
    msgBus = require('msgbus');
    Model = require('entities/error');
    View = require('views/error');
    model = new Model();
    module.exports = Marionette.Controller.extend({
      initialize: function(options) {
        msgBus.reqres.request('schedule:header', {
          pageTitle: 'Error',
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
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var App, Marionette, Model, View, model, view;
    Marionette = require('marionette');
    App = require('app');
    Model = require('entities/header');
    View = require('views/header');
    model = new Model();
    view = new View({
      model: model
    });
    return module.exports = Marionette.Controller.extend({
      initialize: function(options) {
        model.set(options);
        return App.layout.header.show(view);
      }
    });
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var App, Marionette, Model, View, model, view;
    App = require('app');
    Marionette = require('marionette');
    View = require('views/filter/trainer');
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
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var App, ConfirmationView, Marionette, ReviewView, moment, msgBus, originalAppointment, view;
    Marionette = require('marionette');
    App = require('app');
    msgBus = require('msgbus');
    moment = require('moment');
    ReviewView = require('views/update/review');
    ConfirmationView = require('views/update/confirmation');
    view = null;
    originalAppointment = null;
    App.flow = 'update';
    module.exports = Marionette.Controller.extend({
      index: function(id) {
        return require(['entities/appointment'], function() {
          var promise;
          promise = msgBus.reqres.request('entities:appointment', id);
          promise.done(function(appointment) {
            var date, startDate, uiDate;
            originalAppointment = appointment;
            date = appointment.get('startDate');
            startDate = moment(date).format('YYYY-MM-DD');
            uiDate = moment(date).format('MMM D @ H A');
            msgBus.reqres.request('schedule:header', {
              pageTitle: 'Reschedule Training',
              subTitle: 'edit the time for <strong>' + uiDate + '</strong> and notify your trainer'
            });
            msgBus.reqres.request('schedule:calendar:navigation', {
              startDate: startDate
            });
            App.filterCriteria.set({
              startDate: startDate,
              trainerId: appointment.get('trainerId'),
              trainerName: appointment.get('trainerFirstName' + ' ' + appointment.get('trainerLastName')),
              sessionTypeId: appointment.get('sessionTypeId'),
              duration: appointment.get('duration')
            });
            App.filterCriteria.trigger('change');
            return App.analytics.set({
              action: 'edit-start'
            });
          });
          promise.fail(function(model, jqXHR, textStatus) {});
          return msgBus.reqres.request('schedule:error', {
            error: [model, jqXHR, textStatus]
          });
        });
      },
      review: function(appointment) {
        msgBus.reqres.request('schedule:header', {
          pageTitle: 'Review your session',
          subTitle: null
        });
        view = new ReviewView({
          model: appointment,
          original: originalAppointment
        });
        App.layout.navigation.close();
        App.layout.content.show(view);
        return App.analytics.set({
          action: 'edit-review'
        });
      },
      confirmation: function(appointment) {
        var data;
        appointment.set({
          id: originalAppointment.id
        });
        data = _.pick(appointment.toJSON(), 'id', 'sessionTypeId', 'trainerId', 'startDate', 'endDate', 'message');
        require(['entities/update'], function() {
          var promise;
          promise = msgBus.reqres.request('entities:update:appointment', data);
          return promise.done(function(response) {});
        });
        appointment.set({
          id: response.id,
          APIEndpoint: App.APIEndpoint
        });
        msgBus.reqres.request('schedule:header', {
          pageTitle: 'Enjoy your workout.',
          subTitle: null
        });
        view = new ConfirmationView({
          model: appointment,
          original: originalAppointment
        });
        App.layout.navigation.close();
        App.layout.content.show(view);
        App.analytics.set({
          action: 'edit-complete'
        });
        return promise.fail(function(response) {
          return msgBus.reqres.request('schedule:error', response.responseJSON);
        });
      }
    });
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var Backbone;
    Backbone = require('backbone');
    return module.exports = Backbone.Model.extend({
      defaults: {
        trainerId: '',
        facilityId: '',
        timeOffset: '',
        action: '',
        availSlots: ''
      },
      initialize: function() {
        return this.on('change:action', this.save, this);
      },
      save: function() {
        return window.tagData.ptSchedule = this.toJSON();
      }
    });
  });

}).call(this);


/**
 * @module entities/appointments
 */

(function() {
  define(function(require) {
    var API, App, Appointments, DayPart, Loading, loadingView, msgBus;
    App = require('app');
    msgBus = require('msgbus');
    Loading = require('views/spinner');
    loadingView = new Loading();
    DayPart = Backbone.Model.extend({
      defaults: {
        morning: null,
        afternoon: null,
        evening: null
      }
    });
    Appointments = Backbone.Collection.extend({
      model: DayPart
    });
    API = {

      /**
       * @name getAppointments
       * @function
       * @returns {object} promise object
       */
      getAppointments: function() {
        var appointments, deferred;
        appointments = new Appointments();
        deferred = $.Deferred();
        App.layout.content.show(loadingView);
        appointments.url = function() {
          var query;
          query = '?startDate=' + App.filterCriteria.get('startDate') + '&sessionTypeId=' + App.filterCriteria.get('sessionTypeId') + '&trainerId=' + App.filterCriteria.get('trainerId');
          return App.APIEndpoint + 'appointments' + query;
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
  });

}).call(this);

(function() {
  define(function(require) {
    var API, App, Loading, Model, loadingView, msgBus;
    App = require('app');
    msgBus = require('msgbus');
    Loading = require('views/spinner');
    loadingView = new Loading();
    Model = Backbone.Model.extend({
      defaults: {
        id: null,
        cancelAll: null,
        message: null
      },
      url: function() {
        return App.APIEndpoint + 'cancel';
      }
    });
    API = {

      /**
       * @name cancelAppointment
       * @function
       * @returns {object} promise object
       */
      cancelAppointment: function(data) {
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
    };
    return msgBus.reqres.setHandler('entities:cancel:appointment', function(data) {
      return API.cancelAppointment(data);
    });
  });

}).call(this);

(function() {
  define(function(require) {
    var API, App, Loading, Model, loadingView, msgBus;
    App = require('app');
    msgBus = require('msgbus');
    Loading = require('views/spinner');
    loadingView = new Loading();
    Model = Backbone.Model.extend({
      defaults: {
        trainerId: null,
        sessionTypeId: null,
        startDate: null,
        endDate: null,
        message: null
      },
      url: function() {
        return App.APIEndpoint + 'create';
      }
    });
    API = {

      /**
      * @name createAppointment
      * @function
      * @returns {object} promise object
       */
      createAppointment: function(data) {
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
    };
    return msgBus.reqres.setHandler('entities:create:appointment', function(data) {
      return API.createAppointment(data);
    });
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var Backbone, msgBus;
    msgBus = require('msgbus');
    Backbone = require('backbone');
    module.exports = Backbone.Model.extend({
      defaults: {
        trainerId: null,
        trainerName: null,
        sessionTypeId: null,
        duration: null,
        startDate: null
      },
      initialize: function() {
        return this.on('change', this.updateCalendar);
      },
      updateCalendar: function() {
        return msgBus.reqres.request('schedule:calendar', {
          startDate: this.get('startDate'),
          trainerId: this.get('trainerId'),
          sessionTypeId: this.get('sessionTypeId')
        });
      }
    });
  });

}).call(this);

(function() {
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

}).call(this);

(function() {
  define(function(require, exports, module) {
    return module.exports = Backbone.Model.extend({
      defaults: {
        pageTitle: null,
        subTitle: null
      }
    });
  });

}).call(this);

(function() {
  define(function(require) {
    var API, App, Loading, Model, loadingView, msgBus;
    App = require('app');
    msgBus = require('msgbus');
    Loading = require('views/spinner');
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

}).call(this);

(function() {
  define('bootstrap', function(require) {
    var App, Router, proxiedSync;
    App = require('app');
    Router = require('router');
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
      App.APIEndpoint = _.isNull(options.APIEndpoint) ? null : options.APIEndpoint + '/personal-training-schedule/';
      App.MainDomain = options.MainDomain;
      return Backbone.history.start({
        pushState: true,
        root: options.root
      });
    });
    $(function() {
      return App.start({
        root: '/personal-training/schedule',
        scheduleCriteria: window.scheduleCriteria || {},
        APIEndpoint: window.APIEndpoint || null,
        MainDomain: window.MainDomain || null
      });
    });
  });

  require(['./config'], function() {
    return require(['bootstrap', 'debug']);
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var AppController, Wreqr, controller, msgBus;
    Wreqr = require('backbone.wreqr');
    AppController = require('controllers/app_controller');
    controller = new AppController();
    msgBus = {
      reqres: new Wreqr.RequestResponse(),
      commands: new Wreqr.Commands(),
      events: new Wreqr.EventAggregator()
    };
    msgBus.commands.setHandler('scroll:top', function() {
      return controller.scroll();
    });
    msgBus.reqres.setHandler('schedule:calendar:navigation', function(options) {
      return controller.navigation(options);
    });
    msgBus.reqres.setHandler('schedule:header', function(options) {
      return controller.header(options);
    });
    msgBus.reqres.setHandler('schedule:trainer:filter', function() {
      return controller.trainerFilter();
    });
    msgBus.reqres.setHandler('schedule:calendar', function() {
      return controller.calendar();
    });
    msgBus.reqres.setHandler('schedule:error', function(options) {
      return controller.error(options);
    });
    msgBus.reqres.setHandler('schedule:create:review', function(id) {
      return controller.createReview(id);
    });
    msgBus.reqres.setHandler('schedule:create:confirmation', function(model) {
      return controller.createConfirmation(model);
    });
    msgBus.reqres.setHandler('schedule:cancel', function(id) {
      return controller.cancel(id);
    });
    msgBus.reqres.setHandler('schedule:cancel:review', function(appointment) {
      return controller.cancelReview(appointment);
    });
    msgBus.reqres.setHandler('schedule:cancel:confirmation', function(appointment) {
      return controller.cancelConfirmation(appointment);
    });
    msgBus.reqres.setHandler('schedule:update', function(id) {
      return controller.update(id);
    });
    msgBus.reqres.setHandler('schedule:update:review', function(appointment) {
      return controller.updateReview(appointment);
    });
    msgBus.reqres.setHandler('schedule:update:confirmation', function(appointment) {
      return controller.updateConfirmation(appointment);
    });
    module.exports = msgBus;
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var AppController;
    AppController = require('controllers/app_controller');
    module.exports = Marionette.AppRouter.extend({
      controller: new AppController(),
      appRoutes: {
        '': 'create',
        'create/:date': 'create',
        'cancel/:id': 'cancel',
        'update/:id': 'update',
        'detail/:id': 'detail',
        'error': 'error',
        '*allOthers': 'defaultPage'
      }
    });
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var App, AppointmentsLayout, CalendarHeaderItem, CalendarHeaderView, DayPartView, EmptyItem, Item, Marionette, calendarTemplate, emptyItemTemplate, headerItemTemplate, itemTemplate, moment, msgBus;
    Marionette = require('marionette');
    App = require('app');
    msgBus = require('msgbus');
    moment = require('moment');
    calendarTemplate = require('text!templates/calendar/index.tpl');
    itemTemplate = require('text!templates/calendar/item.tpl');
    emptyItemTemplate = require('text!templates/calendar/empty_item.tpl');
    headerItemTemplate = require('text!templates/calendar/header_item.tpl');
    Item = Marionette.ItemView.extend({
      tagName: 'li',
      template: _.template(itemTemplate),
      events: {
        'click .available': 'selectAppointment'
      },
      initialize: function() {
        this.addAttribute('data-item', this.model.get('indexOfWeek'));
        return this.addAttribute('data-date', this.model.get('startDate'));
      },
      onBeforeRender: function() {
        var endTime, meridiemIndicator, scheduled, startTime;
        startTime = null;
        endTime = null;
        meridiemIndicator = null;
        scheduled = this.model.has('id') ? ' scheduled' : false;
        if (this.model.get('isAvailable')) {
          startTime = moment(this.model.get('startDate')).format('hh:mm');
          endTime = moment(this.model.get('endDate')).format('hh:mm');
          meridiemIndicator = moment(this.model.get('endDate')).format('A');
          return this.model.set({
            cid: this.model.cid,
            className: scheduled ? 'scheduled' : 'available',
            appointment: startTime + ' - ' + endTime + ' ' + meridiemIndicator,
            scheduled: scheduled
          });
        }
      },
      addAttribute: function(attrName, attrValue) {
        return this.$el.attr(attrName, attrValue);
      },
      selectAppointment: function(e) {
        e.preventDefault();
        return msgBus.reqres.request('schedule:' + App.flow + ':review', this.options.model);
      }
    });
    EmptyItem = Marionette.ItemView.extend({
      tagName: 'li',
      className: 'empty',
      template: _.template(emptyItemTemplate),
      initialize: function() {
        return this.addClass('item-' + this.model.get('indexOfWeek'));
      },
      addClass: function(className) {
        return this.$el.addClass(className);
      }
    });
    DayPartView = Marionette.CollectionView.extend({
      tagName: 'ul',
      itemViewOptions: function(model, index) {
        return {
          itemIndex: index
        };
      },
      getItemView: function(item) {
        if (item.get('isAvailable')) {
          return Item;
        } else {
          return EmptyItem;
        }
      }
    });
    CalendarHeaderItem = Marionette.ItemView.extend({
      tagName: 'li',
      initialize: function() {
        if (this.model.get('selected')) {
          return this.$el.addClass('selected');
        }
      },
      template: _.template(headerItemTemplate)
    });
    CalendarHeaderView = Marionette.CollectionView.extend({
      tagName: 'ul',
      className: 'day-dates',
      itemView: CalendarHeaderItem
    });
    AppointmentsLayout = Marionette.Layout.extend({
      template: _.template(calendarTemplate),
      regions: {
        header: '.appointments-header',
        morning: '.morning',
        afternoon: '.afternoon',
        evening: '.evening'
      },
      events: {
        'click .toggle-day': 'toggleDayPart'
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
        collection: new Backbone.Collection(options.appointments.models[0].get('morning'))
      }));
      appointmentsLayout.afternoon.show(new DayPartView({
        collection: new Backbone.Collection(options.appointments.models[0].get('afternoon'))
      }));
      return appointmentsLayout.evening.show(new DayPartView({
        collection: new Backbone.Collection(options.appointments.models[0].get('evening'))
      }));
    };
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var Marionette, msgBus, template;
    Marionette = require('marionette');
    msgBus = require('msgbus');
    template = require('text!templates/error.tpl');
    module.exports = Marionette.ItemView.extend({
      className: 'error',
      template: _.template(template),
      initialize: function() {
        return msgBus.commands.execute('scroll:top');
      }
    });
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var App, Marionette, template;
    App = require('app');
    Marionette = require('marionette');
    template = require('text!templates/filter/trainer.tpl');
    return module.exports = Marionette.ItemView.extend({
      template: _.template(template),
      events: {
        'change .select-duration': 'selectDuration',
        'change .select-trainer': 'selectTrainer'
      },
      onBeforeRender: function() {
        this.model.set({
          defaultTrainer: App.filterCriteria.get('trainerName')
        });
        return this.model.set({
          defaultDuration: App.filterCriteria.get('duration')
        });
      },
      onRender: function() {
        if (_.isEqual(1, _.size(this.model.get('trainers')))) {
          this.ui.selectTrainer.closest('div').hide();
          return this.ui.selectDuration.closest('div').css({
            'float': 'none',
            'margin': '0 auto'
          });
        }
      },
      ui: {
        selectDuration: 'select.select-duration',
        selectTrainer: 'select.select-trainer'
      },
      selectTrainer: function() {
        this.ui.selectTrainer.prev('.option').text($('option:selected', this.ui.selectTrainer).text());
        return App.filterCriteria.set({
          trainerId: $('option:selected', this.ui.selectTrainer).val()
        });
      },
      selectDuration: function() {
        this.ui.selectDuration.prev('.option').text($('option:selected', this.ui.selectDuration).text());
        return App.filterCriteria.set({
          sessionTypeId: $('option:selected', this.ui.selectDuration).val()
        });
      }
    });
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var Marionette, template;
    Marionette = require('marionette');
    template = require('text!templates/header.tpl');
    return module.exports = Marionette.ItemView.extend({
      template: _.template(template)
    });
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var Marionette, template;
    Marionette = require('marionette');
    template = require('text!templates/layout.tpl');
    return module.exports = Marionette.Layout.extend({
      template: _.template(template),
      regions: {
        header: '.header',
        filter: '.trainer-filter',
        navigation: '.navigation',
        content: '.content'
      }
    });
  });

}).call(this);
