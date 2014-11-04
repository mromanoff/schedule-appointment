define(function (require, exports, module) {
    'use strict';

    var Marionette = require('marionette');
    var App = require('app');
    var msgBus = require('msgbus');
    var View = require('views/detail/index');
    var view;

    App.flow = 'detail';

    module.exports = Marionette.Controller.extend({

        index: function (id) {
            msgBus.reqres.request('schedule:header', { pageTitle: 'Session Detail' });

            require(['entities/appointment'], function () {
                var promise = msgBus.reqres.request('entities:appointment', id);
                promise.done(function (appointment) {
                    view = new View({
                        model: appointment
                    });
                    App.layout.content.show(view);
                });

                promise.fail(function (model, jqXHR, textStatus) {
                    msgBus.reqres.request('schedule:error', { error: [model, jqXHR, textStatus]});
                });
            });
        }
    });
});