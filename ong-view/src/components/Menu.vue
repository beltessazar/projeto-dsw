<template>
    <div>
        <!-- <img src="../imagens/logo.png" alt="Logo do site"> -->
        <h1>ONG</h1>
        <h2>Sistema de Cadastro</h2>
      <div class="menu">
        <b-button v-b-modal.form class="botao">Cadastro</b-button>

        <b-dropdown right text="Planilhas" class="botao">
          <b-dropdown-item v-b-modal.planilhasC >Crianças</b-dropdown-item>
            <b-modal id="planilhasC" size="xl" title="Planilha Crianças">
              <div>
                <Planilhas></Planilhas>
              </div>
            </b-modal>
          <b-dropdown-item  v-b-modal.planilhasV>Voluntários</b-dropdown-item> 
          <b-modal id="planilhasV" size="xl" title="Planilha Voluntários">
              <div>
                <Planilhas></Planilhas>
              </div>
            </b-modal>
          <b-dropdown-item v-b-modal.planilhasE>Estagiários</b-dropdown-item>
          <b-modal id="planilhasE" size="xl" title="Planilha Estagiários">
              <div>
                <Planilhas></Planilhas>
              </div>
            </b-modal>
        </b-dropdown>

        <b-dropdown right text="Grupos" class="botao">
          <b-dropdown-item v-b-modal.criancas>Crianças</b-dropdown-item>
          <b-modal id="criancas" title="Criancas">
            <div>
              <Criancas></Criancas>
            </div>
        </b-modal>
        <b-dropdown-item v-b-modal.estagiarios>Estagiarios</b-dropdown-item>
          <b-modal id="estagiarios" title="Estagiarios">
            <div>
              <Estagiarios></Estagiarios>
            </div>
        </b-modal>
        <b-dropdown-item v-b-modal.voluntarios>Voluntarios</b-dropdown-item>
          <b-modal id="voluntarios" title="Voluntarios">
            <div>
              <Voluntarios></Voluntarios>
            </div>
        </b-modal>

        </b-dropdown>
      </div>

      <!-- Modals diversos -->
      <b-modal id="form"  title="Cadastro Vinde Meninos">
        <Formulario/>
      </b-modal>
    </div>  
</template>

<script>
import Formulario from  "@/components/Formulario.vue"
import Criancas from "@/views/Criancas.vue"
import Voluntarios from "@/views/Voluntarios.vue"
import Estagiarios from "@/views/Estagiarios.vue"
import Planilhas from "@/views/Planilhas.vue"

export default {
  name: 'Menu',
  components: {Formulario, Criancas, Voluntarios, Estagiarios, Planilhas},
}

</script>

<style>
b-button{
  display: flex;
  justify-content: space-around;  
}
b-modal{
  width: 100%;
}
.menu{
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-right: 30px;
}
.botao{
    width: 100px;
    margin-left: 30px;
}
</style>