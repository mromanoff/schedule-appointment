module.exports = ->
  @loadNpmTasks "grunt-contrib-watch"

  # Wipe out previous builds and test reporting.
  @config "watch",
    concat:
      files: [
        "public/app.js",
        "public/vendor.js"
      ]
      tasks: ["concat"]
