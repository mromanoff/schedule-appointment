###*
* Utilities Module
*
* Useful utilities we will use throughout the app
*
* @name Utils
* @class Utils
###

moment = require "moment"

Utils = () ->
  ## @constant {string} ##
  @STARTDATE = moment().add("days", 1).format "YYYY-MM-DD"
  ## @constant {string} ##
  @ENDDATE = moment().add("days", 30).format "YYYY-MM-DD"
  ## @constant {string} ##
  @TOMORROW = moment().add("days", 1).format "YYYY-MM-DD"
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


      console.log('Attr: date', date)
      console.log('isAfter ', moment(date).isAfter(this.STARTDATE))
      console.log('isBefore ', moment(date).isBefore(this.ENDDATE))
      console.log('isSame as Start ', moment(date).isSame(this.STARTDATE))
      console.log('isSame as End ', moment(date).isSame(this.ENDDATE))
      console.log('Return', (isAfter && isBefore) || (isStart || isEnd))

      (isAfter and isBefore) or (isStart or isEnd)

module.exports = Utils



