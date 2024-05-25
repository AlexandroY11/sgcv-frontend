<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Editar Historia Clínica
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Historia Clínica
            </div>
            <div class="card-body">
                <form @submit.prevent="updateHistoriaClinica">
                    <div class="row mb-3">
                        <label for="id">Id</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Id de Historia clínica" disabled 
                            v-model="historiaClinica.id">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="detalles">Detalles</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <textarea type="text" class="form-control" id="detalles" placeholder="Detalles de la Historia clínica"  
                            v-model="historiaClinica.detalles" required></textarea>
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
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: "EditarHistoriaClinica",
    data() {
        return {
            historiaClinica: {
                id: 0,
                detalles: '',
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'HistoriasClinicas' });
        },
        async updateHistoriaClinica() {
            try {
                const res = await axios.put(`http://localhost:8000/api/historialesMedicos/${this.historiaClinica.id}`, this.historiaClinica);
                if (res.status === 200) {
                    this.$router.push({ name: 'HistoriasClinicas' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Historia Clínica actualizada correctamente',
                        showConfirmationButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error('Error actualizando la historia clínica:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar la historia clínica. Por favor, inténtelo de nuevo.',
                });
            }
        }
    },
    mounted() {
        this.historiaClinica.id = this.$route.params.id;

        axios.get(`http://localhost:8000/api/historialesMedicos/${this.historiaClinica.id}`)
            .then(response => {
                this.historiaClinica = response.data.historialMedico;
            })
            .catch(error => {
                console.error('Error obteniendo la historia clínica:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo obtener la historia clínica. Por favor, inténtelo de nuevo.',
                });
            });
    },
}
</script>
