<template>
  <div class="text-xl font-semibold text-center">
    <h4 class="mb-4 font-semibold bg-blue-400 text-white">
    👥 Xestión de usuarios
</h4>

    <form @submit.prevent="gardarUsuario" class="w-full flex flex-col gap-8 mb-8">
   <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="flex flex-col gap-2">
        <label>DNI/CIF:</label>
        <input type="text" class="border rounded-md px-3 py-2.5">
    </div>
    <div class="flex flex-col gap-2">
        <label>Nome:</label>
        <input type="text" class="border rounded-md px-3 py-2.5">
    </div>
    <div class="flex flex-col gap-2">
        <label>Correo:</label>
        <input type="email" class="border rounded-md px-3 py-2.5">
    </div>
    <div class="flex flex-col gap-2">
        <label>Provincia:</label>
      <select
    class="w-full px-3 py-2.5 border border-gray-300
           rounded-md bg-white"
>
    <option value="">-- Escolle unha provincia --</option>
    <option>A Coruña</option>
    <option>Lugo</option>
    <option>Ourense</option>
    <option>Pontevedra</option>
</select>

    </div>
</div>

      <div class="flex justify-center gap-8">
      <button type="submit" class="w-1/6  bg-blue-600  hover:bg-blue-800 text-white px-4 py-2 rounded-lg" :disabled="novoUsuario.dni === '' || novoUsuario.nome === ''">
        Gardar
      </button>

      <button type="button"  class="w-1/6  bg-yellow-500  hover:bg-yellow-600 text-black px-4 py-2 rounded-lg" @click="limparForm">
        Limpar
      </button>
      </div>
    </form>
    <div class="encabezamentoUsuarios">
      LISTAXE DE USUARIOS —  Usuarios activos: {{ usuariosActivos }} | Inactivos:  {{ usuariosInactivos }}
    </div>
    <h4>📋 Listaxe de usuarios</h4>
    <table v-if="usuarios.length > 0">
      <thead>
        <tr>
          <th>#</th>
          <th>DNI/CIF</th>
          <th>Nome</th>
          <th>Correo</th>
          <th>Provincia</th>
          <th>Activo</th>
          <th>Tipo de conta</th>
          <th>Accións</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(u, index) in usuarios" :key="index"   :class="{
       'bg-green-100': u.tipoCuenta === 'empresa',
       'bg-yellow-100': u.tipoCuenta === 'particular'}">
          <td>{{ index + 1 }}</td>
          <td style="text-align: center;">{{ u.dni }}</td>
          <td>{{ u.nome }}</td>
          <td>{{ u.correo }}</td>
          <td>{{ u.provincia }}</td>
          <td style="text-align: center;">{{ u.activo ? "✅" : "❌" }}</td>
          <td>{{ u.tipoCuenta }}</td>
          <td style="text-align: center;">
            <button @click="editarUsuario(index)" title="Editar">✏️</button>
            <button @click="eliminarUsuario(index)" title="Eliminar">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Non hai usuarios cargados.</p>
  </div>
</template>

<script setup>
/// Zona de declaracións
import { ref, reactive, onMounted, computed } from 'vue'

const usuarios = ref([])  //almacena la lista de usuarios e os seus cambios

const novoUsuario = reactive({
  dni: "",
  nome: "",
  correo: "",
  provincia: "",
  activo: false,
  tipoCuenta: ""
})

/// Zona de ciclo de vida

onMounted(() => {       //sempre se cargan estos usuarios de exemplo ao iniciar o componente
  usuarios.value = [
    { dni: "A000000C", nome: "Soldaduras SL", correo: "soldadura@email.com", provincia: "A Coruña", activo: true, tipoCuenta: "empresa" },
    { dni: "0000000C", nome: "María Pérez", correo: "maria@email.com", provincia: "Lugo", activo: false, tipoCuenta: "particular" },
    { dni: "B1234567D", nome: "Xosé López", correo: "xose@email.com", provincia: "Ourense", activo: true, tipoCuenta: "particular" },
    { dni: "C9876543E", nome: "Construcións Modernas", correo: "construcion@email.com", provincia: "Pontevedra", activo: true, tipoCuenta: "empresa" }
  ]
})

/// Zona de métodos ou funcións

function gardarUsuario() {
  usuarios.value.push({ ...novoUsuario })  //engade o novo usuario á lista (copia do obxecto)
  Object.assign(novoUsuario, { dni: "", nome: "", correo: "", provincia: "", activo: false, tipoCuenta: "" }) //reinicia o formulario
}

function eliminarUsuario(index) {
  usuarios.value.splice(index, 1);   //elimina o usuario da lista
}

function editarUsuario(index) {
  const usuario = usuarios.value[index];   //carga os datos do usuario elixido no formulario
  Object.assign(novoUsuario, usuario);  // carga os datos do usuario no formulario recorda v-model do formulario é novoUsuario
}

function limparForm(){
  Object.assign(novoUsuario, {
    dni: "",
    nome: "",
    correo: "",
    provincia: "",
    activo: false,
    tipoCuenta: ""
  })
}


const usuariosActivos = computed(() => {
  const resultado = usuarios.value.filter(u => u.activo).length
  //console.log(resultado)
  return resultado
})

const usuariosInactivos = computed(() => {
  return usuarios.value.filter(u => !u.activo).length
})

</script>

<style scoped>

.fila-centrada {
  justify-content: center;
}

.campo {
  display: flex;
  align-items: center;
  /* label e input en la misma línea */
  gap: 0.5rem;
  border-radius: 0px;
}

.campo-dni {
  flex: 1;
  /* ocupa menos espacio */
  border-radius: 0px;
}

.campo-nome {
  flex: 3;
  /* ocupa más espacio */
  border-radius: 0px;
}

.campo-correo {
  flex: 2;
  /* ocupa más espacio */
  border-radius: 0px;
}

.campo select {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 0px;
  width: 100%;
}

.campo-provincia {
  flex: 1;
  /* ocupa menos espacio */
  border-radius: 0px;
}

.campo label {
  min-width: 80px;
  /* ancho fijo para alinear */
  font-weight: 500;
  font: bold
}

.campo input {
  flex: 1;
  /* ocupa todo el espacio restante */
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0px;
  box-sizing: border-box;
}


.inline-control {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding-right: 5rem;
}

table {
  width: 100%;
  border-collapse: separate;
  margin-top: 1rem;
  font-size: 0.8rem;
  border: 1px solid #ddd;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0.7rem;
  text-align: left;
}

th {
  text-align: center;
  background-color: #f8f9fa;
}

h4 {
  margin-bottom: 1rem;
  font-weight: 600;
  background-color: #73aff0;
  color: white;
}

.fila-empresa{
  background-color: #d0f0df;
}
.fila-particular{
  background-color: #ffffcc;
}

input {
  transition: border-color 0.3s ease;
}

div.encabezamentoUsuarios{
  background-color: #f8f8f8;
  font-style: italic;
  font-size: 0.9rem;
}
</style>
