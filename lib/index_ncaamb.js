var config = Config,
    request = Npm.require('request');

function init(access_level, version, apikey, year, season) {
  config.ncaamb.access_level = access_level;
  config.ncaamb.version = version;
  config.ncaamb.year = year;
  config.ncaamb.season = season;
  config.ncaamb.apikey = apikey;
}

function createRequest(url, callback) {
  var begin_url = 'http://api.sportsdatallc.org/ncaamb-' + config.ncaamb.access_level + config.ncaamb.version + '/';
  var end_url = '.' + config.ncaamb.format + '?api_key=' + config.ncaamb.apikey;
  url = begin_url + url + end_url

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.error(e);
        error = e;
      }
    }
    callback(error, body);
  });
}

function getSeasonSchedule(callback) {
  var url = 'games/' + config.ncaamb.year + '/' + config.ncaamb.season + '/' + 'schedule';
  createRequest(url, callback);
}

function getDailySchedule(year, month, day, callback) {
  var url = 'games/' + year + '/' + month + '/' + day + '/' + 'schedule';
  createRequest(url, callback);
}

function getTournamentList(callback) {
  var url = 'tournaments/' + config.ncaamb.year + '/' + config.ncaamb.season + '/schedule';
  createRequest(url, callback);
}

function getTournamentSchedule(tournament_id, callback) {
  var url = 'tournaments/' + tournament_id + '/schedule';
  createRequest(url, callback);
}

function getTournamentSummary(tournament_id, callback) {
  var url = 'games/' + tournament_id + '/summary';
  createRequest(url, callback);
}

function getBoxScore(game_id, callback) {
  var url = 'games/' + game_id + '/boxscore';
  createRequest(url, callback);
}

function getCurrentWeekRankings(type_id, callback) {
  var url = 'polls/' + type_id + '/' + config.ncaamb.year + '/rankings';
  createRequest(url, callback);
}

function getRankingsByWeek(type_id, week, callback) {
  var url = 'polls/' + type_id + '/' + config.ncaamb.year + '/' + week + '/rankings';
  createRequest(url, callback);
}

function getRPIRankings(callback) {
  var url = 'polls/rpi/' + config.ncaamb.year + '/rankings';
  createRequest(url, callback);
}

function getStandings(callback) {
  var url = 'seasontd/' + config.ncaamb.year + '/' + config.ncaamb.season + '/standings';
  createRequest(url, callback);
}

function getLeagueHierarchy(callback) {
  var url = 'league/hierarchy';
  createRequest(url, callback);
}

function getRosters(team_id, callback) {
  var url = 'teams/' + team_id + '/profile';
  createRequest(url, callback);
}

function getPlayerProfile(player_id, callback) {
  var url = 'players/' + player_id + '/profile';
  createRequest(url, callback);
}

function getGameSummary(game_id, callback) {
  var url = 'games/' + game_id + '/summary';
  createRequest(url, callback);
}

function getSeasonalStats(team_id, callback) {
  var url = 'seasontd/' + config.ncaamb.year + '/' + config.ncaamb.season + '/teams/' + team_id + '/statistics';
  createRequest(url, callback);
}

function getLeagueLeaders(league_id, callback) {
  var url = 'seasontd/' + config.ncaamb.year + '/' + config.ncaamb.season + '/' + league_id + '/leaders';
  createRequest(url, callback);
}

Index_NCAAMB = {
  init: function(access_level, version, year, season, apikey) {
    return init(access_level, version, year, season, apikey);
  },
  getSeasonSchedule: function(callback) {
    return getSeasonSchedule(callback);
  },
  getDailySchedule: function(year, month, day, callback) {
    return getDailySchedule(year, month, day, callback);
  },
  getTournamentList: function(callback) {
    return getTournamentList(callback);
  },
  getTournamentSchedule: function(tournament_id, callback) {
    return getTournamentSchedule(tournament_id, callback);
  },
  getTournamentSummary: function(tournament_id, callback) {
    return getTournamentSummary(tournament_id, callback);
  },
  getBoxScore: function(game_id, callback) {
    return getBoxScore(game_id, callback);
  },
  getCurrentWeekRankings: function(type_id, callback) {
    return getCurrentWeekRankings(type_id, callback);
  },
  getRankingsByWeek: function(type_id, week, callback) {
    return getRankingsByWeek(type_id, week, callback);
  },
  getRPIRankings: function(callback) {
    return getRPIRankings(callback);
  },
  getStandings: function(callback) {
    return getStandings(callback);
  },
  getLeagueHierarchy: function(callback) {
    return getLeagueHierarchy(callback);
  },
  getRosters: function(team_id, callback) {
    return getRosters(team_id, callback);
  },
  getPlayerProfile: function(player_id, callback) {
    return getPlayerProfile(player_id, callback);
  },
  getGameSummary: function(game_id, callback) {
    return getGameSummary(game_id, callback);
  },
  getSeasonalStats: function(team_id, callback) {
    return getSeasonalStats(team_id, callback);
  },
  getLeagueLeaders: function(league_id, callback) {
    return getLeagueLeaders(league_id, callback);
  }
};