// Generated by CoffeeScript 1.8.0
(function() {
  define(function(require, exports, module) {
    var App, Marionette, Model, View, daysHeader, getDates, moment, msgBus;
    Marionette = require('marionette');
    App = require('app');
    msgBus = require('msgbus');
    moment = require('moment');
    View = require('views/calendar/index');
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
        return;
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

//# sourceMappingURL=calendar.js.map