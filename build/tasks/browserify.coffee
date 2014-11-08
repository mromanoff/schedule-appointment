module.exports = ->
  @loadNpmTasks "grunt-browserify"

  # Wipe out previous builds and test reporting.
  @config "browserify",
    vendor:
      src: []
      dest: 'public/vendor.js'
      options:
        require: ['jquery']
        alias: [
          './lib/moments.js:momentWrapper'
          'events:evt'
        ]
    client:
      src: ['client/**/*.js']
      dest: 'public/app.js'
      options:
        external: ['jquery', 'momentWrapper']
