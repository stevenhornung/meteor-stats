Package.describe({
  name: 'meteor-sportradar',
  version: '1.0.0',
  summary: 'Meteor package wrapping SportRadar API.',
});

Package.on_use(function (api) {
  api.versionsFrom("METEOR@1.3");

  api.use([
    'underscore',
    'coffeescript'
  ], 'server');

  Npm.depends({
    'request': '2.72.0',
    'xml2js': '0.4.16'
  });

  api.addFiles([
    'lib/config.coffee',
    'lib/index_golf.js',
    'lib/index_mlb.coffee',
    'lib/index_nba.js',
    'lib/index_ncaamb.js',
    'lib/index_nfl.js',
    'lib/index_nhl.js',
    'index.coffee'
  ], 'server');

  api.export('SportRadar')
});
