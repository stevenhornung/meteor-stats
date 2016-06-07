var config = Config,
    request = Npm.require('request'),
    xml2js = Npm.require('xml2js'),
    parser = new xml2js.Parser()

function init(access_level, version, apikey, seasonID, season) {
  config.nba.access_level = access_level;
  config.nba.version = version;
  config.nba.apikey = apikey;
  config.nba.seasonID = seasonID;
  config.nba.season = season;
}

function createRequest(url, callback) {
  var begin_url = 'http://api.sportradar.us/nba-' + config.nba.access_level + config.nba.version + '/';
  var end_url = '.' + config.nba.format + '?api_key=' + config.nba.apikey;
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
  var url = 'games/' + config.nba.seasonID + '/' + config.nba.season + '/schedule';
  createRequest(url, callback);
}

function getDailySchedule(year, month, day, callback) {
  var url = 'games/' + year + '/' + month + '/' + day + '/schedule';
  createRequest(url, callback);
}

function getSeriesSchedules(callback) {
  var url = 'series/' + config.nba.seasonID + '/' + config.nba.season + '/schedule';
  createRequest(url, callback);
}

function getGameBoxScore(gameId, callback) {
  var url = 'games/' + gameId + '/boxscore';
  createRequest(url, callback);
}

function getStandings(callback) {
  var url = 'seasontd/' + config.nba.seasonID + '/' + config.nba.season + '/standings';
  createRequest(url, callback);
}

function getRankings(callback) {
  var url = 'seasontd/' + config.nba.seasonID + '/' + config.nba.season + '/rankings';
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

function getPlayerProfile (playerId, callback) {
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

function getPlayByPlay (gameId, callback) {
  var url = 'games/' + gameId + '/pbp';
  createRequest(url, callback);
}

function getSeasonalStats(teamId, callback) {
  var url = 'seasontd/' + config.nba.seasonID + '/' + config.nba.season + '/teams/' + teamId + '/statistics';
  createRequest(url, callback);
}

function getLeagueLeaders(callback) {
  var url = 'seasontd' + config.nba.seasonID + '/' + config.nba.season + '/leaders';
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


Index_NBA = {
  init: function(access_level, version, apikey, seasonID, season) {
    return init(access_level, version, apikey, seasonID, season);
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
  getSeriesSchedules: function(callback) {
    return getSeriesSchedules(callback);
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
  getLeagueHierarchy: function(callback) {
    return getLeagueHierarchy(callback);
  },
  getRoster: function(teamId, callback) {
    return getRoster(teamId, callback);
  },
  getPlayerProfile: function(playerId, callback) {
    return getPlayerProfile(playerId, callback);
  },
  getInjuries: function(callback) {
    return getInjuries(callback);
  },
  getGameSummary: function(gameId, callback) {
    return getGameSummary(gameId, callback);
  },
  getPlayByPlay: function(gameId, callback) {
    return getPlayByPlay(gameId, callback);
  },
  getSeasonalStats: function(teamId, callback) {
    return getSeasonalStats(teamId, callback);
  },
  getLeagueLeaders: function(callback){
    return getLeagueLeaders(callback);
  },
  getDailyChangeLog: function(year, month, day, callback){
    return getDailyChangeLog(year, month, day, callback);
  },
  getDailyTransfers: function(year, month, day, callback){
    return getDailyTransfers(year, month, day, callback);
  }
};
