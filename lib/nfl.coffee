config = {}
Future = Npm.require("fibers/future")
request = Npm.require('request')

init = (apikey, year, season) ->
  config = @Config.nfl

  config.apikey = apikey
  config.year = year
  config.season = season

createRequest = (url) ->
  begin_url = 'http://api.sportradar.us/nfl-' + config.access_level + config.version + '/'
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

@Index_NFL = {
  init: (apikey, year, season) ->
    init(apikey, year, season)

  getWeeklySchedule: (week) ->
    url = url = config.year + '/' + config.season + '/' + week + '/schedule'
    return createRequest(url)

  getSeasonSchedule: ->
    url = config.year + '/' + config.season + '/schedule'
    return createRequest(url)

  getGameStats: (week, awayteam, hometeam) ->
    url = config.year + '/' + config.season + '/' + week + '/' + awayteam + '/' + hometeam + '/statistics'
    return createRequest(url)

  getGameSummary: (year, season, week, awayteam, hometeam) ->
    url = year + '/' + season + '/' + week + '/' + awayteam + '/' + hometeam + '/summary'
    return createRequest(url)

  getPlayByPlay: (week, awayteam, hometeam) ->
    url = config.year + '/' + config.season + '/' + week + '/' + awayteam + '/' + hometeam + '/pbp'
    return createRequest(url)

  getPlaySummary: (week, awayteam, hometeam, playid) ->
    url = config.year + '/' + config.season + '/' + week + '/' + awayteam + '/' + hometeam + '/plays/' + playid
    return createRequest(url)

  getGameBoxscore: (week, awayteam, hometeam) ->
    url = config.year + '/' + config.season + '/' + week + '/' + awayteam + '/' + hometeam + '/boxscore'
    return createRequest(url)

  getExtendedBoxscore: (week, awayteam, hometeam) ->
    url = config.year + '/' + config.season + '/' + week + '/' + awayteam + '/' + hometeam + '/extended-boxscore'
    return createRequest(url)

  getWeeklyBoxscore: (week) ->
    url = config.year + '/' + config.season + '/' + week + '/boxscore'
    return createRequest(url)

  getGameRoster: (week, awayteam, hometeam) ->
    url = config.year + '/' + config.season + '/' + week + '/' + awayteam + '/' + hometeam + '/roster'
    return createRequest(url)

  getTeamHierarchy: ->
    url = 'teams/hierarchy'
    return createRequest(url)

  getTeamRoster: (team) ->
    url = 'teams/' + team + '/roster'
    return createRequest(url)

  getInjuries: (week, awayteam, hometeam) ->
    url = config.year + '/' + config.season + '/' + week + '/' + awayteam + '/' + hometeam + '/injuries'
    return createRequest(url)

  getGameDepthChart: (week, awayteam, hometeam) ->
    url = config.year + '/' + config.season + '/' + week + '/' + awayteam + '/' + hometeam + '/depthchart'
    return createRequest(url)

  getTeamDepthChart: (team) ->
    url = 'teams/' + team + '/depthchart'
    return createRequest(url)

  getWeeklyLeagueLeaders: (week) ->
    url = config.year + '/' + config.season + '/' + week + '/leaders'
    return createRequest(url)

  getStandings: (year) ->
    url = 'teams/' + year + '/' + config.season + '/standings'
    return createRequest(url)

  getSeasonalStats: (team) ->
    url = 'teams/' + team + '/' + config.year + '/' + config.season + '/statistics'
    return createRequest(url)
}