// Generated by CoffeeScript 1.8.0
(function() {
  module.exports = function() {
    this.loadTasks("build/tasks");
    return this.registerTask("default", ["clean", "jscs", "jshint", "qunit", "nodequnit"]);
  };

}).call(this);

//# sourceMappingURL=Gruntfile.js.map
