<template>
  <div>
    <b-form>
      <div class="mt-1">Usuario:</div>
      <b-form-input v-model="administradorModel.usuario" placeholder="Insira seu nome" required></b-form-input>
      
      <div class="mt-1">e-mail:</div>
      <b-form-input v-model="administradorModel.email" placeholder="digite seu e-mail" required></b-form-input>

      <div class="mt-1">Senha:</div>
      <b-form-input id="password-input" v-model="administradorModel.senha" type="password"  required placeholder="Digite a senha"></b-form-input>
    </b-form>
    <div class="botoes">
      <b-button type="reset" @click="onReset" variant="danger" style="margin-right:15px">Limpar</b-button>
      <b-button type="button" @click="onSubmit" fvariant="success" style="background-color:#38e48d; border:0px;">Salvar</b-button>
    </div>
  </div>
</template>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

<script>
import axios from "axios";

const MAX_WIDTH = 1024;
const MAX_HEIGHT = 768;
const QUALITY = { low: 0.2, medium: 0.5, full: 1 };

export default {
    name: 'FormularioAdministradores',
    props:{
      administradorEdit:{
        usuario: String,
        email: String,
        senha: String,
      },
        modalTarget: String,
        callback: Function
    },
    methods: {
      onSubmit(){
         console.log("teste1");
        this.salvarAdministrador();
      },
      salvarAdministrador(){
         const url = "http://localhost:8080/api/";
         const eventPath = "administrador";
        
        axios.post(url + eventPath, this.administradorModel)
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
        this.administradorModel.usuario = '';
        this.administradorModel.email = '';
        this.administradorModel.senha = '';
      }
    },
    data() {
       return {
        administradorModel:{
          usuario: "",
          email: "",
          senha: "",
        }
      }
    },
    mounted(){
      if(this.administradorEdit){
        this.administradorModel.usuario = this.administradorEdit.usuario;
        this.administradorModel.email = this.administradorEdit.email;
        this.administradorModel.senha = this.administradorEdit.senha;
      }
    }
}
</script>

<style>
.botoes{
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>