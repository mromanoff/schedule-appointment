module.exports = ->
  @loadNpmTasks "grunt-contrib-coffee"

  # Compile coffee schripts
  @config "coffee",
    build:
      #options:
        #join: true
        #sourceMap: true
      #,
      files:
        'public/dist/app.js': [
          'public/app/**/*.coffee'
          '!public/app/node_modules/**/*.coffee'
        ]