define(function (require, exports, module) {
    'use strict';

    var Marionette = require('marionette');
    var App = require('app');
    var msgBus = require('msgbus');
    var template = require('text!templates/update/confirmation.tpl');

    module.exports = Marionette.ItemView.extend({
        template: _.template(template),

        initialize: function () {
            msgBus.commands.execute('scroll:top');
        },

        events: {
            'click .cancel': 'cancelAppointment'
        },

        cancelAppointment: function (e) {
            e.preventDefault();
            App.navigate('cancel/' + this.options.original.id, {trigger: false});
            msgBus.reqres.request('schedule:cancel', this.options.original.id);
        }
    });
});