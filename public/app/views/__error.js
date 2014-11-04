define(function (require, exports, module) {
    'use strict';

    var Marionette = require('marionette');
    var msgBus = require('msgbus');
    var template = require('text!templates/error.tpl');

    module.exports = Marionette.ItemView.extend({
        className: 'error',
        template: _.template(template),
        initialize: function () {
            msgBus.commands.execute('scroll:top');
        }
    });
});