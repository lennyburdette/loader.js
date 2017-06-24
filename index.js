'use strict';
var shouldUseInstrumentedBuild = require('./utils').shouldUseInstrumentedBuild;

module.exports = {
  name: 'loader.js',

  init: function() {
    this._super.init && this._super.init.apply(this, arguments);

    this.treePaths['vendor'] = 'dist';
  },

  included: function(app, parentAddon) {
    var isDevelopmentOrTest = app.env === 'development' || app.env === 'test';
    var target = parentAddon || app;

    target.options = target.options || {};
    target.options.loader = target.options.loader || { debug: isDevelopmentOrTest };

    if (false /* hotfix */&& shouldUseInstrumentedBuild()) {
      app.import('vendor/loader/loader.instrument.js', {
        prepend: true
      });
    } else if (target.options.loader.debug) {
      app.import('vendor/loader/loader.debug.js', {
        prepend: true
      });
    } else {
      app.import('vendor/loader/loader.js', {
        prepend: true
      });
    }
  }
};
