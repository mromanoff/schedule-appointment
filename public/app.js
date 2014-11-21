(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee":[function(require,module,exports){

/**
  * app Module
 */
var $, Application, Backbone, Marionette, app, _;

$ = require("jquery");

_ = require("underscore");

Backbone = require("backbone");

Backbone.$ = $;

Marionette = require("backbone.marionette");

Application = require("./config/application.coffee");

app = new Marionette.Application;

app.VERSION = "0.0.0";

app.rootRoute = "create";

app.addRegions({
  headerRegion: "#header-region",
  mainRegion: "#main-region",
  footerRegion: "#footer-region"
});

app.on("before:start", function(options) {
  if (options == null) {
    options = {};
  }
  return require("./apps/schedule/app.coffee");
});

app.addInitializer(function(options) {
  return _.extend(app, options);
});

app.on("start", function() {
  console.log("start app");
  if (Backbone.history) {
    Backbone.history.start();
    if (this.getCurrentRoute() === "") {
      return this.navigate(this.rootRoute, {
        trigger: true
      });
    }
  }
});

window.app = app;

module.exports = app;



},{"./apps/schedule/app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/apps/schedule/app.coffee","./config/application.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/config/application.coffee","backbone":"backbone","backbone.marionette":"backbone.marionette","jquery":"jquery","underscore":"underscore"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/apps/schedule/app.coffee":[function(require,module,exports){

/**
  * Schedule App
 */
var $, API, Backbone, Marionette, ScheduleApp, app, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$ = require("jquery");

_ = require("underscore");

Backbone = require("backbone");

Backbone.$ = $;

Marionette = require("backbone.marionette");

app = require("../../app.coffee");

ScheduleApp = {};

ScheduleApp.Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.appRoutes = {
    "": "createAppointment",
    "create/:date": "createAppointment",
    "cancel/:id": "cancelAppointment",
    "update/:id": "updateAppointment"
  };

  return Router;

})(Marionette.AppRouter);

API = {
  createAppointment: function(date) {
    var Controller;
    console.log("create", date);
    Controller = require("./create/controller.coffee");
    return new Controller().createAppointment();
  },
  cancelAppointment: function(id) {
    return console.log("cancel");
  },
  updateAppointment: function(id) {
    return console.log("update");
  }
};

app.addInitializer(function() {
  return new ScheduleApp.Router({
    controller: API
  });
});



},{"../../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","./create/controller.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/apps/schedule/create/controller.coffee","backbone":"backbone","backbone.marionette":"backbone.marionette","jquery":"jquery","underscore":"underscore"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/apps/schedule/create/controller.coffee":[function(require,module,exports){

/**
  * Controller Create Module
 */
var Controller, Marionette, app, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require("underscore");

Marionette = require("backbone.marionette");

app = require("../../../app.coffee");

Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.createAppointment = function() {
    this.layout = this.getLayoutView();
    this.layout.on("show", (function(_this) {
      return function() {
        return console.log("show layout");
      };
    })(this));
    console.log("app", app);
    return app.mainReqion.show(this.layout);
  };

  Controller.prototype.getLayoutView = function() {
    var Layout, layout;
    Layout = require("./view.coffee");
    return layout = new Layout;
  };

  return Controller;

})(Marionette.Controller);

