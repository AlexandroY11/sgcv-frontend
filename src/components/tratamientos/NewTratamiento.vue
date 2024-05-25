<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Crear
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Tratamiento
            </div>
            <div class="card-body">
                <form @submit.prevent="saveTratamiento">
                    <div class="row mb-3">
                        <label for="id">Code</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Id de tratamiento" disabled 
                            v-model="tratamiento.id">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="descripcion">Descripción</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <textarea type="text" class="form-control" id="descripcion" placeholder="Descripción del tratamiento"  
                            v-model="tratamiento.descripcion" required></textarea>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="costo">Costo</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="number" class="form-control" id="costo" placeholder="Costo de tratamiento"  
                            v-model="tratamiento.costo" required>
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
    name: "NewTratamiento",
    data(){
        return{
            tratamiento: {
                id: 0,
                descripcion: '',
                costo: 0,
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Tratamientos' });
        },

        async saveTratamiento() {
            try {
                const res = await axios.post('http://localhost:8000/api/tratamientos', this.tratamiento);

                if (res.status === 200) { 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Tratamiento ha sido creado correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        this.$router.push({ name: 'Tratamientos' });
                    });
                }
            } catch (error) {
                console.error('Error creando el tratamiento:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo crear la tratamiento. Por favor, intente de nuevo.',
                });
            }
        }
    },
    
}
</script>
