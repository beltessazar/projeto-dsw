<template>
    <div>
        <img src="../imagens/logo.png" alt="Logo do site">
        <h1>Sistema de Cadastro Vinde Meninos</h1>

      <b-button v-b-modal.modal-1>Cadastro</b-button>
      <b-modal id="modal-1" title="Cadastro Vinde Meninos">
        <Formulario/>
      </b-modal>

        <b-dropdown right text="Planilhas">
          <b-dropdown-item>Crianças</b-dropdown-item>
          <b-dropdown-item>Voluntários</b-dropdown-item>
          <b-dropdown-item>Estagiários</b-dropdown-item>
        </b-dropdown>

        <b-dropdown right text="Grupos">
          <b-dropdown-item>Crianças</b-dropdown-item>
          <b-dropdown-item>Voluntários</b-dropdown-item>
          <b-dropdown-item>Estagiários</b-dropdown-item>
        </b-dropdown>
    </div>  
</template>

<script>
import Formulario from  "@/components/Formulario.vue"

export default {
  name: 'Menu',
  components: {Formulario}
}

</script>

<style>
b-button{
  position: inline;
  margin: 5px;
}
</style>