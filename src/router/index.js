import Vue from 'vue'
import Router from 'vue-router'
import DiscoveryMusic from '../components/DiscoveryMusic'
import SongListDetail from '../components/SongListDetail'
import SearchResult from '../components/SearchResult'
import SingerDetail from '../components/SingerDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/playlist/:id',
      component: SongListDetail
    },
    {
      path: '/DiscoveryMusic',
      // name: 'DiscoveryMusic',
      component: DiscoveryMusic
    },
    {
      path: '/search/:searchText',
      component: SearchResult,
      props: true
    },
    {
      path: '/singer/:id',
      component: SingerDetail,
      props: true
    },
    {
      path: '/',
      redirect: '/DiscoveryMusic'
    }
  ]
})
