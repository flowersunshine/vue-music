<template>
  <div>
    <span>{{songInfo.name}}</span>
    <span>{{songInfo.ar[0].name}}</span>
  </div>
</template>

<script>
import Http from '../http/core.http'
export default {
  name: 'song-play',
  props: {
    id: ''
  },
  data () {
    return {
      songInfo: {
        ar: [{name: ''}]
      }
    }
  },
  created () {
    const self = this
    Http.getSongInfoByID(this.id).then(res => {
      self.songInfo = res.data.songs[0]
    })
  }
}
</script>

<style scoped lang="scss">
span{
  padding: 4px 10px;
}
</style>
