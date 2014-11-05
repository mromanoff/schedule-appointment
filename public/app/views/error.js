// Generated by CoffeeScript 1.8.0
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

//# sourceMappingURL=error.js.map