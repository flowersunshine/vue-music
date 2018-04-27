<template>
  <div>
    <div class="clearfix">
      <div class="left">
        <img :src="playList['coverImgUrl']" style="width: 200px">
      </div>
      <div class="song-list-info">
        <div class="song-list-header">
          <Tag color="red">歌单</Tag>
          <span class="strong">{{playList['name']}}</span>
          <span class="right">播放数{{playList['playCount']}}</span>
          <span class="right">歌曲数{{playList['trackCount']}}</span>
        </div>
        <div class="creator">
          <Avatar :src="playList['creator']['avatarUrl']"/>
          <span class="strong">{{playList['creator']['nickname']}}</span>
          <span>{{new Date(playList['createTime']).toDateString()}}创建</span>
        </div>
        <div><Button type="ghost" shape="circle" icon="play" @click="playAll()">播放全部</Button></div>
        <div class="label">标签：<span>{{playList['tags'].join('/')}}</span></div>
        <div class="introduction">简介<p v-html="playList['description'].split(/\n/).join('<br>')"></p></div>
      </div>
    </div>
    <div>
      <h3 class="strong" style="margin: 10px">歌曲列表</h3>
      <Table :columns="columns" :data="detailShow" stripe :loading="loading" @on-row-click="doSelect"></Table>
    </div>
  </div>
</template>

<script>
import Http from '../http/core.http'
export default {
  name: 'song-list-detail',
  created () {
    this.getPlayList(this.$route.params.id)
  },
  data () {
    return {
      id: '',
      playList: {
        creator: {},
        tags: [],
        description: ''
      },
      columns: [
        {
          title: '音乐标题',
          key: 'songName',
          sortable: true
        },
        {
          title: '歌手',
          key: 'singer',
          sortable: true
        },
        {
          title: '专辑',
          key: 'al',
          sortable: true
        }
      ],
      detailShow: [],
      loading: true
    }
  },
  methods: {
    getPlayList (id) {
      const self = this
      Http.getPlayList(id).then(function (res) {
        self.playList = res.data.playlist
        self.playList['tracks'].forEach(function (data) {
          self.detailShow.push({
            id: data.id,
            songName: data.name,
            singer: data.ar[0].name,
            al: data.al.name
          })
        })
        self.loading = false
      })
    },
    doSelect (data, index) {
      window.wangApp.$emit('playsong', data.id)
    },
    playAll () {
      const list = []
      this.playList['tracks'].forEach(function (data) {
        list.push(data.id)
      })
      window.wangApp.$emit('playList', list)
    }
  }
}
</script>

<style scoped lang="scss">
  img{
    vertical-align: bottom;
  }
  .strong{
    font-size: 1.4em;
    line-height: 22px;
    height: 22px;
  }
.song-list-info{
  margin-left: 210px;
  .song-list-header{
    span + span{
      border-right: 1px solid grey;
      width: 70px;
      text-align: right;
      margin-right: 10px;
      padding: 10px;
    }
  }
  .creator{
    margin: 5px;
    span{
      margin-right: 10px;
    }
  }
  .label{
    margin: 5px;
  }
}
  .introduction{
    height: 80px;
    overflow-y: auto;
  }
</style>
