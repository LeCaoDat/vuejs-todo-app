import Vue from 'vue'
import Router from 'vue-router'
import ListTodo from '@/components/ListTodo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListTodo',
      component: ListTodo
    }
  ]
})
