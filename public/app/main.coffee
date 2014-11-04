define 'bootstrap', (require) ->

  App = require 'app'
  Router = require 'router'

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

  App.addInitializer (options) ->
  #Define your master router on the application namespace and trigger all
  #navigation from this instance.
    App.Router = new Router()
    App.scheduleCriteria = options.scheduleCriteria
    App.APIEndpoint = if _.isNull options.APIEndpoint  then null else options.APIEndpoint + '/personal-training-schedule/'
    App.MainDomain = options.MainDomain

    #Trigger the initial route and enable HTML5 History API support, set the
    #Backbone.history.start({ pushState: true, root: options.root });
    Backbone.history.start
      pushState: true
      root: options.root


  $ () ->
    App.start
      root: '/',
      scheduleCriteria: window.scheduleCriteria || {},
      APIEndpoint: window.APIEndpoint || null,
      MainDomain: window.MainDomain || null


  return



# Break out the application running from the configuration definition to
# assist with testing.
require ['./config'], () ->
  #Kick off the application.
  require ['bootstrap', 'debug']
