config = Config
request = Npm.require('request')
xml2js = Npm.require('xml2js')
parser = new (xml2js.Parser)

init = (access_level, version, apikey, year, season, format) ->
  config.mlb.access_level = access_level
  config.mlb.season = season
  config.mlb.version = version
  config.mlb.apikey = apikey
  config.mlb.year = year
  if format
    config.mlb.format = format

createRequest = (url, callback) ->
  begin_url = 'http://api.sportsdatallc.org/mlb-' + config.mlb.access_level + config.mlb.version + '/'
  end_url = '.' + config.mlb.format + '?api_key=' + config.mlb.apikey
  url = begin_url + url + end_url

  request url, (error, response, body) ->
    if !error and response.statusCode == 200
      if config.mlb.format == 'json'
        try
          body = JSON.parse(body)
        catch e
          console.log e
          error = e
      else
        parser.parseString body, (err, result) ->
          body = result
          return

    callback(error, body)

getDailyBoxscore = (year, month, day, callback) ->
  url = 'games/' + year + '/' + month + '/' + day + '/boxscore'
  createRequest(url, callback)

getDailyChangeLog = (year, month, day, callback) ->
  url = 'games/' + year + '/' + month + '/' + day + '/changes'
  createRequest(url, callback)

getDailySchedule = (year, month, day, callback) ->
  url = 'games/' + year + '/' + month + '/' + day + '/schedule'
  createRequest(url, callback)

getDailySummary = (year, month, day, callback) ->
  url = 'games/' + year + '/' + month + '/' + day + '/summary'
  createRequest(url, callback)

getGameBoxScore = (eventId, callback) ->
  url = 'games/' + eventId + '/boxscore'
  createRequest(url, callback)

getGameSummary = (eventId, callback) ->
  url = 'games/' + eventId + '/summary'
  createRequest(url, callback)

getGlossary = (callback) ->
  url = 'league/glossary'
  createRequest(url, callback)

getLeagueDepthChart = (callback) ->
  url = 'league/depth_charts'
  createRequest(url, callback)

getTeamHierarchy = (callback) ->
  url = 'league/hierarchy'
  createRequest(url, callback)

getLeagueLeaders = (callback) ->
  url = 'seasontd/' + config.mlb.year + config.mlb.season + '/leaders/statistics'
  createRequest(url, callback)

getLeagueSchedule = (callback) ->
  url = 'games/' + config.mlb.year + '/' + config.mlb.season + '/schedule'
  createRequest(url, callback)

getPlayByPlay = (eventId, callback) ->
  url = 'games/' + eventId + '/pbp'
  createRequest(url, callback)

getPlayerProfile = (playerId, callback) ->
  url = 'players/' + playerId + '/profile'
  createRequest(url, callback)

getRankings = (callback) ->
  url = 'seasontd/' + config.mlb.year + '/' + config.mlb.season + '/rankings'
  createRequest(url, callback)

getSeasonalSplits = (teamId, callback) ->
  url = 'seasontd/' + config.mlb.year + '/' + config.mlb.season + '/teams/' + teamId + '/splits'
  createRequest(url, callback)

getSeasonalStats = (teamId, callback) ->
  url = 'seasontd/' + config.mlb.year + '/' + config.mlb.season + '/teams/' + teamId + '/statistics'
  createRequest(url, callback)

getStandings = (callback) ->
  url = 'seasontd/' + config.mlb.year + '/' + config.mlb.season + '/standings'
  createRequest(url, callback)

getTeamDepthChart = (teamId, callback) ->
  url = 'teams/' + teamId + '/depth_chart'
  createRequest(url, callback)

getTeamProfile = (teamId, callback) ->
  url = 'teams/' + teamId + '/profile'
  createRequest(url, callback)

getActiveTeamRoster = (callback) ->
  url = 'league/active_rosters'
  createRequest(url, callback)

getFullTeamRoster = (callback) ->
  url = 'league/full_rosters'
  createRequest(url, callback)

@Index_MLB = {
  init: (access_level, version, apikey, year, season, format) ->
    init(access_level, version, apikey, year, season, format)

  setRequest: (reqObj) ->
    request = reqObj

  getDailyBoxscore: (year, month, day, callback) ->
    getDailyBoxscore(year, month, day, callback)

  getDailyChangeLog: (year, month, day, callback) ->
    getDailyChangeLog(year, month, day, callback)

  getDailySchedule: (year, month, day, callback) ->
    getDailySchedule(year, month, day, callback)

  getDailySummary: (year, month, day, callback) ->
    getDailySummary(year, month, day, callback)

  getGameBoxScore: (eventId, callback) ->
    getGameBoxScore(eventId, callback)

  getGameSummary: (eventId, callback) ->
    getGameSummary(eventId, callback)

  getGlossary: (callback) ->
    getGlossary(callback)

  getLeagueDepthChart: (callback) ->
    getLeagueDepthChart(callback)

  getTeamHierarchy: (callback) ->
    getTeamHierarchy(callback)

  getLeagueLeaders: (callback) ->
    getLeagueLeaders(callback)

  getLeagueSchedule: (callback) ->
    getLeagueSchedule(callback)

  getPlayByPlay: (eventId, callback) ->
    getPlayByPlay(eventId, callback)

  getPlayerProfile: (playerId, callback) ->
    getPlayerProfile(playerId, callback)

  getRankings: (callback) ->
    getRankings(callback)

  getSeasonalSplits: (teamId, callback) ->
    getSeasonalSplits(teamId, callback)

  getSeasonalStats: (teamId, callback) ->
    getSeasonalStats(teamId, callback)

  getStandings: (callback) ->
    getStandings(callback)

  getTeamDepthChart: (teamId, callback) ->
    getTeamDepthChart(teamId, callback)

  getTeamProfile: (teamId, callback) ->
    getTeamProfile(teamId, callback)

  getActiveTeamRoster: (callback) ->
    getActiveTeamRoster(callback)

  getFullTeamRoster: (callback) ->
    getFullTeamRoster(callback)
}