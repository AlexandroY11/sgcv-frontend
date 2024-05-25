import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Tratamientos from '../views/Tratamientos.vue'
import NewTratamiento from '@/components/tratamientos/NewTratamiento.vue'
import EditarTratamiento from '@/components/tratamientos/EditarTratamiento.vue'
import HistoriasClinicas from '@/views/HistoriasClinicas.vue'
import NewHistoriaClinica from '@/components/historiasClinicas/NewHistoriaClinica.vue'
import EditarHistoriaClinica from '@/components/historiasClinicas/EditarHistoriaClinica.vue'
import Facturas from '../views/Facturas.vue'
import NewFactura from '@/components/facturas/NewFactura.vue'
import EditarFactura from '@/components/facturas/EditarFactura.vue'
import Empleados from '@/views/Empleados.vue'
import NewEmpleado from '@/components/empleados/NewEmpleado.vue'
import EditarEmpleado from '@/components/empleados/EditarEmpleado.vue'
import Pacientes from '@/views/Pacientes.vue'
import NewPaciente from '@/components/pacientes/NewPaciente.vue'
import EditarPaciente from '@/components/pacientes/EditarPaciente.vue'
import Citas from '@/views/Citas.vue'


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
  {
    path: '/add-historiaClinica',
    name: 'NewHistoriaClinica',
    component: NewHistoriaClinica
  },
  {
    path: '/editar-historiaClinica/:id',
    name: 'EditarHistoriaClinica',
    component: EditarHistoriaClinica
  },
  {
    path: '/facturas',
    name: 'Facturas',
    component: Facturas
  },
  {
    path: '/add-factura',
    name: 'NewFactura',
    component: NewFactura
  },
  {
    path: '/editar-factura/:id',
    name: 'EditarFactura',
    component: EditarFactura
  },
  {
    path: '/empleados',
    name: 'Empleados',
    component: Empleados
  },
  {
    path: '/add-empleado',
    name: 'NewEmpleado',
    component: NewEmpleado
  },
  {
    path: '/editar-empleado/:id',
    name: 'EditarEmpleado',
    component: EditarEmpleado
  },
  {
    path: '/pacientes',
    name: 'Pacientes',
    component: Pacientes
  },
  {
    path: '/add-paciente',
    name: 'NewPaciente',
    component: NewPaciente
  },
  {
    path: '/editar-paciente/:id',
    name: 'EditarPaciente',
    component: EditarPaciente
  },
  {
    path: '/citas',
    name: 'Citas',
    component: Citas
  },
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
