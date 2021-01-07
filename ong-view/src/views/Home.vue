<template>
  <div class="home">
    <Menu></Menu>
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
    }
  },
   mounted(){
    this.getUserData();
  }
}
</script>
