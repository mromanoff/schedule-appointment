define (require, exports, module) ->

  App = require 'app'
  Marionette = require 'marionette'
  template = require 'text!templates/filter/trainer.tpl'

  module.exports = Marionette.ItemView.extend
      template: _.template template

      events:
        'change .select-duration': 'selectDuration'
        'change .select-trainer': 'selectTrainer'

      onBeforeRender: () ->
        @model.set
          defaultTrainer: App.filterCriteria.get 'trainerName'

        @model.set
          defaultDuration: App.filterCriteria.get 'duration'

      onRender: () ->
        #hide selectTrainer if only one trainer
        if _.isEqual 1, _.size(@model.get 'trainers')
          @ui.selectTrainer.closest('div').hide()
          @ui.selectDuration.closest('div').css
            'float': 'none'
            'margin': '0 auto'

      ui:
        selectDuration: 'select.select-duration'
        selectTrainer: 'select.select-trainer'

      selectTrainer: () ->
        @ui.selectTrainer.prev('.option').text $('option:selected', @ui.selectTrainer).text()
        App.filterCriteria.set
          trainerId: $('option:selected', @ui.selectTrainer).val()

      selectDuration: () ->
        @ui.selectDuration.prev('.option').text $('option:selected', @ui.selectDuration).text()
        App.filterCriteria.set
          sessionTypeId: $('option:selected', @ui.selectDuration).val()

