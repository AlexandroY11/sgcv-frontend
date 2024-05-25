<template>
    <div class="container">
        <h1>Lista de facturas</h1>
        <button @click="newFactura()" class="btn btn-outline-success mx-2">
            <font-awesome-icon icon="plus" /> 
        </button>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Cita</th>
                <th scope="col">Total</th>
                <th scope="col">Fecha Emisión</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(factura, index) in facturas" :key="index">
                    <th scope="row">{{factura.id}}</th>
                    <td>{{factura.tipo_cita}}</td>
                    <td>{{factura.total}}</td>
                    <td>{{factura.fecha_emision}}</td>
                    <td>{{factura.estado}}</td>
                    <td>
                        <button @click="deleteFactura(factura.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editFactura(factura.id)" class="btn btn-warning mx-2">
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
    
        name: 'Factura',
        data(){
            return{
                facturas:[]
            }
        },
        methods:{
            
            editFactura(id){
                this.$router.push({name: "EditarFactura", params: {id: `${id}`}})
            },
            newFactura(){
                this.$router.push({name: "NewFactura"});
            }
        },
        mounted(){
            axios
                .get("http://localhost:8000/api/facturas")
                .then(response => (this.facturas = response.data.facturas))
        },
    }
    
    </script>