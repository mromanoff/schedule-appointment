module.exports = ->
  @loadNpmTasks "grunt-browserify"

  # Wipe out previous builds and test reporting.
  @config "browserify",
    vendor:
      options:
        banner: "/* Library bundle */"
        require: [
          "jquery"
          "underscore"
          "backbone"
          "backbone.wreqr"
          "backbone.babysitter"
          "backbone.marionette"
          "moment"
          "spinner"
        ]
      src: []
      dest: "public/vendor.js"

    client:
      options:
        transform: ["coffeeify", "hbsfy"]
        watch: true
        external: [
          "jquery"
          "underscore"
          "backbone"
          "backbone.marionette"
          "backbone.wreqr"
          "backbone.babysitter"
          "moment"
          "spinner"
        ]
      src: ["client/src/main.coffee"]
      dest: "public/app.js"

