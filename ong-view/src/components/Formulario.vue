<template>
  <div>
    <b-form @submit="onSubmit">
      <div class="mt-1">Nome: {{usuarioModel.nome}}</div>
      <b-form-input v-model="usuarioModel.nome" placeholder="Insira seu nome" required></b-form-input>

      <div class="mt-2">Data de Nascimento: {{usuarioModel.dataNascimento}}</div>
      <b-form-input type="date" v-model="usuarioModel.dataNascimento" placeholder="Data de nascimento" required></b-form-input>

      <div class="mt-3">Nacionalidade: {{ usuarioModel.nacionalidade }}</div>
      <b-form-input v-model="usuarioModel.nacionalidade" placeholder="Nacionalidade" required></b-form-input>

      <div class="mt-4">Endereço: {{usuarioModel.endereco}}</div>
      <b-form-input v-model="usuarioModel.endereco" required></b-form-input>

      <div class="mt-5">Bairro: {{usuarioModel.bairro}}</div>
      <b-form-input v-model="usuarioModel.bairro" required></b-form-input>

      <div class="mt-6">Cidade: {{usuarioModel.cidade}}</div>
      <b-form-input v-model="usuarioModel.cidade" placeholder="" required></b-form-input>

      <div class="mt-7">Telefone: {{usuarioModel.telefone}}</div>
      <b-form-input v-model="usuarioModel.telefone" placeholder="" required></b-form-input>

      <b-form-group label="Grupo" required>
        <b-form-radio v-model="usuarioModel.grupoId" name="some-radios" value=1>Estagiário</b-form-radio>
        <b-form-radio v-model="usuarioModel.grupoId" name="some-radios" value=2>Voluntário</b-form-radio>
        <b-form-radio v-model="usuarioModel.grupoId" name="some-radios" value=3>Criança</b-form-radio>
      </b-form-group>
      
      <div class="mt-3">Grupo Selecionado: <strong>{{ usuarioModel.grupoId }}</strong></div>

    <b-button type="reset" variant="danger">Limpar</b-button>
    <b-button type="submit" fvariant="success">Salvar</b-button>

    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'Formulario',
    props:{
      usuarioEdit:{
        nome: String,
        dataNascimento: Date,
        endereco: String,
        bairro: String,
        cidade: String,
        telefone: String,
        grupoId: Number
      },
        modalTarget: String,
        callback: Function
    },
    methods: {
      onSubmit(){
        this.salvarUsuario();
        
      
      },
      salvarUsuario(){
         const url = "http://localhost:8888/";
         const eventPath = "usuario";

        alert("Enviando..." + JSON.stringify(this.usuarioModel));
        console.log(url+eventPath);

        axios.post(url + eventPath, this.usuarioModel)
              .then(response => {
                console.log(response);
                alert("Evento criado: " + response.data);
                this.$emit("exit", true);
              })
              .catch(error => {
                console.log(error);
                alert(error);
              });
      },
      onReset(){
        this.usuarioModel.nome = '';
        this.usuarioModel.dataNascimento = '';
        this.usuarioModel.endereco = '';
        this.usuarioModel.bairro = '';
        this.usuarioModel.cidade = '';
        this.usuarioModel.telefone = '';
        this.usuarioModel.foto = '';
        this.usuarioModel.grupoId = 0;

      }
    },
    data() {
       return {
        usuarioModel:{
          nome: "",
          dataNascimento: new Date(),
          nacionalidade: "",
          endereco: "",
          bairro: "",
          cidade: "",
          telefone: "",
          foto: "",
          grupoId: 0,
        }
      }
    },
    mounted(){
      if(this.usuarioEdit){
        this.usuarioModel.nome = this.usuarioEdit.nome;
        this.usuarioModel.dataNascimento = new Date(this.usuarioEdit.dataNascimento);
        this.usuarioModel.endereco = this.usuarioEdit.endereco;
        this.usuarioModel.bairro = this.usuarioEdit.bairro;
        this.usuarioModel.cidade = this.usuarioEdit.cidade;
        this.usuarioModel.telefone = this.usuarioEdit.telefone;
        this.usuarioModel.grupoId = this.usuarioEdit.grupoId;
      }
    }
  }
</script>

<style>
#fluid{
  widows: 80%;
}
</style>