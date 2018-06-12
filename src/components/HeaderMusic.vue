<template>
  <div class="header">
    <span><Icon type="headphone"></Icon>音乐播放器</span>
    <Input type="text" v-model="search" placeholder="搜索音乐，视频，歌词电台" style="width:250px" icon="search" size="large" @on-enter="doSearch()"/>
  </div>
</template>

<script>
export default {
  name: 'header-music',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    doSearch () {
      this.$emit('doSearch', this.search)
    }
  }
}
</script>

<style scoped lang="scss">
.header{
  text-align: center;
  font-size: 30px;
}
</style>
