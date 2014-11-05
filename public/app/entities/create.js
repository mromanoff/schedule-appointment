// Generated by CoffeeScript 1.8.0
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

//# sourceMappingURL=create.js.map
