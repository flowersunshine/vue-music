<template>
<div>
  <div class="singerInfo">
    <img :src="singerInfo.picUrl">
    <div class="singerBrief">
      <p><Tag color="red">歌手</Tag>{{singerInfo.name}}</p>
      <p><Icon type="music-note"></Icon>单曲数：{{singerInfo.musicSize}}</p>
      <p><Icon type="ios-albums"></Icon>专辑数：{{singerInfo.albumSize}}</p>
    </div>
  </div>
  <div>
    <Tabs type="card" @on-click="tabs">
      <tab-pane label="专辑" name="album">
        <div class="album">
          <ul>
            <li v-for="item in album" :key="item.id">
              <Album :id="item.id"></Album>
            </li>
          </ul>
        </div>
      </tab-pane>
      <tab-pane label="歌手详情" name="singerDetail">
        <div>
          <h3>{{singerInfo.name}}简介</h3>
          <p>{{singerDetail.briefDesc}}</p>
        </div>
        <div v-for="item in singerDetail.introduction">
          <h3>{{item.ti}}</h3>
          <p>{{item.txt}}</p>
        </div>
      </tab-pane>
    </Tabs>
  </div>
</div>
</template>

<script>
import Http from '../http/core.http'
import Album from './Album'
export default {
  name: 'singer-detail',
  props: {
    id: ''
  },
  components: {
    Album
  },
  data () {
    return {
      singerInfo: {},
      album: [],
      singerDetail: '',
      similiarSingers: []
    }
  },
  created () {
    const self = this
    Http.getSingerAlbum(this.id).then(res => {
      self.singerInfo = res.data.artist
      self.album = res.data.hotAlbums
    })
  },
  methods: {
    tabs (name) {
      switch (name) {
        case 'album' : {
          this.getSingerAlbum()
          break
        }
        case 'singerDetail' : {
          this.getSingerDetail()
          break
        }
        case 'similiarSinger' : {
          this.getSimiliarSingers()
          break
        }
      }
    },
    getSingerDetail () {
      const self = this
      Http.getSingerInfo(this.id).then(res => {
        self.singerDetail = res.data
      })
    },
    getSingerAlbum () {
      const self = this
      Http.getSingerAlbum(this.id).then(res => {
        self.singerInfo = res.data.artist
        self.album = res.data.hotAlbums
      })
    },
    getSimiliarSingers () {
      const self = this
      Http.getSimiliarSingers(this.id).then(res => {
        self.similiarSingers = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.singerInfo{
  padding: 10px;
  img{
    width: 200px;
    vertical-align: top;
  }
  .singerBrief{
    display: inline-block;
  }
}
</style>
