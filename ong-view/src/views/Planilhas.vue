<template>
<div>
  <b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(editar)="linhaUsuario">
        
          <b-button @click="editarUsuario(linhaUsuario.item)" style="background-color:#248ce9; border:0px ">Editar</b-button>
      </template>
      <template v-slot:cell(excluir)="linhaUsuario">
        
          <b-button @click="excluirUsuario(linhaUsuario.item)" style="background-color:#248ce9; border:0px ">Excluir</b-button>
      </template>
  </b-table>

  <!--<b-modal @hide="resetaModalData()" :id="modalData.id" :title="modalData.title">
      <Formulario :usuarioEdit="modalData.content" :callback="modalData.callback"></Formulario> 
  </b-modal>-->

    <b-modal :id="modalData.id" :title="modalData.title" hide-footer>
      <Formulario v-bind:usuarioEdit="modalData.content" mod></Formulario>
    </b-modal>
  
</div>  
</template>

<script>
 import Formulario from "@/components/Formulario.vue"; 

export default {
    name:"Planilhas",
    components:{
       Formulario
    },
    props:{
        groupId: Number
    },
    data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: ['nome', 'nascimento', 'endereco', 'bairro', 'cidade', 'telefone', 'grupo', 'editar', 'excluir'],
        items: [
          //  {nome:"Daniel 1",nascimento:new Date(),endereco:"Rua 1",bairro:"jardim 1",cidade:"BJP",telefone:"111",grupo:"Estagiário"},
          //  {nome:"Daniel 2",nascimento:new Date(),endereco:"Rua 2",bairro:"jardim 2",cidade:"Atibaia",telefone:"222",grupo:"Criança"},
          //  {nome:"Daniel 3",nascimento:new Date(),endereco:"Rua 3",bairro:"jardim 3",cidade:"Bragança",telefone:"333",grupo:"Voluntário"}
        ]
        ,
        modalData:{
          id: "modalUsuario",
          content: null,
          title: "",
        },
      }
    },
     mounted(){
      console.log(this.groupId);
      this.$http
      .get("http://localhost:8888/usuarios/" + this.groupId).
      then(result =>{
        console.log("Certo");
        this.items = result.data;
        console.log(this.items);
      })
      .catch(error =>{
        alert(error);     
        console.log(error);
      })
    }, 
    methods:{
      editarUsuario(linhaUsuario){
        this.modalData.content = linhaUsuario;
        this.modalData.title = "Edite dados do usuário \"" + linhaUsuario.nome +"\"";
        this.modalData.callback = () => {
        }
        this.$root.$emit('bv::show::modal', this.modalData.id);
        //console.log(linhaUsuario);
      },
      excluirUsuario(linhaUsuario){
        this.$http.delete("http://localhost:8888/usuario/" + linhaUsuario.id)
          .then(() =>{
          alert("Usuario removido!");
          this.$router.go()
      })
      .catch(error =>{
        alert(error);     
        console.log(error);
      })
      },

      resetaModalData(){
        this.modalData.content = null;
        this.modalData.title = "";
      }
    }
}
</script>

<style>

</style>