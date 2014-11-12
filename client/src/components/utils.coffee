###*
* Utils Module
*
* Useful utilities we will use throughout the app
*
* @name Utils
* @class Utils
###

moment = require "moment"


class Utils
  constructor: () ->
    ## @constant {string} ##
    @STARTDATE = moment().add("days", 1).format "YYYY-MM-DD"
    ## @constant {string} ##
    @ENDDATE = moment().add("days", 30).format "YYYY-MM-DD"
    ## @constant {string} ##
    @TOMORROW = moment().add("days", 1).format "YYYY-MM-DD"

  isValidDate: (date) ->
    isAfter = moment(date).isAfter @STARTDATE
    isBefore = moment(date).isBefore @ENDDATE
    isStart = moment(date).isSame @STARTDATE
    isEnd = moment(date).isSame @ENDDATE

    ###
      console.log 'Attr: date', date
      console.log 'isAfter ', moment(date).isAfter @STARTDATE
      console.log 'isBefore ', moment(date).isBefore @ENDDATE
      console.log 'isSame as Start ', moment(date).isSame @STARTDATE
      console.log 'isSame as End ', moment(date).isSame @ENDDATE
      console.log 'Return', (isAfter && isBefore) || (isStart || isEnd)
    ###

    (isAfter and isBefore) or (isStart or isEnd)

module.exports = Utils



