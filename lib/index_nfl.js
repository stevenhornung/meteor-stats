var config = Config,
    request = Npm.require('request');

function init(access_level, version, apikey, year, season) {
  config.nfl.access_level = access_level;
  config.nfl.version = version;
  config.nfl.apikey = apikey;
}

function createRequest(url, callback) {
  var begin_url = 'http://api.sportradar.us/nfl-' + config.nfl.access_level + config.nfl.version + '/';
  var end_url = '.' + config.nfl.format + '?api_key=' + config.nfl.apikey;
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

function getWeeklySchedule(year, season, week, callback) {
  // [year]/[nfl_season]/[nfl_season_week]/schedule
  var url = year + '/' + season + '/' + week + '/schedule';
  createRequest(url, callback);
}

function getSeasonSchedule(year, season, callback) {
  // [year]/[nfl_season]/schedule
  var url = year + '/' + season + '/schedule';
  createRequest(url, callback);
}

function getGameStats(year, season, week, awayteam, hometeam, callback) {
  // [year]/[nfl_season]/[nfl_season_week]/[away_team]/[home_team]/statistics
  var url = year + '/' + season + '/' + week + '/' + awayteam + '/' + hometeam + '/statistics';
  createRequest(url, callback);
}

function getGameSummary(year, season, week, awayteam, hometeam, callback) {
  // [year]/[nfl_season]/[nfl_season_week]/[away_team]/[home_team]/summary
  var url = year + '/' + season + '/' + week + '/' + awayteam + '/' + hometeam + '/summary';
  createRequest(url, callback);
}

function getPlayByPlay(year, season, week, awayteam, hometeam, callback) {
  // [year]/[nfl_season]/[nfl_season_week]/[away_team]/[home_team]/pbp
  var url = year + '/' + season + '/' + week + '/' + awayteam + '/' + hometeam + '/pbp';
  createRequest(url, callback);
}

function getPlaySummary(year, season, week, awayteam, hometeam, playid, callback) {
  // [year]/[nfl_season]/[nfl_season_week]/[away_team]/[home_team]/plays/[play_id]
  var url = year + '/' + season + '/' + week + '/' + awayteam + '/' + hometeam + '/plays/' + playid;
  createRequest(url, callback);
}

function getGameBoxscore(year, season, week, awayteam, hometeam, callback) {
  // [year]/[nfl_season]/[nfl_season_week]/[away_team]/[home_team]/boxscore
  var url = year + '/' + season + '/' + week + '/' + awayteam + '/' + hometeam + '/boxscore';
  createRequest(url, callback);
}

function getExtendedBoxscore(year, season, week, awayteam, hometeam, callback) {
  // [year]/[nfl_season]/[nfl_season_week]/[away_team]/[home_team]/extended-boxscore
  var url = year + '/' + season + '/' + week + '/' + awayteam + '/' + hometeam + '/extended-boxscore';
  createRequest(url, callback);
}

function getWeeklyBoxscore(year, season, week, callback) {
  // [year]/[nfl_season]/[nfl_season_week]/boxscore
  var url = year + '/' + season + '/' + week + '/boxscore' ;
  createRequest(url, callback);
}

function getGameRoster(year, season, week, awayteam, hometeam, callback) {
  // [year]/[nfl_season]/[nfl_season_week]/[away_team]/[home_team]/roster
  var url = year + '/' + season + '/' + week + '/' + awayteam + '/' + hometeam + '/roster';
  createRequest(url, callback);
}

function getTeamHierarchy(callback) {
  // teams/hierarchy
  var url = 'teams/hierarchy';
  createRequest(url, callback);
}

function getTeamRoster(team, callback) {
  // teams/[team]/roster
  var url = 'teams/' + team + '/roster';
  createRequest(url, callback);
}

function getInjuries(year, season, week, awayteam, hometeam, callback) {
  // [year]/[nfl_season]/[nfl_season_week]/[away_team]/[home_team]/injuries
  var url = year + '/' + season + '/' + week + '/' + awayteam + '/' + hometeam + '/injuries';
  createRequest(url, callback);
}

function getGameDepthChart(year, season, week, awayteam, hometeam, callback) {
  // [year]/[nfl_season]/[nfl_season_week]/[away_team]/[home_team]/depthchart
  var url = year + '/' + season + '/' + week + '/' + awayteam + '/' + hometeam + '/depthchart';
  createRequest(url, callback);
}

function getTeamDepthChart(team, callback) {
  // teams/[team]/depthchart
  var url = 'teams/' + team + '/depthchart';
  createRequest(url, callback);
}

function getWeeklyLeagueLeaders(year, season, week, callback) {
  // [year]/[nfl_season]/[nfl_season_week]/leaders
  var url = year + '/' + season + '/' + week + '/leaders';
  createRequest(url, callback);
}

function getStandings(year, season, callback) {
  // teams/[year]/[nfl_season]/standings
  var url = 'teams/' + year + '/' + season + '/standings';
  createRequest(url, callback);
}

function getSeasonalStats(year, season, team, callback) {
  // teams/[team]/[year]/[nfl_season]/statistics
  var url = 'teams/' + team + '/' + year + '/' + season + '/statistics';
  createRequest(url, callback);
}

Index_NFL = {
  init: function(access_level, version, apikey, year, season, format) {
    return init(access_level, version, apikey, year, season, format);
  },
  setRequest: function(reqObj) {
    request = reqObj;
  },
  getWeeklySchedule: function(year, season, week, callback) {
    return getWeeklySchedule(year, season, week, callback);
  },
  getSeasonSchedule: function(year, season, callback) {
    return getSeasonSchedule(year, season, callback);
  },
  getGameStats: function(year, season, week, awayteam, hometeam, callback) {
    return getGameStats(year, season, week, awayteam, hometeam, callback);
  },
  getGameSummary: function(year, season, week, awayteam, hometeam, callback) {
    return getGameSummary(year, season, week, awayteam, hometeam, callback);
  },
  getPlayByPlay: function(year, season, week, awayteam, hometeam, callback) {
    return getPlayByPlay(year, season, week, awayteam, hometeam, callback);
  },
  getPlaySummary: function(year, season, week, awayteam, hometeam, playid, callback) {
    return getPlaySummary(year, season, week, awayteam, hometeam, playid, callback);
  },
  getGameBoxscore: function(year, season, week, awayteam, hometeam, callback) {
    return getGameBoxscore(year, season, week, awayteam, hometeam, callback);
  },
  getExtendedBoxscore: function(year, season, week, awayteam, hometeam, callback) {
    return getExtendedBoxscore(year, season, week, awayteam, hometeam, callback);
  },
  getWeeklyBoxscore: function(year, season, week, callback) {
    return getWeeklyBoxscore(year, season, week, callback);
  },
  getGameRoster: function(year, season, week, awayteam, hometeam, callback) {
    return getGameRoster(year, season, week, awayteam, hometeam, callback);
  },
  getTeamHierarchy: function(callback) {
    return getTeamHierarchy(callback);
  },
  getTeamRoster: function(team, callback) {
    return getTeamRoster(team, callback);
  },
  getInjuries: function(year, season, week, awayteam, hometeam, callback) {
    return getInjuries(year, season, week, awayteam, hometeam, callback);
  },
  getGameDepthChart: function(year, season, week, awayteam, hometeam, callback) {
    return getGameDepthChart(year, season, week, awayteam, hometeam, callback);
  },
  getTeamDepthChart: function(team, callback) {
    return getTeamDepthChart(team, callback);
  },
  getWeeklyLeagueLeaders: function(year, season, week, callback) {
    return getWeeklyLeagueLeaders(year, season, week, callback);
  },
  getStandings: function(year, season, callback) {
    return getStandings(year, season, callback);
  },
  getSeasonalStats: function(year, season, team, callback) {
    return getSeasonalStats(year, season, team, callback);
  }
}