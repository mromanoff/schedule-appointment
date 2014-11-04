define(function (require, exports, module) {
    'use strict';

    var Backbone = require('backbone');

    module.exports = Backbone.Model.extend({
        defaults: {
            message: 'Please try again later.',
            code: null,
            exception: null,
            data: null
        }
    });
});

