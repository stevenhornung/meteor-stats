config = {}
Future = Npm.require("fibers/future")
request = Npm.require('request')
xml2js = Npm.require('xml2js')
parser = new xml2js.Parser()

init = (apikey, year) ->
  config = @Config.epl

  config.apikey = apikey
  config.year = year

createRequest = (url) ->
  begin_url = 'http://api.sportsdatallc.org/soccer-' + config.access_level + config.version + '/' + config.league_group + '/'
  end_url = '.' + config.format + '?api_key=' + config.apikey
  url = begin_url + url + end_url

  future = new Future()

  request url, (err, res, body) ->
    if err
      future.throw(err)
    else
      parser.parseString body, (error, result) ->
        if error
          future.return(error.message)
          console.log("warn | #{moment.tz('America/New_York').format()} | Error parsing SportRadar response: Body: #{body}, Error message: #{e.message}")
        else
          future.return(result)

  response = future.wait()
  return response

@Index_EPL = {
  init: (apikey, year) ->
    init(apikey, year)

  getSeasonSchedule: ->
    url = 'matches/schedule'
    seasonSchedule = createRequest(url)
    matches = _.filter seasonSchedule.schedule.matches[0].match, (match) -> (match.category[0].$.name is config.category) and (match.tournament_group[0].$.name is config.group)
    return matches

  getDailySchedule: (month, day) ->
    url = 'matches/' + config.year + '/' + month + '/' + day + '/schedule'
    return createRequest(url)

  getMatchSummary: (matchId) ->
    url = 'matches/' + matchId + '/summary'
    return createRequest(url)

  getDailySummary: (month, day) ->
    url = 'matches/' + config.year + '/' + month + '/' + day + '/summary'
    return createRequest(url)

  getDailyBoxscore: (month, day) ->
    url = 'matches/' + config.year + '/' + month + '/' + day + '/boxscore'
    return createRequest(url)

  getMatchBoxscore: (matchId) ->
    url = 'matches/' + matchId + '/boxscore'
    return createRequest(url)

  getTeamHierarchy: ->
    url = 'teams/hierarchy'
    teamHierarchy = createRequest(url)
    category = _.find teamHierarchy.hierarchy.category, (category) -> category.$.name is config.category
    group = _.find category.tournament_group, (group) -> group.$.name is config.group
    return group.tournament[0]

  getTeamRoster: (teamId) ->
    url = 'teams/' + teamId + '/profile'
    teamProfile = createRequest(url)
    return teamProfile.profile.team[0]

  getPlayerProfile: (playerId) ->
    url = 'players/' + playerId + '/profile'
    return createRequest(url)

  getPlayerRankings: ->
    url = 'players/leader'
    return createRequest(url)

  getStandings: ->
    url = 'teams/standing'
    return createRequest(url)
}