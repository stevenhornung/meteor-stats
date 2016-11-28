config = {}
Future = Npm.require("fibers/future")
request = Npm.require('request')

init = (apikey, year, season) ->
  config = @Config.mlb

  config.apikey = apikey
  config.year = year
  config.season = season

createRequest = (url) ->
  begin_url = 'http://api.sportsdatallc.org/mlb-' + config.access_level + config.version + '/'
  end_url = '.' + config.format + '?api_key=' + config.apikey
  url = begin_url + url + end_url

  future = new Future()

  request url, (err, res, body) ->
    if err
      future.throw(err)
    else
      try
        body = JSON.parse(body)
        future.return(body)
      catch e
        console.log("warn | #{moment.tz('America/New_York').format()} | Error parsing SportRadar response: Body: #{body}, Error message: #{e.message}")
        future.return(e.message)

  response = future.wait()
  return response

@Index_MLB = {
  init: (apikey, year, season) ->
    init(apikey, year, season)

  getDailyBoxscore: (month, day) ->
    url = 'games/' + config.year + '/' + month + '/' + day + '/boxscore'
    return createRequest(url)

  getDailyChangeLog: (month, day) ->
    url = 'games/' + config.year + '/' + month + '/' + day + '/changes'
    return createRequest(url)

  getDailySchedule: (month, day) ->
    url = 'games/' + config.year + '/' + month + '/' + day + '/schedule'
    return createRequest(url)

  getDailySummary: (month, day) ->
    url = 'games/' + config.year + '/' + month + '/' + day + '/summary'
    return createRequest(url)

  getGameBoxScore: (eventId) ->
    url = 'games/' + eventId + '/boxscore'
    return createRequest(url)

  getGameSummary: (eventId) ->
    url = 'games/' + eventId + '/summary'
    return createRequest(url)

  getGlossary: ->
    url = 'league/glossary'
    return createRequest(url)

  getLeagueDepthChart: ->
    url = 'league/depth_charts'
    return createRequest(url)

  getTeamHierarchy: ->
    url = 'league/hierarchy'
    return createRequest(url)

  getLeagueLeaders: ->
    url = 'seasontd/' + config.year + config.season + '/leaders/statistics'
    return createRequest(url)

  getLeagueSchedule: ->
    url = 'games/' + config.year + '/' + config.season + '/schedule'
    return createRequest(url)

  getPlayByPlay: (eventId) ->
    url = 'games/' + eventId + '/pbp'
    return createRequest(url)

  getPlayerProfile: (playerId) ->
    url = 'players/' + playerId + '/profile'
    return createRequest(url)

  getRankings: ->
    url = 'seasontd/' + config.year + '/' + config.season + '/rankings'
    return createRequest(url)

  getSeasonalSplits: (teamId) ->
    url = 'seasontd/' + config.year + '/' + config.season + '/teams/' + teamId + '/splits'
    return createRequest(url)

  getSeasonalStats: (teamId) ->
    url = 'seasontd/' + config.year + '/' + config.season + '/teams/' + teamId + '/statistics'
    return createRequest(url)

  getStandings: ->
    url = 'seasontd/' + config.year + '/' + config.season + '/standings'
    return createRequest(url)

  getTeamDepthChart: (teamId) ->
    url = 'teams/' + teamId + '/depth_chart'
    return createRequest(url)

  getTeamProfile: (teamId) ->
    url = 'teams/' + teamId + '/profile'
    return createRequest(url)

  getActiveTeamRoster: ->
    url = 'league/active_rosters'
    return createRequest(url)

  getFullTeamRoster: ->
    url = 'league/full_rosters'
    return createRequest(url)
}