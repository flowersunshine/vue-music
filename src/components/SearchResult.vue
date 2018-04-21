<template>
  <div>
    <Tabs type="card" @on-click="tabs">
      <TabPane label="单曲" name="song">
        <Table :columns="song" :data="songList" stripe :loading="loading" @on-row-click="doSelect"></Table>
      </TabPane>
      <TabPane label="歌手（不建议，容易崩）" name="singer">
        <div v-for="(singer, index) in singerList" :key="singer.id" :class="['singer',{grey: index % 2 === 0}]">
          <img :src="singer.img1v1Url">
          <router-link :to="{path:`/singer/${singer.id}`}">{{singer.name}}</router-link>
        </div>
      </TabPane>
      <TabPane label="专辑" name="album">
        <div v-for="(album, index) in albumList" :key="album.id" :class="['album',{grey: index % 2 === 0}]">
          <img :src="album.picUrl">
          <router-link :to="{path: `/album/${album.id}`}" role="button"><span>{{album.name}}</span><span>{{album.artist.name}}</span></router-link>
        </div>
      </TabPane>
      <TabPane label="歌单" name="songs">
        <div v-for="(songs, index) in songsList" :key="songs.id" :class="['album',{grey: index % 2 === 0}]">
          <img :src="songs.coverImgUrl">
          <router-link :to="'/playlist/'+songs.id"><span>{{songs.name}}</span><span>{{songs.trackCount}}首</span><span>by {{songs.creator.nickname}}</span></router-link>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Http from '../http/core.http'
export default {
  name: 'search-result',
  props: {
    searchText: {
      default: ''
    }
  },
  created () {
    const self = this
    console.log(this.searchText)
    Http.search(this.searchText, 1).then(res => {
      res.data.result.songs.forEach(data => {
        self.songList.push({
          id: data.id,
          songName: data.name,
          singer: data.artists[0].name,
          al: data.album.name
        })
      })
      self.loading = false
    })
  },
  data () {
    return {
      song: [
        {
          title: '音乐标题',
          key: 'songName'
        },
        {
          title: '歌手',
          key: 'singer'
        },
        {
          title: '专辑',
          key: 'al'
        }
      ],
      songList: [],
      singerList: [],
      albumList: [],
      songsList: [],
      loading: true
    }
  },
  watch: {
    '$route': function (val, oldVal) {
      const self = this
      self.songList = []
      this.loading = true
      Http.search(this.$route.params.searchText, 1).then(res => {
        res.data.result.songs.forEach(data => {
          self.songList.push({
            id: data.id,
            songName: data.name,
            singer: data.artists[0].name,
            al: data.album.name
          })
        })
        self.loading = false
      })
    }
  },
  methods: {
    tabs (name) {
      switch (name) {
        case 'song' : {
          this.getSongList()
          break
        }
        case 'singer' : {
          this.getSingerList()
          break
        }
        case 'album' : {
          this.getAlbumList()
          break
        }
        case 'songs' : {
          this.getSongsList()
          break
        }
      }
    },
    doSelect (data, index) {
      window.wangApp.$emit('playsong', data.id)
    },
    getSongList () {
      const self = this
      self.songList = []
      this.loading = true
      Http.search(this.$route.params.searchText, 1).then(res => {
        res.data.result.songs.forEach(data => {
          self.songList.push({
            id: data.id,
            songName: data.name,
            singer: data.artists[0].name,
            al: data.album.name
          })
        })
        self.loading = false
      })
    },
    getSingerList () {
      const self = this
      this.loading = true
      Http.search(this.searchText, 100).then(res => {
        self.singerList = res.data.result.artists
        self.loading = false
      })
    },
    getAlbumList () {
      const self = this
      this.loading = true
      Http.search(this.searchText, 10).then(res => {
        self.albumList = res.data.result.albums
        self.loading = false
      })
    },
    getSongsList () {
      const self = this
      this.loading = true
      Http.search(this.searchText, 1000).then(res => {
        self.songsList = res.data.result.playlists
        self.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.singer{
  padding: 10px;
  img{
    width: 40px;
    height: 40px;
    vertical-align: bottom;
  }
  a{
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    margin-left: 10px;
  }
}
.album{
  padding: 10px;
  img{
    width: 40px;
    height: 40px;
    vertical-align: bottom;
  }
  a{
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    margin-left: 10px;
    span{
      margin-right: 50px;
    }
  }
}
.grey{
  background-color: rgba(128, 128, 128, 0.3);
}
</style>
