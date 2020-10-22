import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import Lists from '../views/Lists.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/:catchAll(.*)',
        component: NotFound,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
    },
    {
        path: '/lists',
        name: 'Lists',
        component: Lists,
    },
    {
        path: '/lists/:listId',
        name: 'List',
        component: List,
        props: true,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
