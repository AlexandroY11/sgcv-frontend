<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">
            Crear
        </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Factura
            </div>
            <div class="card-body">
                <form @submit.prevent="saveFactura">
                    <div class="row mb-3">
                        <label for="id">Id</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Factura code" disabled 
                            v-model="factura.id">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="">Cita</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <select class="form-select" v-model="factura.cita_id" required>
                                <option disabled selected>Eligir cita</option>
                                <option v-for="cita in citas" :value="cita.id" :key="cita.id">
                                    {{ cita.tipo }}
                                </option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="total">Total</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="total" placeholder="Factura total"  
                            v-model="factura.total" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="fecha_emision">Fecha emisión</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="date" class="form-control" id="fecha_emision" placeholder="Factura fecha_emision"  
                            v-model="factura.fecha_emision" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="estado">Estado</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <select class="form-select" id="estado" v-model="factura.estado" required>
                                <option value="pendiente">Pendiente</option>
                                <option value="pagada">Pagada</option>
                            </select>
                        </div>
                    </div>

                    
                    

                    <button class="btn btn-primary" type="submit">Save</button>
                    <button class="btn btn-danger mx-2" @click="cancelar">Cancel</button>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"

export default {
    name: "NewFactura",
    data(){
        return{
            factura: {
                id: 0,
                name: '',
                price: 0,
                stock: 0,
                category_id: 0,
            },
            citas: []
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Facturas' });
        },

        async saveFactura() {
            try {
                const res = await axios.post('http://localhost:8000/api/facturas', this.factura);

                if (res.status === 200) { 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Factura has been created successfully',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        this.$router.push({ name: 'Facturas' });
                    });
                }
            } catch (error) {
                console.error('Error creating factura:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo crear la factura. Por favor, intente de nuevo.',
                });
            }
        }
    },
    mounted(){
        axios.get('http://localhost:8000/api/citas/')
            .then(response => {
                this.citas = response.data.citas;
            })
            .catch(error => {
                console.error('Error fetching citas:', error);
            });
    }
    
}
</script>
