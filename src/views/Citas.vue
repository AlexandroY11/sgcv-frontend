<template>
    <div class="container">
        <h1>Lista de citas</h1>
        <button @click="newCita()" class="btn btn-outline-success mx-2">
            <font-awesome-icon icon="plus" /> 
        </button>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre Paciente</th>
                <th scope="col">Fecha</th>
                <th scope="col">Tipo</th>
                <th scope="col">Nombre Empleado</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(cita, index) in citas" :key="index">
                    <th scope="row">{{cita.id}}</th>
                    <td>{{cita.nombre_paciente}}</td>
                    <td>{{cita.fecha_hora}}</td>
                    <td>{{cita.tipo}}</td>
                    <td>{{cita.nombre_empleado}}</td>
                    <td>
                        <button @click="deleteCita(cita.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editCita(cita.id)" class="btn btn-warning mx-2">
                            <font-awesome-icon icon="pencil" /> 
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </template>
    <script>
    import axios from 'axios';
    import Swal from "sweetalert2"
    
    
    export default {
    
        name: 'Cita',
        data(){
            return{
                citas:[]
            }
        },
        methods:{
            deleteCita(codigo){
                Swal.fire({
                    title: "¿Estás seguro de eliminar la cita?",
                    text: "No podrás revertir esta acción",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminarlo!"
                }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:8000/api/citas/${codigo}`)
                    .then(response => {
                        if (response.data.success){
                            Swal.fire({
                                title: "Eliminado!",
                                text: "La cita ha sido eliminado.",
                                icon: "success"
                            });
                            this.citas = response.data.citas;
                        }
                    });
                }
                });
            },
            editCita(id){
                this.$router.push({name: "EditarCita", params: {id: `${id}`}})
            },
            newCita(){
                this.$router.push({name: "NewCita"});
            }
        },
        mounted(){
            axios
                .get("http://localhost:8000/api/citas")
                .then(response => (this.citas = response.data.citas))
        },
    }
    
    </script>