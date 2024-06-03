import { createRouter, createWebHistory } from 'vue-router'
import full_scree_clock from '../views/full_scree_clock.vue'
import home_page from '../views/home_page.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: home_page
        },
        {
            path: '/full_scree_clock',
            name: 'about',
            component: full_scree_clock

            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () => import('../views/AboutView.vue')
        }
    ]
})

export default router
