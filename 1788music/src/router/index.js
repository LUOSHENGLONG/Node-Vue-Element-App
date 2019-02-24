import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import Home from '@/components/Home.vue'
import FoundList from '@/components/FoundList.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Info from '@/components/Info.vue'
import NotFound from '@/components/NotFound.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      component: NotFound,
      name: '/404'
    }
    ,
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      name: 'index',
      children: [
        { path: '', component: Home},
        { path: '/home', component: Home, name: 'home'},
        { path: '/foundList', component: FoundList, name: 'foundList'},
        { path: '/info', component: Info, name: 'info'},
      ]
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/register',
      component: Register,
      name: 'register'
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.token ? true : false
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router