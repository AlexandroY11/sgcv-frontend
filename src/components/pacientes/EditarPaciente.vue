<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Editar
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Paciente
            </div>
            <div class="card-body">
                <form @submit.prevent="updatePaciente">
                    <div class="row mb-3">
                        <label for="id">Code</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Id de paciente" disabled 
                            v-model="paciente.id">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="descripcion">Descripción</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <textarea type="text" class="form-control" id="descripcion" placeholder="Descripción del paciente"  
                            v-model="paciente.descripcion" required></textarea>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="costo">Costo</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="number" class="form-control" id="costo" placeholder="Costo de paciente"  
                            v-model="paciente.costo" required>
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
    name: "EditarPaciente",
    data(){
        return{
            paciente:{
                id:0,
                descripcion:'',
                costo: 0,
            }
        }
    },
    methods:{
        cancelar(){
            this.$router.push({name: 'Pacientes'})
        },

        async updatePaciente(){
            try {
                const res = await axios.put(`http://localhost:8000/api/pacientes/${this.paciente.id}`, this.paciente);
                if (res.status == 200) {
                    this.$router.push({name: 'Pacientes'});
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Paciente hasido actualizado correctamente',
                        showConfirmationButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error('Error actualizando la paciente:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar la paciente. Por favor, intente de nuevo.',
                });
            }

        }
    },
    mounted(){
        this.pacientes.id = this.$route.params.id;

        axios.get(`http://localhost:8000/api/pacientes/${this.paciente.id}`)
            .then(response => {
                this.paciente = response.data.paciente;
            })
    },

}

</script>