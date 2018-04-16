import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'
export default {
  getPersonalized () {
    return axios.get('personalized')
  },
  getPlayList (id) {
    return axios.get('playlist/detail?id=' + id)
  },
  getSongByID (id) {
    return axios.get('/music/url?id=' + id)
  },
  getSongInfoByID (id) {
    return axios.get('/song/detail?ids=' + id)
  },
  search (text, type) {
    return axios.get('/search?keywords=' + text + '&type=' + type)
  },
  getLysrcByID (id) {
    return axios.get('/lyric?id=' + id)
  },
  getHighQuality (cat) {
    return axios.get('/top/playlist/highquality?cat=' + cat)
  },
  getSingerInfo (id) {
    return axios.get('/artist/desc?id=' + id)
  },
  getSingerAlbum (id) {
    return axios.get('/artist/album?id=' + id)
  },
  getSingerSong (id) {
    return axios.get('/artists?id=' + id)
  },
  getAlbumDetail (id) {
    return axios.get('/album?id=' + id)
  },
  getSimiliarSingers (id) {
    return axios.get('/simi/artist?id=' + id)
  },
  getHotSinger () {
    return axios.get('/top/artists')
  }
}
