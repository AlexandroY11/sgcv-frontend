<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Crear
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Historia Clínica
            </div>
            <div class="card-body">
                <form @submit.prevent="saveHistoriaClinica">
                    <div class="row mb-3">
                        <label for="id">Code</label>
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
    name: "NewHistoriaClinica",
    data(){
        return{
            historiaClinica: {
                id: 0,
                detalles: '',
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'HistoriaClinicas' });
        },

        async saveHistoriaClinica() {
            try {
                const res = await axios.post('http://localhost:8000/api/historiasClinicas', this.historiaClinica);

                if (res.status === 200) { 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Historia clínica ha sido creado correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        this.$router.push({ name: 'HistoriasClinicas' });
                    });
                }
            } catch (error) {
                console.error('Error creando la historia clínica:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo crear la historia clínica. Por favor, intente de nuevo.',
                });
            }
        }
    },
    
}
</script>
