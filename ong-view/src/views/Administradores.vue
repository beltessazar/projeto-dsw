<template>
<div>
  <b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(excluir)="linhaAdministrador">
          <b-button @click="excluirAdministrador(linhaAdministrador.item)" style="background-color:#dc3545; border:0px">Excluir</b-button>
      </template>
  </b-table>
</div>  
</template>

<script>
export default {
    name:"Administradores",
    data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: ['usuario', 'email', 'excluir'],
        items: [
        ]
        ,
        modalData:{
          id: "modalAdministrador",
          content: null,
          title: "",
        }
      }
    },
     mounted(){
      this.getAll();
    }, 
    methods:{
      excluirAdministrador(linhaAdministrador){
        this.$http.delete("http://localhost:8080/api/administrador/" + linhaAdministrador.id)
          .then(() =>{
          console.log("Certo");
          this.getAll();
      })
      .catch(error =>{
        alert(error);     
        console.log(error);
      })
      },
      getAll(){
      this.$http.get("http://localhost:8080/api/administrador")
      .then(result =>{
        console.log("Certo");
        this.items = result.data;
        console.log(this.items);
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