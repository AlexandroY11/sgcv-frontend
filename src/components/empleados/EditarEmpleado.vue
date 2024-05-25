<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Editar
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Empleado
            </div>
            <div class="card-body">
                <form @submit.prevent="updateEmpleado">
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
                            <input type="number" class="form-control" id="salario" placeholder="Salario de empleado"  
                            v-model="empleado.salario" required>
                        </div>
                    </div>

                    <button class="btn btn-primary" type="submit">Actualizar</button>
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
    name: "EditarEmpleado",
    data(){
        return{
            empleado: {
                id: 0,
                name: '',
                price: 0,
                stock: 0,
                category_id: 0,
            },
            categories: []
        }
    },
    methods:{
        cancelar(){
            this.$router.push({name: 'Empleados'})
        },

        async updateEmpleado(){
            try {
                const res = await axios.put(`http://localhost:8000/api/empleados/${this.empleado.id}`, this.empleado);
                if (res.status == 200) {
                    this.$router.push({name: 'Empleados'});
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Empleado has been updated successfully',
                        showConfirmationButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error('Error actualizando la empleado:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar la empleado. Por favor, intente de nuevo.',
                });
            }

        }
    },
    mounted(){
        this.empleado.id = this.$route.params.id;

        axios.get(`http://localhost:8000/api/empleados/${this.empleado.id}`)
            .then(response => {
                this.empleado = response.data.empleado;
                this.categories = response.data.categories;
            })
    },

}

</script>