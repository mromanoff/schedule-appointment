module.exports = ->

  # Load task configurations.
  @loadTasks "build/tasks"

  @registerTask "development", [
    "watch:css"
    "watch:coffee"
  ]

  # When running the default Grunt command, just lint the code.
  @registerTask "default", [
    "clean",
    "coffee:build"
  ]


