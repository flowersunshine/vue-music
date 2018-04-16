<template>
  <div id="app">
    <header-music @doSearch="search($event)"></header-music>
    <div class="main">
      <Row>
        <Col span="4"><sider-bar></sider-bar></Col>
        <Col span="20"><router-view/></Col>
      </Row>
    </div>
    <div class="player"><play-music :songID="songID" :list="playList"></play-music></div>
  </div>
</template>

<script>
import HeaderMusic from './components/HeaderMusic'
import SiderBar from './components/SiderBar'
import DiscoveryMusic from './components/DiscoveryMusic'
import Col from 'iview/src/components/col'
import Row from 'iview/src/components/row'
import PlayMusic from './components/PlayMusic'

export default {
  data () {
    return {
      songID: '',
      playList: [],
      test: '11111',
      searchText: ''
    }
  },
  components: {
    PlayMusic,
    DiscoveryMusic,
    SiderBar,
    HeaderMusic,
    Col,
    Row
  },
  name: 'App',
  created () {
    this.$on('playsong', function (msg) {
      this.songID = msg
    })
    this.$on('playList', function (msg) {
      this.playList = msg
    })
    window.wangApp = this
  },
  methods: {
    search ($event) {
      console.log($event)
      this.searchText = $event
      this.$router.push({path: `/search/${this.searchText}`})
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.main{
  margin-bottom: 100px;
}
  .player{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
