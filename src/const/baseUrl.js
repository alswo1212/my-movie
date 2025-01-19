const MOVIES_KEY = import.meta.env.VITE_MOVIE_KEY
const POSTER_KEY = import.meta.env.VITE_POSTER_KEY
export const DAILY = `/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${MOVIES_KEY}`
export const WEEKLY = `/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${MOVIES_KEY}`
export const POSTER = `/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${POSTER_KEY}`