<template>
  <Tabs type="card" @on-click="tabs">
    <tab-pane label="个性推荐" name="personalityRecommendation">
      <div class="title clearfix">
        <span>推荐歌单</span>
      </div>
      <div class="mainContent">
        <ul>
          <li v-for="item in personalized" :key="item.id" class="left">
            <router-link :to="{path:`/playlist/${item.id}`}">
              <a class="item" :title="item.copywriter">
                <img :src="item.picUrl">
                <p>{{item.name}}</p>
                <span><Icon type="headphone"></Icon> {{(item.playCount / 10000).toFixed(2)}}万</span>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </tab-pane>
    <tab-pane label="歌单" name="songList">
      <Dropdown style="width:100px" @on-click="getSongList">
        <a href="javascript:void(0)">
          选择标签
          <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="全部">全部歌单</DropdownItem>
          <Dropdown placement="right-start">
            <DropdownItem>
              <Icon type="ios-world"></Icon>
              语种
              <Icon type="ios-arrow-right"></Icon>
            </DropdownItem>
            <DropdownMenu slot="list">
              <DropdownItem name="华语">华语</DropdownItem>
              <DropdownItem name="欧美">欧美</DropdownItem>
              <DropdownItem name="日语">日语</DropdownItem>
              <DropdownItem name="韩语">韩语</DropdownItem>
              <DropdownItem name="粤语">粤语</DropdownItem>
              <DropdownItem name="小语种">小语种</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown placement="right-start">
            <DropdownItem>
              <Icon type="playstation"></Icon>
              风格
              <Icon type="ios-arrow-right"></Icon>
            </DropdownItem>
            <DropdownMenu slot="list">
              <DropdownItem name="流行">流行</DropdownItem>
              <DropdownItem name="摇滚">摇滚</DropdownItem>
              <DropdownItem name="民谣">民谣</DropdownItem>
              <DropdownItem name="电子">电子</DropdownItem>
              <DropdownItem name="舞曲">舞曲</DropdownItem>
              <DropdownItem name="说唱">说唱</DropdownItem>
              <DropdownItem name="轻音乐">轻音乐</DropdownItem>
              <DropdownItem name="爵士">爵士</DropdownItem>
              <DropdownItem name="乡村">乡村</DropdownItem>
              <DropdownItem name="古典">古典</DropdownItem>
              <DropdownItem name="民族">民族</DropdownItem>
              <DropdownItem name="英伦">英伦</DropdownItem>
              <DropdownItem name="金属">金属</DropdownItem>
              <DropdownItem name="朋克">朋克</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown placement="right-start">
            <DropdownItem>
              <Icon type="coffee"></Icon>
              场景
              <Icon type="ios-arrow-right"></Icon>
            </DropdownItem>
            <DropdownMenu slot="list">
              <DropdownItem name="清晨">清晨</DropdownItem>
              <DropdownItem name="夜晚">夜晚</DropdownItem>
              <DropdownItem name="学习">学习</DropdownItem>
              <DropdownItem name="工作">工作</DropdownItem>
              <DropdownItem name="午休">午休</DropdownItem>
              <DropdownItem name="下午茶">下午茶</DropdownItem>
              <DropdownItem name="地铁">地铁</DropdownItem>
              <DropdownItem name="驾车">驾车</DropdownItem>
              <DropdownItem name="运动">运动</DropdownItem>
              <DropdownItem name="旅行">旅行</DropdownItem>
              <DropdownItem name="散步">散步</DropdownItem>
              <DropdownItem name="酒吧">酒吧</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown placement="right-start">
            <DropdownItem>
              <Icon type="happy-outline"></Icon>
              情感
              <Icon type="ios-arrow-right"></Icon>
            </DropdownItem>
            <DropdownMenu slot="list">
              <DropdownItem name="怀旧">怀旧</DropdownItem>
              <DropdownItem name="清新">清新</DropdownItem>
              <DropdownItem name="浪漫">浪漫</DropdownItem>
              <DropdownItem name="性感">性感</DropdownItem>
              <DropdownItem name="伤感">伤感</DropdownItem>
              <DropdownItem name="治愈">治愈</DropdownItem>
              <DropdownItem name="放松">放松</DropdownItem>
              <DropdownItem name="孤独">孤独</DropdownItem>
              <DropdownItem name="感动">感动</DropdownItem>
              <DropdownItem name="兴奋">兴奋</DropdownItem>
              <DropdownItem name="快乐">快乐</DropdownItem>
              <DropdownItem name="安静">安静</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown placement="right-start">
            <DropdownItem>
              <Icon type="ios-grid-view"></Icon>
              主题
              <Icon type="ios-arrow-right"></Icon>
            </DropdownItem>
            <DropdownMenu slot="list">
              <DropdownItem name="影视原声">影视原声</DropdownItem>
              <DropdownItem name="校园">校园</DropdownItem>
              <DropdownItem name="游戏">游戏</DropdownItem>
              <DropdownItem name="70后">70后</DropdownItem>
              <DropdownItem name="80后">80后</DropdownItem>
              <DropdownItem name="90后">90后</DropdownItem>
              <DropdownItem name="网络歌曲">网络歌曲</DropdownItem>
              <DropdownItem name="KTV">KTV</DropdownItem>
              <DropdownItem name="经典">经典</DropdownItem>
              <DropdownItem name="翻唱">翻唱</DropdownItem>
              <DropdownItem name="吉他">吉他</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </DropdownMenu>
      </Dropdown>
      <div>
        <ul>
          <li v-for="item in songList" :key="item.id" class="left">
            <router-link :to="{path:`/playlist/${item.id}`}">
              <a class="item" :title="item.copywriter">
                <img :src="item.coverImgUrl">
                <p>{{item.name}}</p>
                <span><Icon type="headphone"></Icon> {{(item.playCount / 10000).toFixed(2)}}万</span>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </tab-pane>
    <tab-pane label="主播电台" name="broadcastStation">
      <Row>
        <Col span="12">
          <h3>推荐电台</h3>
          <div v-for="item in dj" :key="item.program.mainSong.id" class="dj-item clearfix" @click="play(item.program.mainSong.id)">
            <img :src="item.picUrl">
            <span>{{item.name}}</span>
            <br>
            <span>{{item.program.mainSong.artists[0].name}}</span>
          </div>
        </Col>
        <Col span="12">
          <h3>推荐节目</h3>
          <div v-for="item in program" :key="item.mainSong.id" class="dj-item clearfix" @click="play(item.mainSong.id)">
            <img :src="item.coverUrl">
            <span>{{item.name}}</span>
            <br>
            <span>{{item.mainSong.artists[0].name}}</span>
          </div>
        </Col>
      </Row>
    </tab-pane>
    <tab-pane label="排行榜" name="topList">
      <div class="top-list-left">
        <div class="top-list-group">
          <h3>云音乐特色榜</h3>
          <a class="clearfix" @click="getTopList(3)">
            <img src="http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=40y40">
            <div>
              <h4>云音乐飙升榜</h4>
              <span>每天更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(0)">
            <img src="http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=40y40">
            <div>
              <h4>云音乐新歌榜</h4>
              <span>每天更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(2)">
            <img src="http://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=40y40">
            <div>
              <h4>网易原创歌曲榜</h4>
              <span>每周四更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(1)">
            <img src="http://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=40y40">
            <div>
              <h4>云音乐热歌榜</h4>
              <span>每周四更新</span>
            </div>
          </a>
        </div>
        <div class="top-list-group">
          <h3>全球媒体榜</h3>
          <a class="clearfix" @click="getTopList(4)">
            <img src="http://p1.music.126.net/5tgOCD4jiPKBGt7znJl-2g==/18822539557941307.jpg?param=40y40">
            <div>
              <h4>云音乐电音榜</h4>
              <span>每周五更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(23)">
            <img src="http://p1.music.126.net/RChr5NydlXafIV1GVEHJdg==/19073228207465342.jpg?param=40y40">
            <div>
              <h4>云音乐嘻哈榜</h4>
              <span>每周五更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(22)">
            <img src="http://p1.music.126.net/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg?param=40y40">
            <div>
              <h4>云音乐ACG音乐榜</h4>
              <span>每周四更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(5)">
            <img src="http://p1.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg?param=40y40">
            <div>
              <h4>UK排行榜周榜</h4>
              <span>每周一更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(6)">
            <img src="http://p1.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg?param=40y40">
            <div>
              <h4>美国BillBoard周榜</h4>
              <span>每周三更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(21)">
            <img src="http://p1.music.126.net/A61n94BjWAb-ql4xpwpYcg==/18613632348448741.jpg?param=40y40">
            <div>
              <h4>BeatPort全球电子舞曲榜</h4>
              <span>每周四更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(19)">
            <img src="http://p1.music.126.net/6O0ZEnO-I_RADBylVypprg==/109951162873641556.jpg?param=40y40">
            <div>
              <h4>法国 NRJ Vos Hits 周榜</h4>
              <span>每周五更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(7)">
            <img src="http://p1.music.126.net/H4Y7jxd_zwygcAmPMfwJnQ==/19174383276805159.jpg?param=40y40">
            <div>
              <h4>KTV唛榜</h4>
              <span>每周五更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(8)">
            <img src="http://p1.music.126.net/83pU_bx5Cz0NlcTq-P3R3g==/18588343581028558.jpg?param=40y40">
            <div>
              <h4>Itunes榜</h4>
              <span>每周一更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(10)">
            <img src="http://p1.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg?param=40y40">
            <div>
              <h4>日本Oricon周榜</h4>
              <span>每周三更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(9)">
            <img src="http://p1.music.126.net/54vZEZ-fCudWZm6GH7I55w==/19187577416338508.jpg?param=40y40">
            <div>
              <h4>Hit FM Top榜</h4>
              <span>每周一更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(20)">
            <img src="http://p1.music.126.net/wqi4TF4ILiTUUL5T7zhwsQ==/18646617697286899.jpg?param=40y40">
            <div>
              <h4>台湾Hito排行榜</h4>
              <span>每周一更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(14)">
            <img src="http://p1.music.126.net/JPh-zekmt0sW2Z3TZMsGzA==/18967675090783713.jpg?param=40y40">
            <div>
              <h4>中国TOP排行榜(港台榜)</h4>
              <span>每周一更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(15)">
            <img src="http://p1.music.126.net/2klOtThpDQ0CMhOy5AOzSg==/18878614648932971.jpg?param=40y40">
            <div>
              <h4>中国TOP排行榜(内地榜)</h4>
              <span>每周一更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(16)">
            <img src="http://p1.music.126.net/YQsr07nkdkOyZrlAkf0SHA==/18976471183805915.jpg?param=40y40">
            <div>
              <h4>香港电台中文歌曲龙虎榜</h4>
              <span>每周五更新</span>
            </div>
          </a>
          <a class="clearfix" @click="getTopList(18)">
            <img src="http://p1.music.126.net/_nwkQTFtOdAjFvOI8Wg7Tg==/18922595114302109.jpg?param=40y40">
            <div>
              <h4>中国嘻哈榜</h4>
              <span>每周五更新</span>
            </div>
          </a>
        </div>
      </div>
      <div class="top-list-right">
        <div class="top-list-header">
          <img :src="topList.coverImgUrl">
          <div>
            <h3>{{topList.name}}</h3>
            <span><Icon type="ios-clock-outline"></Icon>最近更新：{{new Date(topList.updateTime).toDateString()}}</span>
            <br>
            <Button type="primary" shape="circle" icon="ios-play" @click="playAll">播放</Button>
          </div>
        </div>
        <div class="top-list-song">
          <strong>歌曲列表</strong>
          <span>{{topList.trackCount}}首歌</span>
          <span>播放：{{topList.playCount}}次</span>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>标题</th>
                <th>歌手</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in topList.tracks" :key="item.id">
                <td>{{index + 1}}</td>
                <td><a role="button" @click="play(item.id)"><Icon type="ios-play"></Icon>{{item.name}}</a></td>
                <td><router-link :to="{path: `/singer/${item.artists[0].id}`}">{{item.artists[0].name}}</router-link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </tab-pane>
    <tab-pane label="歌手" name="singer">
      <router-link v-for="item in hotSingers" :key="item.id" :to="{path: `/singer/${item.id}`}" class="singer">
        <img :src="item.img1v1Url">
        <span>{{item.name}}</span>
      </router-link>
    </tab-pane>
    <tab-pane label="最新音乐" name="newMusic">
      <div class="header">
        <strong>新歌速递</strong>
        <a @click="playAllNew()">播放全部</a>
      </div>
      <table class="new-song">
        <tbody>
          <tr v-for="(item, index) in newSong" :key="item.id">
            <td>{{index + 1}}</td>
            <td><a @click="play(item.id)"><img :src="item.song.album.picUrl"></a></td>
            <td>{{item.name}}</td>
            <td><router-link :to="{path: `/singer/${item.song.artists[0].id}`}">{{item.song.artists[0].name}}</router-link></td>
            <td>{{item.song.album.name}}</td>
          </tr>
        </tbody>
      </table>
    </tab-pane>
  </Tabs>
