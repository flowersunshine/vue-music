<template>
  <div>
    <a @click="play" style="color: #000">{{songInfo.name}}</a>
  </div>
</template>

<script>
import Http from '../http/core.http'
export default {
  name: 'song',
  props: {
    id: ''
  },
  data () {
    return {
      songInfo: {}
    }
  },
  created () {
    const self = this
    Http.getSongInfoByID(this.id).then(res => {
      self.songInfo = res.data.songs[0]
    })
  },
  methods: {
    play () {
      window.wangApp.$emit('playsong', this.id)
    }
  }
}
</script>

<style scoped>

</style>
