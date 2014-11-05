// Generated by CoffeeScript 1.8.0
(function() {
  define(function(require, exports, module) {
    var Utils, moment;
    moment = require('moment');

    /**
    * Utilities
    *
    * Useful utilities we will use throughout the app
    *
    * @name Utils
    * @class Utils
     */
    Utils = function() {
      this.STARTDATE = moment().add('days', 1).format('YYYY-MM-DD');
      this.ENDDATE = moment().add('days', 30).format('YYYY-MM-DD');
      this.TOMORROW = moment().add('days', 1).format('YYYY-MM-DD');
    };
    Utils.prototype = {

      /**
      * @name isValidDate
      * @function
      * @param {string} date - 2014-05-31 format
      * @returns {boolean}
       */
      isValidDate: function(date) {
        var isAfter, isBefore, isEnd, isStart;
        isAfter = moment(date).isAfter(this.STARTDATE);
        isBefore = moment(date).isBefore(this.ENDDATE);
        isStart = moment(date).isSame(this.STARTDATE);
        isEnd = moment(date).isSame(this.ENDDATE);
        return (isAfter && isBefore) || (isStart || isEnd);
      }
    };
    module.exports = Utils;
  });

}).call(this);

//# sourceMappingURL=utils.js.map
