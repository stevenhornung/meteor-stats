config = {}
Future = Npm.require("fibers/future")
request = Npm.require('request')

init = (apikey) ->
  config = @Config.bgfl
  config.apikey = apikey

createRequest = (url, include) ->
  begin_url = 'https://api.soccerama.pro/' + config.version + '/'
  end_url = '?api_token=' + config.apikey
  url = begin_url + url + end_url

  if include
    url += '&include=' + include

  future = new Future()

  request url, (err, res, body) ->
    if err
      future.throw(err)
    else
      try
        body = JSON.parse(body)
        future.return(body)
      catch e
        console.log("warn | #{moment.tz('America/New_York').format()} | Error parsing Soccerama response: Body: #{body}, Error message: #{e.message}")
        future.return(e.message)

  response = future.wait()
  return response

@Index_BGFL = {
  init: (apikey) ->
    init(apikey)

  getCompetitions: ->
    url = 'competitions'
    include = 'country'
    return createRequest(url, include)

  getSeasons: ->
    url = 'seasons'
    include = 'matches'
    return createRequest(url)

  getSeasonSchedule: ->
    url = 'seasons/' + config.seasonId
    include = 'matches'
    return createRequest(url, include)

  getTeamHierarchy: ->
    url = 'teams/season/' + config.seasonId
    return createRequest(url)

  getTeamRoster: (teamId) ->
    url = 'players/team/' + teamId
    include = 'position'
    return createRequest(url, include)

  getMatchSummary: (matchId) ->
    url = 'matches/' + matchId
    include = "events"
    return createRequest(url, include)
}