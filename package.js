Package.describe({
  name: 'meteor-stats',
  version: '1.0.0',
  summary: 'Meteor package wrapping SportRadar and Soccerama APIs.',
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
    'lib/mlb.coffee',
    'lib/nfl.coffee',
    'lib/epl.coffee',
    'lib/bgfl.coffee',
    'lib/laliga.coffee',
    'lib/bundesliga.coffee',
    'lib/ligue1.coffee',
    'lib/seriea.coffee',
    'lib/nba.coffee',
    'index.coffee'
  ], 'server');

  api.export('Stats')
});
