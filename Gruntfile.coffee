module.exports = ->

  # Load task configurations.
  @loadTasks "build/tasks"

  @registerTask "development", [
    "browserify:vendor"
    "browserify:client"
    "concat"
    "watch:concat"
  ]

  @registerTask "default", [
    "clean"
    "browserify:vendor"
    "browserify:client"
    "concat"
  ]


