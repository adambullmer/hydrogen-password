'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'hydrogen-password',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    contentSecurityPolicyMeta: true,
    contentSecurityPolicy: {
      // 'default-src': "'none'",
      // 'script-src': "'self'",
      // 'style-src': "'self' https://fonts.googleapis.com",
      // 'font-src': "'self' fonts.gstatic.com",
      // 'connect-src': "'self'",
      // 'img-src': "'self' data:",
      // 'media-src': "'self'",
      'default-src': ["'none'"],
      'script-src':  ["'self'", "'unsafe-inline'"],
      'font-src':    ["'self'", "https://fonts.gstatic.com"],
      'connect-src': ["'self'"],
      'img-src':     ["'self'", "data:", "*"],
      'style-src':   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      'media-src':   ["'self'"],
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
