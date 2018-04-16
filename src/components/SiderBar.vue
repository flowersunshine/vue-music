<template>
    <Menu :accordion="true" mode="vertical">
      <submenu name="recommend">
        <template slot="title">
          推荐
        </template>
        <menu-item name="discoveryMusic">
          <icon type="music-note"></icon><router-link to="/DiscoveryMusic">发现音乐</router-link>
        </menu-item>
        <menu-item name="personalFM"><icon type="radio-waves"></icon>私人FM</menu-item>
        <menu-item name="MV"><icon type="ipod"></icon> MV</menu-item>
      </submenu>
      <Submenu name="myMusic">
        <template slot="title">
          我的音乐
        </template>
        <menu-item name="localMusic"><Icon type="social-octocat"></Icon> 我的收藏</menu-item>
      </Submenu>
      <Submenu name="songList">
        <template slot="title">
          收藏的歌单
        </template>
      </Submenu>
    </Menu>
</template>

<script>
import MenuItem from 'iview/src/components/menu/menu-item'

export default {
  components: {MenuItem},
  name: 'sider-bar',
  data () {
    return {
      activeName: '',
      openNames: []
    }
  }
}
</script>

<style scoped>

</style>
