<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Crear Cita
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Cita
            </div>
            <div class="card-body">
                <form @submit.prevent="saveCita">
                    <div class="row mb-3">
                        <label for="paciente">Paciente</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="user" /></div>
                            <select class="form-select" v-model="cita.paciente_id" required>
                                <option disabled selected>Elegir Paciente...</option>
                                <option v-for="paciente in pacientes" :value="paciente.id" :key="paciente.id">
                                    {{ paciente.nombre }}
                                </option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="fecha_hora">Fecha y Hora</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="clock" /></div>
                            <input type="datetime-local" class="form-control" id="fecha_hora" v-model="cita.fecha_hora" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="tipo">Tipo</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="clipboard" /></div>
                            <select class="form-select" v-model="cita.tipo" required>
                                <option disabled selected>Elegir Tipo de Cita...</option>
                                <option value="consulta">Consulta</option>
                                <option value="vacunación">Vacunación</option>
                                <option value="cirugía">Cirugía</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="empleado">Empleado</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="user-md" /></div>
                            <select class="form-select" v-model="cita.empleado_id" required>
                                <option disabled selected>Elegir Empleado...</option>
                                <option v-for="empleado in empleados" :value="empleado.id" :key="empleado.id">
                                    {{ empleado.nombre }}
                                </option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="estado">Estado</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="info-circle" /></div>
                            <select class="form-select" v-model="cita.estado" required>
                                <option disabled selected>Elegir Estado...</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="completada">Completada</option>
                                <option value="cancelada">Cancelada</option>
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
    name: "NewCita",
    data(){
        return{
            cita: {
                paciente_id: null,
                fecha_hora: '',
                tipo: '',
                empleado_id: null,
                estado: ''
            },
            pacientes: [],
            empleados: []
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Citas' });
        },

        async saveCita() {
            try {
                const res = await axios.post('http://localhost:8000/api/citas', this.cita);

                if (res.status === 200) { 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Cita ha sido creada correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        this.$router.push({ name: 'Citas' });
                    });
                }
            } catch (error) {
                console.error('Error creando la cita:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo crear la cita. Por favor, intente de nuevo.',
                });
            }
        }
    },
    mounted(){
        axios.get('http://localhost:8000/api/pacientes')
            .then(response => {
                this.pacientes = response.data.pacientes;
            })
            .catch(error => {
                console.error('Error fetching pacientes:', error);
            });

        axios.get('http://localhost:8000/api/empleados')
            .then(response => {
                this.empleados = response.data.empleados;
            })
            .catch(error => {
                console.error('Error fetching empleados:', error);
            });
    }
}
</script>
