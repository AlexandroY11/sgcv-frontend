<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Crear Paciente
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Paciente
            </div>
            <div class="card-body">
                <form @submit.prevent="savePaciente">
                    <div class="row mb-3">
                        <label for="id">Id</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Id de paciente" disabled 
                            v-model="paciente.id">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="nombre">Nombre</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="user" /></div>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre del paciente"  
                            v-model="paciente.nombre" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="especie">Especie</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="paw" /></div>
                            <input type="text" class="form-control" id="especie" placeholder="Especie del paciente"  
                            v-model="paciente.especie" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="raza">Raza</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="paw" /></div>
                            <input type="text" class="form-control" id="raza" placeholder="Raza del paciente"  
                            v-model="paciente.raza" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="edad">Edad</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="hourglass" /></div>
                            <input type="number" class="form-control" id="edad" placeholder="Edad del paciente"  
                            v-model="paciente.edad" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="peso">Peso</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="balance-scale" /></div>
                            <input type="number" class="form-control" id="peso" placeholder="Peso del paciente"  
                            v-model="paciente.peso" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="historial_medico_id">Historial médico</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="file-medical" /></div>
                            <select class="form-select" v-model="paciente.historial_medico_id" required>
                                <option disabled selected>Elegir Historial médico...</option>
                                <option v-for="historialMedico in historialMedicos" :value="historialMedico.id" :key="historialMedico.id">
                                    {{ historialMedico.detalles }}
                                </option>
                            </select>
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
    name: "NewPaciente",
    data() {
        return {
            paciente: {
                id: 0,
                nombre: '',
                especie: '',
                raza: '',
                edad: '',
                peso: '',
                historial_medico_id: null
            },
            historialMedicos: []
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Pacientes' });
        },
        async savePaciente() {
            try {
                const res = await axios.post('http://localhost:8000/api/pacientes', this.paciente);

                if (res.status === 200) { 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Paciente ha sido creado correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        this.$router.push({ name: 'Pacientes' });
                    });
                }
            } catch (error) {
                console.error('Error creando el paciente:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo crear el paciente. Por favor, intente de nuevo.',
                });
            }
        }
    },
    mounted() {
        axios.get('http://localhost:8000/api/historialesMedicos')
            .then(response => {
                this.historialMedicos = response.data.historialesMedicos;
            })
            .catch(error => {
                console.error('Error fetching historial medicos:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo obtener los historiales médicos. Por favor, intente de nuevo.',
                });
            });
    }
}
</script>
