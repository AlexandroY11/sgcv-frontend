<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/historias-clinicas">Historias Clínicas</router-link> |
    <router-link to="/facturas">Facturas</router-link> |
    <router-link to="/tratamientos">Tratamientos</router-link> |
    <router-link to="/empleados">Empleados</router-link> |
    <router-link to="/pacientes">Pacientes</router-link> |
    <router-link to="/citas">Citas</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
