// Generated by CoffeeScript 1.8.0
(function() {
  module.exports = function() {
    this.loadNpmTasks("grunt-contrib-watch");
    return this.config("watch", {
      css: {
        files: ['less/**/*.less'],
        tasks: ['less:dev']
      },
      coffee: {
        files: ['public/app'],
        tasks: ['coffee']
      }
    });
  };

}).call(this);

//# sourceMappingURL=watch.js.map
