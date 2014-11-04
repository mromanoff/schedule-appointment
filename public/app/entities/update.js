define(function (require) {
    'use strict';

    var App = require('app');
    var msgBus = require('msgbus');
    var Loading = require('views/spinner');

    var loadingView = new Loading();
    var Model = Backbone.Model.extend({
        defaults: {
            id: null,
            trainerId: null,
            startDate: null,
            endDate: null,
            sessionTypeId: null,
            message: null
        },

        url: function () {
            return App.APIEndpoint + 'update';
        }
    });

    var API = {
        /**
         * @name updateAppointment
         * @function
         * @returns {object} promise object
         */
        updateAppointment: function (data) {
            var model = new Model();
            var deferred = $.Deferred();

            App.layout.content.show(loadingView);

            //setTimeout(function () {
            model.save(data, {
                success: deferred.resolve,
                error: deferred.reject
            });
            //}, 2000);
            return deferred.promise();
        }
    };

    msgBus.reqres.setHandler('entities:update:appointment', function (data) {
        return API.updateAppointment(data);
    });

});
