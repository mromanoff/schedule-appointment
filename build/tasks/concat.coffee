module.exports = ->
  @loadNpmTasks "grunt-contrib-concat"

  # concatiate files
  @config "concat",
    dist:
      src: [
        "public/vendor.js"
        "public/app.js"
      ]
      dest: "public/main.js"
