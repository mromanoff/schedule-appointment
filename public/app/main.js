// Generated by CoffeeScript 1.8.0
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
        root: '/',
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

//# sourceMappingURL=main.js.map