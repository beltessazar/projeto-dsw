<template>
  <div class="home">
    <Menu></Menu>
    <footer>
      <div class="logout">
        <b-button  class="btLogout" @click="Logout">
         <b-icon icon="power" aria-hidden="true"></b-icon> Logout
        </b-button>
      </div>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from  "@/components/Menu.vue";


export default {
  name: 'Home',
  components: {Menu},
  data(){
    return {
      userData:{
      id: "",
      nome: ""
      }
    }
  },
  methods:{
    getUserData(){
     this.$http.get('/api/user')
      .then(response => {
        this.$set(this, "user", response.data.user);
        this.$set(this, "id", response.data.id);
        console.log(this);
      })
      .catch(error => {
        console.log("Erro ou falta de permissão.");
        console.error(error);
        this.$router.push("/");
      });
    },
    Logout(){
      this.$http.get('/api/logout')
      .then(() => {
        this.$router.push("/");
        alert("Logout realizado com sucesso!");
      })
      .catch((err) => console.error(err));
    }
  },
   mounted(){
    this.getUserData();
  }
}
</script>

<style>
.logout{
  display:flex;
  justify-content: center;
  margin-top: 50px;
}

.logout button{
background-color: rgb(192, 194, 72);
border-color: transparent;
width: 100px;
}

.logout button:hover{
background-color: rgb(235, 127, 77);
border-color: transparent;
width: 100px;
}
</style>
