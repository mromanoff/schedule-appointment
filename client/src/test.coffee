say = require "./test2.coffee"

$ = require "jquery"
_ = require "underscore"
Backbone    = require "backbone"
Backbone.$  = $

Marionette = require "backbone.marionette"

message = "there"
name = "Michael"



console.log say message, name


Model = Backbone.Model.extend
  defaults:
    name: "Michael from Model"

model =  new Model()

model.set
  name: "Michael Romanoff3"


console.log model.get "name"

obj = _.extend
  "a": "one"
  "b": "two"

console.log obj.a, obj.b

console.log obj


mapp = new Marionette.Application()

console.dir Marionette