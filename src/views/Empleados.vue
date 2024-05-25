<template>
    <div class="container">
        <h1>Lista de empleados</h1>
        <button @click="newEmpleado()" class="btn btn-outline-success mx-2">
            <font-awesome-icon icon="plus" /> 
        </button>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Cargo</th>
                <th scope="col">Salario</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(empleado, index) in empleados" :key="index">
                    <th scope="row">{{empleado.id}}</th>
                    <td>{{empleado.nombre}}</td>
                    <td>{{empleado.apellido}}</td>
                    <td>{{empleado.cargo}}</td>
                    <td>{{empleado.salario}}</td>
                    <td>
                        <button @click="deleteEmpleado(empleado.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editEmpleado(empleado.id)" class="btn btn-warning mx-2">
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
    
        name: 'Empleado',
        data(){
            return{
                empleados:[]
            }
        },
        methods:{
            deleteEmpleado(codigo){
                Swal.fire({
                    title: "¿Estás seguro de eliminar el empleado?",
                    text: "No podrás revertir esta acción",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminarlo!"
                }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:8000/api/empleados/${codigo}`)
                    .then(response => {
                        if (response.data.success){
                            Swal.fire({
                                title: "Eliminado!",
                                text: "El empleado ha sido eliminado.",
                                icon: "success"
                            });
                            this.empleados = response.data.empleados;
                        }
                    });
                }
                });
            },
            editEmpleado(id){
                this.$router.push({name: "EditarEmpleado", params: {id: `${id}`}})
            },
            newEmpleado(){
                this.$router.push({name: "NewEmpleado"});
            }
        },
        mounted(){
            axios
                .get("http://localhost:8000/api/empleados")
                .then(response => (this.empleados = response.data.empleados))
        },
    }
    
    </script>