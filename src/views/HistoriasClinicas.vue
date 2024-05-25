<template>
    <div class="container">
        <h1>Lista de historias clínicas</h1>
        <button @click="newHistoriaClinica()" class="btn btn-outline-success mx-2">
            <font-awesome-icon icon="plus" /> 
        </button>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Detalles</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(historiaClinica, index) in historiasClinicas" :key="index">
                    <th scope="row">{{historiaClinica.id}}</th>
                    <td>{{historiaClinica.detalles}}</td>
                    <td>
                        <button @click="deleteHistoriaClinica(historiaClinica.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editHistoriaClinica(historiaClinica.id)" class="btn btn-warning mx-2">
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
    
        name: 'HistoriaClinica',
        data(){
            return{
                historiasClinicas:[]
            }
        },
        methods:{
            
            editHistoriaClinica(id){
                this.$router.push({name: "EditarHistoriaClinica", params: {id: `${id}`}})
            },
            newHistoriaClinica(){
                this.$router.push({name: "NewHistoriaClinica"});
            }
        },
        mounted(){
            axios
                .get("http://localhost:8000/api/historiasClinicas")
                .then(response => (this.historiasClinicas = response.data.historialesMedicos))
        },
    }
    
    </script>