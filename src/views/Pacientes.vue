<template>
    <div class="container">
        <h1>Lista de pacientes</h1>
        <button @click="newPaciente()" class="btn btn-outline-success mx-2">
            <font-awesome-icon icon="plus" /> 
        </button>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Especie</th>
                <th scope="col">Raza</th>
                <th scope="col">Edad</th>
                <th scope="col">Peso</th>
                <th scope="col">Historial mèdico</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(paciente, index) in pacientes" :key="index">
                    <th scope="row">{{paciente.id}}</th>
                    <td>{{paciente.nombre}}</td>
                    <td>{{paciente.especie}}</td>
                    <td>{{paciente.raza}}</td>
                    <td>{{paciente.edad}}</td>
                    <td>{{paciente.peso}}</td>
                    <td>{{paciente.detalles}}</td>
                    <td>
                        <button @click="deletePaciente(paciente.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editPaciente(paciente.id)" class="btn btn-warning mx-2">
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
    
        name: 'Paciente',
        data(){
            return{
                pacientes:[]
            }
        },
        methods:{
            
            editPaciente(id){
                this.$router.push({name: "EditarPaciente", params: {id: `${id}`}})
            },
            newPaciente(){
                this.$router.push({name: "NewPaciente"});
            }
        },
        mounted(){
            axios
                .get("http://localhost:8000/api/pacientes")
                .then(response => (this.pacientes = response.data.pacientes))
        },
    }
    
    </script>