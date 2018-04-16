<template>
<div class="clearfix album">
  <div class="albumInfo left">
    <img :src="albumInfo.album.picUrl">
    <p>{{new Date(albumInfo.album.publishTime).toDateString()}}</p>
  </div>
  <div class="album-songs">
    <p>{{albumInfo.album.name}}</p>
    <ul>
      <li v-for="(item, index) in albumInfo.songs" :key="item.id" :class="{'grey': index % 2 === 0}">
        <div>
          <span class="left">{{index + 1}}</span>
          <Song :id="item.id"></Song>
        </div>
      </li>
    </ul>
    <a role="button" v-if="isShow && albumInfo.album.size > 10" @click="show">查看全部{{albumInfo.album.size}}首</a>
  </div>
</div>
</template>

<script>
import Http from '../http/core.http'
import Song from './Song'
export default {
  name: 'album',
  props: {
    id: ''
  },
  data () {
    return {
      albumInfo: {
        album: {}
      },
      isShow: true
    }
  },
  components: {
    Song
  },
  created () {
    const self = this
    Http.getAlbumDetail(this.id).then(res => {
      self.albumInfo = res.data
    })
  },
  methods: {
    show () {
      this.$el.querySelector('.album-songs').querySelector('ul').style.maxHeight = 'none'
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="scss">
.album {
  padding: 20px;
  .albumInfo {
    margin-right: 20px;
    img {
      width: 200px;
      vertical-align: bottom;
    }
  }
  .album-songs{
    margin-left: 210px;
    p{
      font-size: 16px;
      height: 20px;
      line-height: 20px;
      padding: 5px;
    }
    ul{
      border: 1px solid grey;
      margin: 10px;
      max-height: 220px;
      overflow: hidden;
      li{
        padding: 2px;
        span{
          margin-right: 5px;
        }
      }
    }
  }
}
.grey{
  background-color: #f7f7f7;
}
</style>
