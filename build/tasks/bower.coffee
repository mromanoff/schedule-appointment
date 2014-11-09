module.exports = ->
  @loadNpmTasks "grunt-bower-task"

  @config "bower",
    install:
      options:
        targetDir: 'client/vendor/bower_components'
        layout: 'byComponent'
        verbose: true
        cleanup: true
