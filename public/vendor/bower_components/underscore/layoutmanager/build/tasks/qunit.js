// Generated by CoffeeScript 1.8.0
(function() {
  module.exports = function() {
    this.config("qunit", {
      options: {
        "--web-security": "no",
        coverage: {
          src: ["backbone.layoutmanager.js"],
          instrumentedFiles: "test/tmp",
          htmlReport: "test/report/coverage",
          coberturaReport: "test/report",
          lcovReport: "test/report",
          linesThresholdPct: 85
        }
      },
      files: ["test/index.html"]
    });
    return this.loadNpmTasks("grunt-qunit-istanbul");
  };

}).call(this);

//# sourceMappingURL=qunit.js.map