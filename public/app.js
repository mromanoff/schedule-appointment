(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee":[function(require,module,exports){

/**
  * app Module
 */
var $, Backbone, Marionette, app, _;

$ = require("jquery");

_ = require("underscore");

Backbone = require("backbone");

Backbone.$ = $;

Marionette = require("backbone.marionette");

app = new Marionette.Application;

app.addRegions({
  mainRegion: "#app-main"
});

app.on("before:start", function(options) {
  if (options == null) {
    options = {};
  }
});

app.on("start", function() {
  return console.log("start");
});

app.addInitializer(function(options) {
  return _.extend(app, options);
});

window.app = app;

module.exports = app;



},{"backbone":"backbone","backbone.marionette":"backbone.marionette","jquery":"jquery","underscore":"underscore"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/main.coffee":[function(require,module,exports){

/**
  * Main Module
 */
var app, options;

if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}

app = require("./app.coffee");

options = {
  scheduleCriteria: window.scheduleCriteria || {},
  APIEndpoint: window.APIEndpoint || null,
  MainDomain: window.MainDomain || null
};

app.start(options);



},{"./app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee"}]},{},["/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/main.coffee"]);
