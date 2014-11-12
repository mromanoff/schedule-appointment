###*
  * Views Filter Trainer Module
###

$ = require "jquery"
_ = require "underscore"
Marionette = require "backbone.marionette"
app = require "../../app.coffee"


class View extends Marionette.ItemView
  template: require "../../../templates/filter/trainer.hbs"

  events:
    "change .select-duration": "selectDuration"
    "change .select-trainer": "selectTrainer"

  onBeforeRender: () ->
    @model.set
      defaultTrainer: app.filterCriteria.get "trainerName"

    @model.set
      defaultDuration: app.filterCriteria.get "duration"

  onRender: () ->
    #hide selectTrainer if only one trainer
    if _.isEqual 1, _.size(@model.get "trainers")
      @ui.selectTrainer.closest("div").hide()
      @ui.selectDuration.closest("div").css
        "float": "none"
        "margin": "0 auto"

  ui:
    selectDuration: "select.select-duration"
    selectTrainer: "select.select-trainer"

  selectTrainer: () ->
    @ui.selectTrainer.prev(".option").text $("option:selected", @ui.selectTrainer).text()
    app.filterCriteria.set
      trainerId: $("option:selected", @ui.selectTrainer).val()

  selectDuration: () ->
    @ui.selectDuration.prev(".option").text $("option:selected", @ui.selectDuration).text()
    app.filterCriteria.set
      sessionTypeId: $("option:selected", @ui.selectDuration).val()

module.exports = View