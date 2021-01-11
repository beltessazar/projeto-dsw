<template>
  <div>
    <b-form @submit="onSubmit">

      <div class="field">Nome: {{usuarioModel.url}}</div>
      <b-form-input v-model="usuarioModel.nome" placeholder="Insira seu nome" required></b-form-input>

      <div class="field">Data de Nascimento: {{usuarioModel.dataNascimento}}</div>
      <b-form-datepicker type="date" v-model="usuarioModel.dataNascimento" placeholder="Data de nascimento" required></b-form-datepicker>

      <div class="field">Nacionalidade: {{ usuarioModel.nacionalidade }}</div>
      <b-form-input v-model="usuarioModel.nacionalidade" placeholder="Nacionalidade" required></b-form-input>

      <div class="field">Endereço: {{usuarioModel.endereco}}</div>
      <b-form-input v-model="usuarioModel.endereco" placeholder="Digite o endereço" required></b-form-input>

      <div class="field">Bairro: {{usuarioModel.bairro}}</div>
      <b-form-input v-model="usuarioModel.bairro" placeholder="Digite o bairro" required></b-form-input>

      <div class="field">Cidade: {{usuarioModel.cidade}}</div>
      <b-form-input v-model="usuarioModel.cidade" placeholder="Digite a cidade" required></b-form-input>

      <div class="field">Telefone: {{usuarioModel.telefone}}</div>
      <b-form-input v-model="usuarioModel.telefone" placeholder="Digite o telefone" required></b-form-input>

      <b-form-group label="Grupo" required>
        <b-form-radio v-model="usuarioModel.grupoId" name="some-radios" value=1>Estagiário</b-form-radio>
        <b-form-radio v-model="usuarioModel.grupoId" name="some-radios" value=2>Voluntário</b-form-radio>
        <b-form-radio v-model="usuarioModel.grupoId" name="some-radios" value=3>Criança</b-form-radio>
      </b-form-group>
      
      <div class="field">Grupo Selecionado: <strong>{{ usuarioModel.grupoId }}</strong></div>

    <div class="botoes">
      <b-button type="reset" variant="danger" style="margin-right:15px">Limpar</b-button>
      <b-button type="submit" fvariant="success" style="background-color:#38e48d; border:0px">Salvar</b-button>
    </div>
    </b-form>
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
    name: 'Formulario',
    props:{
      usuarioEdit:{
        id: Number,
        nome: String,
        dataNascimento: String,
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

        //alert("Enviando..." + JSON.stringify(this.usuarioModel));
        //console.log(url+eventPath);
        if(this.usuarioEdit == undefined){
          axios.post(url + eventPath, this.usuarioModel)
                .then(response => {
                  console.log(response);
                  alert("Usuário Criado");
                   this.$router.go()
                })
                .catch(error => {
                  console.log(error);
                  alert(error);
                });
        }
        else{
          console.log("chegou aqui");
          console.log(this.usuarioModel);
          axios.put(url + eventPath+"/"+this.usuarioEdit.id, this.usuarioModel)
                .then(response => {
                  console.log(response);
                  alert("Usuário atualizado");
                  this.$router.go()
                })
                .catch(error => {
                  console.log(error);
                  alert(error);
                });
        }
      },
      onReset(){
        this.usuarioModel.nome = '';
        this.usuarioModel.dataNascimento = '';
        this.usuarioModel.endereco = '';
        this.usuarioModel.bairro = '';
        this.usuarioModel.cidade = '';
        this.usuarioModel.telefone = '';
        this.usuarioModel.foto = new Array(3);
        this.usuarioModel.grupoId = 0;

      }
    },
    data() {
       return {
        usuarioModel:{
          nome: "",
          dataNascimento: new Date(),
          url:"",
          nacionalidade: "",
          endereco: "",
          bairro: "",
          cidade: "",
          telefone: "",
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
        this.usuarioModel.nacionalidade = this.usuarioEdit.nacionalidade;
        this.usuarioModel.grupoId = this.usuarioEdit.grupoId;
      }
    }
  }
  
</script>

<style>
#fluid{
  widows: 80%;
}

.botoes{
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.field{
  margin-top: 10px !important;
}
</style>