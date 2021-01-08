<template>
  <div>
    <b-form @submit="onSubmit">
      
      <!--<div class="mt-0">Foto: </div>
      <input input type="file"  name="image" id="image"  accept="image/*" >!-->

      <div class="row">
        <div class="col-md">
          <div class="card" style="width: 18rem;">
            <div title="Remove image" class="close" v-show="usuarioModel.foto[0].content" @click="removeImage(0)"></div>
            <img class="card-img-top" v-if="usuarioModel.foto[0].content" alt="Card image cap" :src="usuarioModel.foto[0].content"
              width="200px" style="padding: 20px; border-radius: 30px;" />
            <div class="card-body">
              <h5 class="card-title">Foto do usuário</h5>
              <p class="card-text">
               <b>Opcional:</b> Faça upload da foto do usuário que será cadastrado.
              </p>
              <div class="upload-btn-wrapper">
                <button class="btn btn-success">
                  {{ usuarioModel.foto[0].content ? "Replace image" : "Upload image" }}
                </button>
                <input type="file" @change="onImage(0 ,$event)" accept="image/*" />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="mt-1">Nome: {{usuarioModel.nome}}</div>
      <b-form-input v-model="usuarioModel.nome" placeholder="Insira seu nome" required></b-form-input>

      <div class="mt-2">Data de Nascimento: {{usuarioModel.dataNascimento}}</div>
      <b-form-datepicker type="date" v-model="usuarioModel.dataNascimento" placeholder="Data de nascimento" required></b-form-datepicker>

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
        nome: String,
        dataNascimento: String,
        endereco: String,
        bairro: String,
        cidade: String,
        telefone: String,
        foto: Array,
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
        this.usuarioModel.foto = new Array(3);
        this.usuarioModel.grupoId = 0;

      },
       onImage(index, e, method) {
            e.stopPropagation();
            e.preventDefault();

            if (index === 2) this.dragEnter = false;
            // Checa se o evento é de drop ou upload
            const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

            if (!file.type.match('image.*')) alert('Select a valid image file');
            // verifica se o arquivo é maior que 1 MB
            else if (file.size > 1e6)  this.resizeImage(index, file, method);
            else this.usuarioModel.foto[index].content = URL.createObjectURL(file);
      },
      removeImage(index) {
            this.dragEnter = false;
            this.foto[index].content = null;
      },
      resizeImage(index, file, method) {
          const reader = new FileReader();
          reader.onload = readerEvent => {
              const img = new Image();
              // iniciar o ajuste de imagem
              img.onload = () => {
                  const { width, height } =
                      method === 1
                          ? this.aspectRatioResize(300)
                          : this.proportionalResize(img.width, img.height);
                  const canvas = document.createElement('canvas');
                  canvas.width = width;
                  canvas.height = height;
                  // Isso é usado para adicionar a imagem na tela especificando a posição, largura e altura da imagem.
                  canvas.getContext('2d').drawImage(img, 0, 0, width, height);
                  // Exporta na tela como um blob (base64) ou DataURL especificando o tipo MIME, a qualidade da imagem
                  this.foto[index].content = canvas.toDataURL(
                      'image/jpeg',
                      QUALITY.medium
                  );
              };
              img.src = readerEvent.target.result;
          };
          // Leia a imagem de entrada usando FileReader (isso dispara o evento reader.onload).
          reader.readAsDataURL(file);
      },
      aspectRatioResize(length) {
          const aspectRatio = Math.round(screen.width / screen.height);
          return {
              width: length / Math.sqrt(1 / Math.pow(aspectRatio, 2) + 1),
              height: length / Math.sqrt(Math.pow(aspectRatio, 2) + 1)
          };
      },
      proportionalResize(width, height) {
          return {
              width: Math.round((MAX_WIDTH / width) * width),
              height: Math.round((MAX_HEIGHT / height) * height)
          };
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
          foto: new Array(3)
          .fill()
          .map((el,index) => ({content:null, key:index})),
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
        this.usuarioModel.foto = this.usuarioEdit.foto;
        this.usuarioModel.grupoId = this.usuarioEdit.grupoId;
      }
    }
  }
  
</script>

<style>
#fluid{
  widows: 80%;
}
.upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.drop {
  border-radius: 5px;
  width: 230px;
  height: 230px;
  padding: 10px;
  margin: 25px 20px 20px 20px;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  cursor: pointer;
}
.close:hover {
  opacity: 1;
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 33px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}

.ondrag-enter {
  border: 2px dashed green;
  background-color: #c8f0c9;
}
.ondrag-leave {
  border: 1px solid lightgrey;
  background-color: #f2f2f2;
  /* Background image to indicate the upload area */
  /*background-image: url("../img/picture.svg");*/
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: 50% 75%;
}
.card-text {
  text-align: justify;
}
.card-title {
  color: #008f83;
}
.card-img-top {
  margin-top: 30px;
}


</style>