###*
  * Main Module
###


$ = require "jquery"
_ = require "underscore"
Backbone = require "backbone"
Backbone.$  = $

app = require "./app.coffee"
Router = require "./router.coffee"

# set ajax cross domain and credentials here
proxiedSync = Backbone.sync;

Backbone.sync = (method, model, options) ->
  options = options || {};

  if !options.crossDomain
    options.crossDomain = true;


  if  !options.xhrFields
    options.xhrFields =
      withCredentials: true

    proxiedSync(method, model, options);

app.addInitializer (options) ->
#Define your master router on the application namespace and trigger all
#navigation from this instance.
  app.Router = new Router()
  app.scheduleCriteria = options.scheduleCriteria
  app.APIEndpoint = if _.isNull options.APIEndpoint  then null else options.APIEndpoint + "/personal-training-schedule/"
  app.MainDomain = options.MainDomain

  #Trigger the initial route and enable HTML5 History API support, set the
  #Backbone.history.start({ pushState: true, root: options.root });
  Backbone.history.start
    pushState: true
    root: options.root


$ () ->
  app.start
    root: "/personal-training/schedule"
    scheduleCriteria: window.scheduleCriteria or {}
    APIEndpoint: window.APIEndpoint or null
    MainDomain: window.MainDomain or null

  return

