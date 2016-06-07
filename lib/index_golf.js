var config = Config,
    request = Npm.require('request'),
    xml2js = Npm.require('xml2js'),
    parser = new xml2js.Parser();

function init(access_level, version, apikey, year, tour, format) {
  config.golf.access_level = access_level;
  config.golf.version = version;
  config.golf.apikey = apikey;
  config.golf.year = year;
  config.golf.tour = tour;

  if (format){
    config.golf.format = format;
  }
}
function createRequest(url, callback) {
  var begin_url = 'http://api.sportsdatallc.org/golf-' + config.golf.access_level + config.golf.version + '/';
  var end_url = '.' + config.golf.format + '?api_key=' + config.golf.apikey;
  url = begin_url + url + end_url;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200){
      if (config.golf.format == 'json') {
        try {
          body = JSON.parse(body);
        } catch (e) {
          console.log(e);
        }
      } else {
        parser.parseString(body, function (err, result) {
          body = result;
        });
      }
    }
    callback(error, body);
  });
}

function getTournamentSchedule(callback) {
  var url = 'schedule/' + config.golf.tour + '/' + config.golf.year + '/tournaments/schedule';
  createRequest(url, callback);
}
function getPlayerProfiles(callback) {
  var url = 'profiles/' + config.golf.tour + '/' + config.golf.year + '/players/profiles'
  createRequest(url, callback);
}
function getTournamentSummary(tournamentId, callback){
  var url = 'summary/' + config.golf.tour + '/' + config.golf.year + '/tournaments/' + tournamentId + '/summary'
  createRequest(url, callback);
}
function getTournamentLeaderboard(tournamentId, callback){
  var url = 'leaderboard/' + config.golf.tour + '/' + config.golf.year + '/tournaments/' + tournamentId + '/leaderboard'
  createRequest(url, callback);
}
function getTournamentHoleStatus(tournamentId, callback){
  var url = 'hole_stats/' + config.golf.tour + '/' + config.golf.year + '/tournaments/' + tournamentId + '/hole-statistics'
  createRequest(url, callback);
}
function getTeeTimes(tournamentId, teeType, round, callback){
  var url = 'teetimes/' + config.golf.tour + '/' + config.golf.year + '/tournaments/' + tournamentId + '/' + teeType + '/' + round + '/teetimes'
  createRequest(url, callback);
}
function getScorecards(tournamentId, cardType, round, callback){
  var url = 'scorecards/' + config.golf.tour + '/' + config.golf.year + '/tournaments/' + tournamentId + '/' + cardType + '/' + round + '/scores'
  createRequest(url, callback);
}
function getPlayerStats(callback){
  var url = 'seasontd/' + config.golf.tour + '/' + config.golf.year + '/players/statistics'
  createRequest(url, callback);
}
function getDailyChangeLog(year, month, day, callback){
  var url = 'changelog/' + config.golf.tour + '/' + year + '/' + month + '/' + day + '/changes';
  createRequest(url, callback);
}

Index_Golf = {
  init: function(access_level, version, apikey, year, tour, format) {
    return init(access_level, version, apikey, year, tour, format);
  },
  setRequest: function(reqObj) {
    request = reqObj;
  },
  getTournamentSchedule: function(callback) {
    return getTournamentSchedule(callback);
  },
  getPlayerProfiles: function(callback) {
    return getPlayerProfiles(callback);
  },
  getTournamentSummary: function(tournamentId, callback){
    return getTournamentSummary(tournamentId, callback);
  },
  getTournamentLeaderboard: function(tournamentId, callback){
    return getTournamentLeaderboard(tournamentId, callback);
  },
  getTournamentHoleStatus: function(tournamentId, callback){
    return getTournamentHoleStatus(tournamentId, callback);
  },
  getTeeTimes: function(tournamentId, teeType, round, callback){
    return getTeeTimes(tournamentId, teeType, round, callback);
  },
  getScorecards: function(tournamentId, cardType, round, callback){
    return getScorecards(tournamentId, cardType, round, callback);
  },
  getPlayerStats: function(callback){
    return getPlayerStats(callback);
  },
  getDailyChangeLog: function(year, month, day, callback){
    return getDailyChangeLog(year, month, day, callback);
  }
}