</template>

<script>
import Http from '../http/core.http'

export default {
  name: 'discovery-music',
  created () {
    this.getPersonalized()
  },
  data () {
    return {
      personalized: [],
      songList: [],
      hotSingers: [],
      topList: {},
      newSong: [],
      dj: [{program: {mainSong: {artists: [{}]}}}],
      program: []
    }
  },
  methods: {
    getPersonalized () {
      const self = this
      Http.getPersonalized().then(function (res) {
        self.personalized = res.data.result
      })
    },
    getSongList (cat) {
      const self = this
      Http.getHighQuality(cat).then(function (res) {
        self.songList = res.data.playlists
      })
    },
    getHotSingers () {
      const self = this
      Http.getHotSinger().then(res => {
        self.hotSingers = res.data.artists
      })
    },
    getTopList (id) {
      const self = this
      Http.getTopList(id).then(res => {
        self.topList = res.data.result
      })
    },
    getNewSong () {
      const self = this
      Http.getNewSong().then(res => {
        self.newSong = res.data.result
      })
    },
    getDj () {
      const self = this
      Http.getDJ().then(res => {
        self.dj = res.data.result
      })
    },
    getProgram () {
      const self = this
      Http.getProgram().then(res => {
        self.program = res.data.programs
      })
    },
    tabs (name) {
      switch (name) {
        case 'personalityRecommendation' : {
          this.getPersonalized()
          break
        }
        case 'songList' : {
          this.getSongList('全部')
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
        case 'singer' : {
          this.getHotSingers()
          break
        }
        case 'topList' : {
          this.getTopList(3)
          break
        }
        case 'newMusic' : {
          this.getNewSong()
          break
        }
        case 'broadcastStation' : {
          this.getDj()
          this.getProgram()
          break
        }
      }
    },
    play (id) {
      window.wangApp.$emit('playsong', id)
    },
    playAll () {
      const list = []
      this.topList.trackIds.forEach(data => {
        list.push(data.id)
      })
      window.wangApp.$emit('playList', list)
    },
    playAllNew () {
      const list = []
      this.newSong.forEach(data => {
        list.push(data.id)
      })
      window.wangApp.$emit('playList', list)
    }
  }
}
</script>

<style scoped lang="scss">
  .title{
    span{
      float: left;
      font-size: 24px;
    }
    a{
      float: right;
    }
  }
.item{
  margin: 10px;
  display: inline-block;
  width:200px;
  height: 250px;
  position: relative;
  img{
    width: 100%;
  }
  span{
    position: absolute;
    right: 0;
    top: 0;
  }
}
  .mainContent{
    height: 500px;
    overflow: auto;
  }
  .singer{
    width: 150px;
    float: left;
    margin: 10px;
    img{
      width: 100%;
    }
  }
  .top-list-left{
    width: 200px;
    float: left;
    .top-list-group{
      padding:5px;
      h3{
        margin-bottom: 10px;
      }
      a{
        display: block;
        padding: 5px;
        img{
          float: left;
          vertical-align: top;
        }
      }
    }
  }
  .top-list-right{
    .top-list-header{
      height: 250px;
      img{
        width: 200px;
        float: left;
      }
      div{
        margin-left: 400px;
        padding: 10px;
      }
    }
    .top-list-song{
      strong{
        padding: 5px;
        font-size: 1.5em;
      }
      span{
        margin-left: 10px;
      }
      i{
        padding: 4px;
      }
    }
  }
  .new-song{
    img{
      width: 30px;
    }
  }
  .header{
    strong{
      padding: 5px;
      font-size: 1.5em;
    }
  }
  .dj-item{
    margin: 10px;
    img{
      width: 50px;
      vertical-align: text-top;
      float: left;
    }
    span{
      padding: 5px;
    }
  }
  .dj-item:hover{
    cursor: pointer;
  }
</style>
