// Generated by CoffeeScript 1.8.0
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
    return module.exports = Marionette.Controller.extend({
      initialize: function() {}
    }, model.set({
      trainers: App.scheduleCriteria.trainers,
      durations: App.scheduleCriteria.durations
    }), App.layout.filter.show(view));
  });

}).call(this);

//# sourceMappingURL=trainer.js.map