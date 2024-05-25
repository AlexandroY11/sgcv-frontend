import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Tratamientos from '../views/Tratamientos.vue'
import NewTratamiento from '@/components/tratamientos/NewTratamiento.vue'
import EditarTratamiento from '@/components/tratamientos/EditarTratamiento.vue'
import HistoriasClinicas from '@/views/HistoriasClinicas.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tratamientos',
    name: 'Tratamientos',
    component: Tratamientos
  },
  {
    path: '/add-tratamiento',
    name: 'NewTratamiento',
    component: NewTratamiento
  },
  {
    path: '/editar-tratamiento/:id',
    name: 'EditarTratamiento',
    component: EditarTratamiento
  },
  {
    path: '/historias-clinicas',
    name: 'HistoriasClinicas',
    component: HistoriasClinicas
  },
  // {
  //   path: '/add-tratamiento',
  //   name: 'NewTratamiento',
  //   component: NewTratamiento
  // },
  // {
  //   path: '/editar-tratamiento/:id',
  //   name: 'EditarTratamiento',
  //   component: EditarTratamiento
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
