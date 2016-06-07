var config = Config,
    request = Npm.require('request'),
    xml2js = Npm.require('xml2js'),
    parser = new xml2js.Parser()

function init(access_level, version, apikey, seasonID, season) {
  config.nhl.access_level = access_level;
  config.nhl.version = version;
  config.nhl.apikey = apikey;
  config.nhl.seasonID = seasonID;
  config.nhl.season = season;
}

function createRequest(url, callback) {
  var begin_url = 'http://api.sportradar.us/nhl-' + config.nhl.access_level + config.nhl.version + '/';
  var end_url = '.' + config.nhl.format + '?api_key=' + config.nhl.apikey;
  url = begin_url + url + end_url

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.log(e);
        error = e;
      }
    }
    callback(error, body);
  });
}

function getSeasonSchedule(callback) {
  var url = 'games/' + config.nhl.seasonID + '/' + config.nhl.season + '/schedule';
  createRequest(url, callback);
}

function getDailySchedule(year, month, day, callback) {
  var url = 'games/' + year + '/' + month + '/' + day + '/schedule';
  createRequest(url, callback);
}

function getSeriesSchedule(callback) {
  var url = 'series/' + config.nhl.seasonID + '/' + config.nhl.season + '/schedule';
  createRequest(url, callback);
}

function getGameBoxScore(gameId, callback) {
  var url = 'games/' + gameId + '/boxscore';
  createRequest(url, callback);
}

function getStandings(callback) {
  var url = 'seasontd/' + config.nhl.seasonID + '/' + config.nhl.season + '/standings';
  createRequest(url, callback);
}

function getRankings(callback) {
  var url = 'seasontd/' + config.nhl.seasonID + '/' + config.nhl.season + '/rankings';
  createRequest(url, callback);
}

function getLeagueHierarchy(callback) {
  var url = 'league/hierarchy';
  createRequest(url, callback);
}

function getRoster(teamId, callback) {
  var url = 'teams/' + teamId + '/profile';
  createRequest(url, callback);
}

function getPlayerProfile(playerId, callback) {
  var url = 'players/' + playerId + '/profile';
  createRequest(url, callback);
}

function getInjuries(callback) {
  var url = 'league/injuries';
  createRequest(url, callback);
}

function getGameSummary(gameId, callback) {
  var url = 'games/' + gameId + '/summary';
  createRequest(url, callback);
}

function getPlayByPlay(gameId, callback) {
  var url = 'games/' + gameId + '/pbp';
  createRequest(url, callback);
}

function getSeasonalStats(teamId, callback) {
  var url = 'seasontd/' + config.nhl.seasonID + '/' + config.nhl.season + '/teams/' + teamId + '/statistics';
  createRequest(url, callback);
}

function getLeagueLeaders(type, callback) {
  var url = 'seasontd' + config.nhl.seasonID + '/' + config.nhl.season + '/leaders/' + type;
  createRequest(url, callback);
}

function getDailyChangeLog(year, month, day, callback) {
  var url = 'league/' + year + '/' + month + '/' + day + '/changes';
  createRequest(url, callback);
}

function getDailyTransfers(year, month, day, callback) {
  var url = 'league/' + year + '/' + month + '/' + day + '/transfers';
  createRequest(url, callback);
}

Index_NHL = {
  init: function(access_level, version, apikey, seasonID, season, format) {
    return init(access_level, version, apikey, seasonID, season, format);
  },
  setRequest: function(reqObj) {
    request = reqObj;
  },
  getSeasonSchedule: function(callback) {
    return getSeasonSchedule(callback);
  },
  getDailySchedule: function(year, month, day, callback) {
    return getDailySchedule(year, month, day, callback);
  },
  getSeriesSchedule: function(gameId, callback) {
    return getSeriesSchedule(callback);
  },
  getGameBoxScore: function(gameId, callback) {
    return getGameBoxScore(gameId, callback);
  },
  getStandings: function(callback) {
    return getStandings(callback);
  },
  getRankings: function(callback) {
    return getRankings(callback);
  },
  getLeagueHierarchy: function(callback){
    return getLeagueHierarchy(callback);
  },
  getRoster: function(teamId, callback){
    return getRoster(teamId, callback);
  },
  getPlayerProfile: function(playerId, callback){
    return getPlayerProfile(playerId, callback);
  },
  getInjuries: function(callback){
    return getInjuries(callback);
  },
  getGameSummary: function(gameId, callback){
    return getGameSummary(gameId, callback);
  },
  getPlayByPlay: function(gameId, callback){
    return getPlayByPlay(gameId, callback);
  },
  getSeasonalStats: function(teamId, callback){
    return getSeasonalStats(teamId, callback);
  },
  getLeagueLeaders: function(type, callback){
    return getLeagueLeaders(type, callback);
  },
  getDailyChangeLog: function(year, month, day, callback){
    return getDailyChangeLog(year, month, day, callback);
  },
  getDailyTransfers: function(year, month, day, callback){
    return getDailyTransfers(year, month, day, callback);
  }
};