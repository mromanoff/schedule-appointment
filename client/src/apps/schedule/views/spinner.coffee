###*
 * View Spinner
 * @module views/spinner
###

Marionette = require "backbone.marionette"
Spinner = require "spinner"

class View extends Marionette.ItemView
  template:  require "../../templates/spinner.hbs"
  id: "spinner"

  initialize: (options) ->
    options = (options || {})
    @title = options.title or null #"Loading Data";
    @message = options.message or null #"Please wait, data is loading.";

  serializeData: () ->
    title: @title
    message: @message

  onShow: () ->
    opts =
      lines: 13 #The number of lines to draw
      length: 7 #The length of each line
      width: 2 #The line thickness
      radius: 10 #The radius of the inner circle
      corners: 0 #Corner roundness (0..1)
      rotate: 0 #The rotation offset
      color: "#000" #rgb or #rrggbb
      speed: 1 #Rounds per second
      trail: 52 #Afterglow percentage
      shadow: false #Whether to render a shadow
      hwaccel: false #Whether to use hardware acceleration
      className: "spinner" #The CSS class to assign to the spinner
      zIndex: 2e9 #The z-index (defaults to 2000000000)
      top: "50%" #Top position relative to parent in px
      left: "50%" #Left position relative to parent in px

    target = document.getElementById @el.id
    new Spinner(opts).spin target

module.exports = View