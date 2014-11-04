define(function (require) {
    'use strict';

    var App = require('app');
    var msgBus = require('msgbus');
    var Loading = require('views/spinner');

    var loadingView = new Loading();
    var Model = Backbone.Model.extend({
        defaults: {
            trainerId: null,
            sessionTypeId: null,
            startDate: null,
            endDate: null,
            message: null
        },

        url: function () {
            return App.APIEndpoint + 'create';
        }
    });


    var API = {
        /**
         * @name createAppointment
         * @function
         * @returns {object} promise object
         */
        createAppointment: function (data) {
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

    msgBus.reqres.setHandler('entities:create:appointment', function (data) {
        return API.createAppointment(data);
    });
});



