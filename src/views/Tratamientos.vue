<template>
    <div class="container">
        <h1>Lista de tratamientos</h1>
        <button @click="newTratamiento()" class="btn btn-outline-success mx-2">
            <font-awesome-icon icon="plus" /> 
        </button>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Descripción</th>
                <th scope="col">Costo</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tratamiento, index) in tratamientos" :key="index">
                    <th scope="row">{{tratamiento.id}}</th>
                    <td>{{tratamiento.descripcion}}</td>
                    <td>{{tratamiento.costo}}</td>
                    <td>
                        <button @click="deleteTratamiento(tratamiento.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editTratamiento(tratamiento.id)" class="btn btn-warning mx-2">
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
    
        name: 'Tratamiento',
        data(){
            return{
                tratamientos:[]
            }
        },
        methods:{
            
            editTratamiento(id){
                this.$router.push({name: "EditarTratamiento", params: {id: `${id}`}})
            },
            newTratamiento(){
                this.$router.push({name: "NewTratamiento"});
            }
        },
        mounted(){
            axios
                .get("http://localhost:8000/api/tratamientos")
                .then(response => (this.tratamientos = response.data.tratamientos))
        },
    }
    
    </script>