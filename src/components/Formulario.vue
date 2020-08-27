<template>
  <div>
    <div class="mt-2">Nome: {{ nome }}</div>
    <b-form-input v-model="nome" placeholder="Entre com seu nome"></b-form-input>
    <b-button variant="danger">Limpar</b-button>
    <b-button variant="success">Button</b-button>
  </div>
</template>

<script>
export default {
    data() {
      return {
        nome: ''
      }
    }
  }
</script>

<style>

</style>