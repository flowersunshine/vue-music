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
    <tab-pane label="主播电台" name="broadcastStation"></tab-pane>
    <tab-pane label="排行榜" name="leaderBoard"></tab-pane>
    <tab-pane label="歌手（不好使）" name="singer">
      <div>
        <span>语种：</span>
        <a role="button">全部</a>
        <a role="button">华语</a>
        <a role="button">欧美</a>
        <a role="button">日本</a>
        <a role="button">韩国</a>
        <a role="button">其他</a>
      </div>
    </tab-pane>
    <tab-pane label="最新音乐" name="newMusic"></tab-pane>
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
      songList: []
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
      }
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
</style>
