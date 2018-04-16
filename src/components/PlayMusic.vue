<template>
    <div>
      <audio :src="playSrc" autoplay="true" controls></audio>
      <div class="audio-wrapper">
        <div class="audio-main">
          <div class="btn-control-left">
            <a role="button" @click="last()"><Icon type="ios-skipbackward"></Icon></a>
            <a role="button" @click="play()">
              <Icon type="play" v-if="paused"></Icon>
              <Icon type="ios-pause" v-else></Icon>
            </a>
            <a role="button" @click="next()"><Icon type="ios-skipforward"></Icon></a>
          </div>
          <div class="song-info">
            <img :src="songInfo.al.picUrl">
            <div class="audio-state">
              <div class="song-detail">
                <span>{{songInfo.name}}</span>
                <span>{{songInfo.ar[0].name}}</span>
              </div>
              <div class="play-info">
                <div class="process">
                  <div class="process-all">
                    <div class="process-in-time">
                      <div class="play-icon">
                        <Icon type="disc"></Icon>
                      </div>
                    </div>
                  </div>
                </div>
                <span>{{currentTime}}</span>
                <span>/</span>
                <span>{{duration}}</span>
              </div>
            </div>
          </div>
          <div class="btn-control-right">
            <div class="volume">
              <a role="button" @click="toggleVolumeControl()"><Icon type="volume-high"></Icon></a>
              <div class="volume-control">
                <Slider v-model="volume" :min="0.0" :max="1.0" :step="0.01" @on-input="volumeControl()"></Slider>
              </div>
            </div>
            <a role="button" @click="loopControl()">
              <Icon type="ios-loop-strong" v-if="loop === 'single'"></Icon>
              <Icon type="shuffle" v-if="loop === 'random'"></Icon>
              <Icon type="crop" v-if="loop === 'all'"></Icon>
            </a>
            <a role="button" @click="toggleLyric()">
              <Badge :count="playListCount">
                <Icon type="android-list"></Icon>
              </Badge>
            </a>
            <a :href="playSrc" target="_blank">
              <Icon type="ios-download"></Icon>
            </a>
          </div>
          <div class="lysrc" v-show="lysrcShow">
            <div class="lysrc-left">

            </div>
            <div class="lysrc-right">
              <h3>{{songInfo.name}}</h3>
              <div class="lysrc-main">
                <p v-for="(data, index) in lysrc" :data-time="data.time.split(':')[0] * 60 + (+data.time.split(':')[1])" v-bind:class="{'z-sel': (audio.currentTime >= (data.time.split(':')[0] * 60 + (+data.time.split(':')[1]))) && (audio.currentTime < (lysrc[index + 1].time.split(':')[0] * 60 + (+lysrc[index + 1].time.split(':')[1])))}">
                  {{data.content}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Http from '../http/core.http'
export default {
  name: 'play-music',
  mounted () {
    const self = this
    this.audio = document.querySelector('audio')
    this.audio.addEventListener('ended', function () {
      if (self.list.length !== 0) {
        if (self.loop === 'all') {
          self.pos++
          self.playingID = self.list[self.pos % self.list.length]
        } else if (self.loop === 'random') {
          self.pos = Math.ceil(Math.random() * self.list.length)
          self.playingID = self.list[self.pos % self.list.length]
        }
      }
    })
    const process = document.querySelector('.process-in-time')
    window.setInterval(function () {
      self.currentTime = '0' + Math.floor(self.audio.currentTime / 60) + ':' + (self.audio.currentTime % 60).toFixed(0)
      self.duration = '0' + Math.floor(self.audio.duration / 60) + ':' + (self.audio.duration % 60).toFixed(0)
      process.style.width = self.audio.currentTime / self.audio.duration * 100 + '%'
      document.querySelector('.z-sel') && document.querySelector('.z-sel').scrollIntoView({behavior: 'smooth', block: 'center'})
    }, 100)
  },
  props: {
    songID: {
      default: null
    },
    list: {
      default: []
    }
  },
  data () {
    return {
      paused: false,
      volume: 0.5,
      playListCount: 0,
      playSrc: '',
      playList: [],
      songInfo: {
        ar: [0],
        al: {}
      },
      loop: 'single',
      audio: {},
      currentTime: '00:00',
      duration: '00:00',
      pos: 0,
      playingID: '',
      lysrc: [],
      lysrcShow: false
    }
  },
  methods: {
    play () {
      if (this.paused) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
      this.paused = !this.paused
    },
    toggleVolumeControl () {
      document.querySelector('.volume-control').style.display !== 'inline-block' ? document.querySelector('.volume-control').style.display = 'inline-block' : document.querySelector('.volume-control').style.display = 'none'
    },
    volumeControl (val) {
      this.audio.volume = this.volume
    },
    loopControl () {
      switch (this.loop) {
        case 'single' : {
          this.loop = 'random'
          this.audio.loop = false
          break
        }
        case 'random' : {
          this.loop = 'all'
          this.audio.loop = false
          break
        }
        case 'all' : {
          this.loop = 'single'
          this.audio.loop = true
          break
        }
      }
    },
    last () {
      if (this.list.length !== 0 && this.pos !== 0) {
        if (this.loop !== 'random') {
          this.playingID = this.list[--this.pos]
        } else {
          this.pos = Math.ceil(Math.random() * this.list.length)
          this.playingID = this.list[this.pos % this.list.length]
        }
      }
    },
    next () {
      if (this.list.length !== 0 && this.pos < (this.list.length - 1)) {
        if (this.loop !== 'random') {
          this.playingID = this.list[++this.pos]
        } else {
          this.pos = Math.ceil(Math.random() * this.list.length)
          this.playingID = this.list[this.pos % this.list.length]
        }
      }
    },
    toggleLyric () {
      this.lysrcShow = !this.lysrcShow
    }
  },
  watch: {
    songID: function (val, oldVal) {
      this.playingID = val
    },
    list: function (val, oldVal) {
      this.playingID = val[0]
    },
    playingID: function (val, oldVal) {
      const self = this
      Http.getSongByID(val).then(res => {
        self.playSrc = res.data.data[0].url
      })
      Http.getSongInfoByID(val).then(res => {
        self.songInfo = res.data.songs[0]
      })
      Http.getLysrcByID(val).then(res => {
        self.lysrc = []
        res.data.lrc.lyric.split(/\n/).forEach(data => {
          const pos = data.lastIndexOf(']')
          self.lysrc.push({
            time: data.slice(data.lastIndexOf('[') + 1, pos),
            content: data.slice(pos + 1)
          })
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.audio-wrapper{
  height:50px;
  background-color: #2c2b2a;
  .audio-main{
    margin: 0 auto;
    width: 1024px;
    position: relative;
    .btn-control-left{
      float: left;
      height: 50px;
      font-size: 30px;
      a{
        text-align: center;
        color: #fff;
        border: 1px solid;
        height: 40px;
        width: 40px;
        display: inline-block;
        margin: 5px;
        border-radius: 20px;
        i{
          vertical-align: text-top;
        }
      }
    }
    .song-info{
      float: left;
      width: 500px;
      height: 50px;
      img{
        width: 36px;
        height: 36px;
        vertical-align: bottom;
        float: left;
        margin: 7px;
      }
      .audio-state{
        height: 50px;
        .song-detail{
          font-size: 14px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          margin-left: 60px;
          span{
            margin-right: 30px;
          }
        }
        .play-info{
          margin-left: 40px;
          height: 30px;
          .process{
            float: left;
            width: 350px;
            .process-all{
              height: 10px;
              margin: 10px;
              border-radius: 5px;
              background-color: #191919;
              .process-in-time{
                background-color: red;
                height: 10px;
                border-radius: 5px;
                width: 0;
                .play-icon{
                  float: right;
                  height: 10px;
                  width: 10px;
                  i{
                    color: #fff;
                    vertical-align: text-top;
                    font-size: 14px;
                    position: relative;
                    top: -4px;
                  }
                }
              }
            }
          }
          span{
            font-size: 10px;
            height: 30px;
            line-height: 30px;
            color: #fff;
          }
        }
      }
    }
    .btn-control-right{
      height: 50px;
      font-size: 20px;
      .volume{
        width: 50px;
        height: 50px;
        float: left;
        position: relative;
        .volume-control{
          width: 100px;
          height: 20px;
          display: none;
          position: absolute;
          top: -35px;
          left: -25px;
        }
      }
      a{
        text-align: center;
        color: #fff;
        height: 30px;
        width: 30px;
        display: inline-block;
        margin: 10px;
        i{
          vertical-align: text-top;
        }
      }
    }
    .lysrc{
      position: absolute;
      width: 800px;
      height: 300px;
      top: -300px;
      left: 112px;
      background-color: black;
      color: aliceblue;
      .lysrc-left{
        float: left;
        width: 497px;
        height: 300px;
        overflow-x: hidden;
        overflow-y: auto;
        border-right: 3px solid darkblue;
      }
      .lysrc-right{
        float: left;
        width: 300px;
        height: 300px;
        text-align: center;
        .lysrc-main{
          width: 300px;
          height: 270px;
          overflow-y: auto;
          p{
            padding: 2px;
          }
          .z-sel{
            color: lightcoral;
          }
        }
        h3{
          border-bottom: 1px solid darkmagenta;
          height: 30px;
          font-size: 18px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