module.exports = Controller;



},{"../../../app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee","./view.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/apps/schedule/create/view.coffee","backbone.marionette":"backbone.marionette","underscore":"underscore"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/apps/schedule/create/templates/layout.hbs":[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<header class=\"header\"></header>\n<div class=\"trainer-filter\"></div>\n<div class=\"navigation\"></div>\n<div class=\"content\"></div>\n";
  },"useData":true});

},{"hbsfy/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/apps/schedule/create/view.coffee":[function(require,module,exports){

/**
  * Schedule Create Layout View
 */
var Layout, Marionette,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Marionette = require("backbone.marionette");

Layout = (function(_super) {
  __extends(Layout, _super);

  function Layout() {
    return Layout.__super__.constructor.apply(this, arguments);
  }

  Layout.prototype.template = require("./templates/layout.hbs");

  Layout.prototype.regions = {
    header: ".header",
    filter: ".trainer-filter",
    navigation: ".navigation",
    content: ".content"
  };

  return Layout;

})(Marionette.LayoutView);

module.exports = Layout;



},{"./templates/layout.hbs":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/apps/schedule/create/templates/layout.hbs","backbone.marionette":"backbone.marionette"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/config/application.coffee":[function(require,module,exports){

/**
  * Application Config Module
 */
var Backbone, Marionette, _;

_ = require("underscore");

Backbone = require("backbone");

Marionette = require("backbone.marionette");

module.exports = _.extend(Backbone.Marionette.Application.prototype, {
  navigate: function(route, options) {
    if (options == null) {
      options = {};
    }
    if (route.charAt(0) === "/") {
      route = "#" + route;
    }
    return Backbone.history.navigate(route, options);
  },
  getCurrentRoute: function() {
    return Backbone.history.fragment;
  }
});



},{"backbone":"backbone","backbone.marionette":"backbone.marionette","underscore":"underscore"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/main.coffee":[function(require,module,exports){

/**
  * Main Module
 */
var app, options;

app = require("./app.coffee");

options = {
  scheduleCriteria: window.scheduleCriteria || {},
  APIEndpoint: window.APIEndpoint || null,
  MainDomain: window.MainDomain || null
};

app.start(options);



},{"./app.coffee":"/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/app.coffee"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars.runtime.js":[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var base = require("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = require("./handlebars/safe-string")["default"];
var Exception = require("./handlebars/exception")["default"];
var Utils = require("./handlebars/utils");
var runtime = require("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

Handlebars['default'] = Handlebars;

exports["default"] = Handlebars;
},{"./handlebars/base":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/base.js","./handlebars/exception":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/exception.js","./handlebars/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/runtime.js","./handlebars/safe-string":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/safe-string.js","./handlebars/utils":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/utils.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/base.js":[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];

var VERSION = "2.0.0";
exports.VERSION = VERSION;var COMPILER_REVISION = 6;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn) {
    if (toString.call(name) === objectType) {
      if (fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function(name) {
    delete this.helpers[name];
  },

  registerPartial: function(name, partial) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function(name) {
    delete this.partials[name];
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(/* [args, ]options */) {
    if(arguments.length === 1) {
      // A missing field in a {{foo}} constuct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new Exception("Missing helper: '" + arguments[arguments.length-1].name + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
        options = {data: data};
      }

      return fn(context, options);
    }
  });

  instance.registerHelper('each', function(context, options) {
    if (!options) {
      throw new Exception('Must pass iterator to #each');
    }

    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    var contextPath;
    if (options.data && options.ids) {
      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last  = (i === (context.length-1));

            if (contextPath) {
              data.contextPath = contextPath + i;
            }
          }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) {
              data.key = key;
              data.index = i;
              data.first = (i === 0);

              if (contextPath) {
                data.contextPath = contextPath + key;
              }
            }
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    var fn = options.fn;

    if (!Utils.isEmpty(context)) {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
        options = {data:data};
      }

      return fn(context, options);
    } else {
      return options.inverse(this);
    }
  });

  instance.registerHelper('log', function(message, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, message);
  });

  instance.registerHelper('lookup', function(obj, field) {
    return obj && obj[field];
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 3,

  // can be overridden in the host environment
  log: function(level, message) {
    if (logger.level <= level) {
      var method = logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, message);
      }
    }
  }
};
exports.logger = logger;
var log = logger.log;
exports.log = log;
var createFrame = function(object) {
  var frame = Utils.extend({}, object);
  frame._parent = object;
  return frame;
};
exports.createFrame = createFrame;
},{"./exception":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/exception.js","./utils":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/utils.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/exception.js":[function(require,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var line;
  if (node && node.firstLine) {
    line = node.firstLine;

    message += ' - ' + line + ':' + node.firstColumn;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (line) {
    this.lineNumber = line;
    this.column = node.firstColumn;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/runtime.js":[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];
var COMPILER_REVISION = require("./base").COMPILER_REVISION;
var REVISION_CHANGES = require("./base").REVISION_CHANGES;
var createFrame = require("./base").createFrame;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new Exception("No environment passed to template");
  }
  if (!templateSpec || !templateSpec.main) {
    throw new Exception('Unknown template object: ' + typeof templateSpec);
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  var invokePartialWrapper = function(partial, indent, name, context, hash, helpers, partials, data, depths) {
    if (hash) {
      context = Utils.extend({}, context, hash);
    }

    var result = env.VM.invokePartial.call(this, partial, name, context, helpers, partials, data, depths);

    if (result == null && env.compile) {
      var options = { helpers: helpers, partials: partials, data: data, depths: depths };
      partials[name] = env.compile(partial, { data: data !== undefined, compat: templateSpec.compat }, env);
      result = partials[name](context, options);
    }
    if (result != null) {
      if (indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    lookup: function(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function(i) {
      return templateSpec[i];
    },

    programs: [],
    program: function(i, data, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths) {
        programWrapper = program(this, i, fn, data, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(this, i, fn);
      }
      return programWrapper;
    },

    data: function(data, depth) {
      while (data && depth--) {
        data = data._parent;
      }
      return data;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = Utils.extend({}, common, param);
      }

      return ret;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  var ret = function(context, options) {
    options = options || {};
    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths;
    if (templateSpec.useDepths) {
      depths = options.depths ? [context].concat(options.depths) : [context];
    }

    return templateSpec.main.call(container, context, container.helpers, container.partials, data, depths);
  };
  ret.isTop = true;

  ret._setup = function(options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
    }
  };

  ret._child = function(i, data, depths) {
    if (templateSpec.useDepths && !depths) {
      throw new Exception('must pass parent depths');
    }

    return program(container, i, templateSpec[i], data, depths);
  };
  return ret;
}

exports.template = template;function program(container, i, fn, data, depths) {
  var prog = function(context, options) {
    options = options || {};

    return fn.call(container, context, container.helpers, container.partials, options.data || data, depths && [context].concat(depths));
  };
  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  return prog;
}

exports.program = program;function invokePartial(partial, name, context, helpers, partials, data, depths) {
  var options = { partial: true, helpers: helpers, partials: partials, data: data, depths: depths };

  if(partial === undefined) {
    throw new Exception("The partial " + name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? createFrame(data) : {};
    data.root = context;
  }
  return data;
}
},{"./base":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/base.js","./exception":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/exception.js","./utils":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/utils.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/safe-string.js":[function(require,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/utils.js":[function(require,module,exports){
"use strict";
/*jshint -W004 */
var SafeString = require("./safe-string")["default"];

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
/* istanbul ignore next */
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;

function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string instanceof SafeString) {
    return string.toString();
  } else if (string == null) {
    return "";
  } else if (!string) {
    return string + '';
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

exports.appendContextPath = appendContextPath;
},{"./safe-string":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars/safe-string.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/runtime.js":[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime');

},{"./dist/cjs/handlebars.runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/dist/cjs/handlebars.runtime.js"}],"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/hbsfy/runtime.js":[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":"/Users/mromanoff/Sites/equinox-schedule-coffee/node_modules/handlebars/runtime.js"}]},{},["/Users/mromanoff/Sites/equinox-schedule-coffee/client/src/main.coffee"]);
