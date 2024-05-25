<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Crear
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Empleado
            </div>
            <div class="card-body">
                <form @submit.prevent="saveEmpleado">
                    <div class="row mb-3">
                        <label for="id">Id</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Id de empleado" disabled 
                            v-model="empleado.id">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="nombre">Nombre</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre del empleado"  
                            v-model="empleado.nombre" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="apellido">Apellido</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="text" class="form-control" id="apellido" placeholder="Apellido de empleado"  
                            v-model="empleado.apellido" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="cargo">Cargo</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="text" class="form-control" id="cargo" placeholder="Cargo de empleado"  
                            v-model="empleado.cargo" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="salario">Salario</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="text" class="form-control" id="salario" placeholder="Salario de empleado"  
                            v-model="empleado.salario" required>
                        </div>
                    </div>

                    <button class="btn btn-primary" type="submit">Guardar</button>
                    <button class="btn btn-danger mx-2" @click="cancelar">Cancelar</button>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"

export default {
    name: "NewEmpleado",
    data(){
        return{
            empleado: {
                id: 0,
                nombre: '',
                apellido: '',
                cargo: '',
                salario: '',
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Empleados' });
        },

        async saveEmpleado() {
            try {
                const res = await axios.post('http://localhost:8000/api/empleados', this.empleado);

                if (res.status === 200) { 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Empleado ha sido creado correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        this.$router.push({ name: 'Empleados' });
                    });
                }
            } catch (error) {
                console.error('Error creando el empleado:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo crear la empleado. Por favor, intente de nuevo.',
                });
            }
        }
    },
    
}
</script>
