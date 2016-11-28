config = {}
Future = Npm.require("fibers/future")
request = Npm.require('request')

init = (apikey, year, season) ->
  config = @Config.nba

  config.apikey = apikey
  config.year = year
  config.season = season

createRequest = (url) ->
  begin_url = 'http://api.sportradar.us/nba-' + config.access_level + config.version + '/'
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

@Index_NBA = {
  init: (apikey, year, season) ->
    init(apikey, year, season)

  getSeasonSchedule: ->
    url = 'games/' + config.year + '/' + config.season + '/schedule'
    return createRequest(url)

  getDailySchedule: (month, day) ->
    url = 'games/' + config.year + '/' + month + '/' + day + '/schedule'
    return createRequest(url)

  getGameBoxscore: (gameId) ->
    url = 'games/' + gameId + '/boxscore'
    return createRequest(url)

  getStandings: ->
    url = 'seasontd/' + config.year + '/' + config.season + '/standings'
    return createRequest(url)

  getRankings: ->
    url = 'seasontd/' + config.year + '/' + config.season + '/rankings'
    return createRequest(url)

  getLeagueHierarchy: ->
    url = 'league/hierarchy'
    return createRequest(url)

  getTeamRoster: (teamId) ->
    url = 'teams/' + teamId + '/profile'
    return createRequest(url)

  getPlayerProfile: (playerId) ->
    url = 'players/' + playerId + '/profile'
    return createRequest(url)

  getInjuries: (playerId) ->
    url = 'league/injuries'
    return createRequest(url)

  getGameSummary: (gameId) ->
    url = 'games/' + gameId + '/summary'
    return createRequest(url)

  getPlayByPlay: (gameId) ->
    url = 'games/' + gameId + '/pbp'
    return createRequest(url)

  getSeasonStats: (teamId) ->
    url = 'seasontd/' + config.year + '/' + config.season + '/teams/' + teamId + '/statistics'
    return createRequest(url)

}