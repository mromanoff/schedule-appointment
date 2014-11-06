define (require, exports, module) ->
    moment = require 'moment'
    ###*
    * Utilities
    *
    * Useful utilities we will use throughout the app
    *
    * @name Utils
    * @class Utils
    ###
    Utils = () ->
      ## @constant {string} ##
      @STARTDATE = moment().add('days', 1).format 'YYYY-MM-DD'
      ## @constant {string} ##
      @ENDDATE = moment().add('days', 30).format 'YYYY-MM-DD'
      ## @constant {string} ##
      @TOMORROW = moment().add('days', 1).format 'YYYY-MM-DD'
      return

    Utils.prototype =
        ###*
        * @name isValidDate
        * @function
        * @param {string} date - 2014-05-31 format
        * @returns {boolean}
        ###
        isValidDate: (date) ->
          isAfter = moment(date).isAfter @STARTDATE
          isBefore = moment(date).isBefore @ENDDATE
          isStart = moment(date).isSame @STARTDATE
          isEnd = moment(date).isSame @ENDDATE
          (isAfter and isBefore) or (isStart or isEnd)

    module.exports = Utils
    return


