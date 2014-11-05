define (require, exports, module) ->

  Backbone = require 'backbone'

  #use empty string as a default, coz omniture DTM doesn't like null value
  module.exports = Backbone.Model.extend
    defaults:
      trainerId: ''  # first trainer in the list is default trainer
      facilityId: ''
      timeOffset: ''
      action: ''
      availSlots: '' #TODO wishlist


    initialize: () ->
      @on('change:action', @save, @)


    save: () ->
      #update global tagData.ptSchedule object
      #console.log('Save Analytics', this.toJSON());
      window.tagData.ptSchedule = this.toJSON();

      #TODO: commented for debugging //
      #_satellite.pageBottom();